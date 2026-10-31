#!/usr/bin/env node
/**
 * Builds static HTML for Berk Forte public pages from Laravel blades.
 * Output: src/content/berkforte/pages/{slug}.html (+ verify-guest.html)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const berkRoot =
  process.env.BERKFORTE_ROOT ||
  path.join(process.env.HOME || "", "Downloads/berkforte.com");

const viewsHome = path.join(berkRoot, "resources/views/home");
const basePath = path.join(berkRoot, "resources/views/layouts/base.blade.php");
const verifyPath = path.join(viewsHome, "verify.blade.php");
const outDir = path.join(root, "src/content/berkforte/pages");

/** Next.js `[slug]` param → Laravel blade file */
const PORTO_PAGES = {
  home: "index.blade.php",
  about: "about.blade.php",
  terms: "terms.blade.php",
  privacy: "privacy.blade.php",
  futures: "futuretrading.blade.php",
  forex: "forextrading.blade.php",
  stocks: "stocktrading.blade.php",
  advancetrading: "advancetrading.blade.php",
  oilandgas: "oilandgastrading.blade.php",
  livetrading: "livetrading.blade.php",
  softwares: "softwares.blade.php",
  optioncopytrading: "optioncopytarding.blade.php",
  contact: "contact.blade.php",
  faq: "faq.blade.php",
  statistic: "statistics.blade.php",
  investments: "investment.blade.php",
};

function extractSection(blade) {
  const match = blade.match(/@section\('content'\)([\s\S]*?)@endsection/);
  if (!match) return null;
  return match[1].trim();
}

function loadPortoShell(baseHtml) {
  const headerMatch = baseHtml.match(/<header[\s\S]*?<\/header>/);
  const footerMatch = baseHtml.match(/<footer id="footer">[\s\S]*?<\/footer>/);
  const modalMatch = baseHtml.match(
    /<div class="modal fade" id="defaultModal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  );
  if (!headerMatch || !footerMatch) {
    throw new Error("Could not extract Porto header/footer from base.blade.php");
  }
  return {
    header: headerMatch[0],
    footer: footerMatch[0],
    modal: modalMatch?.[0] ?? "",
  };
}

function postProcessHtml(html) {
  const replacements = [
    [/^\s*@php[\s\S]*?@endphp\s*/gm, ""],
    [/@inject\([^)]+\)\s*/g, ""],
    [/@extends\([^)]+\)\s*/g, ""],
    [/@section\('title'[^)]*\)\s*/g, ""],
    [/\{\{\s*\$settings->site_name\s*\}\}/g, "{{SITE_NAME}}"],
    [
      /\{\{\s*asset\(\s*['"]storage\/\s*'\s*\.\s*\$settings->logo\s*\)\s*\}\}/gi,
      "{{LOGO_URL}}",
    ],
    [
      /\{\{asset\('storage\/'\s*\.\s*\$settings->logo\)\}\}/gi,
      "{{LOGO_URL}}",
    ],
    [
      /\{\{\s*asset\('storage\/photos\/'\s*\.\s*\$settings->logo\s*\)\s*\}\}/gi,
      "{{LOGO_URL}}",
    ],
    [/\{\{asset\('storage\/'\.\$settings->logo\)\}\}/gi, "{{LOGO_URL}}"],
    [/\{\{\s*asset\('storage\/'\s*\.\s*\$settings->logo\s*\)\s*\}\}/gi, "{{LOGO_URL}}"],
    [/\{\{\$total_users\+89650\}\}/g, "{{STAT_TOTAL_USERS}}"],
    [/\{\{\$total_deposits\+338400989\}\}/g, "{{STAT_TOTAL_DEPOSITS}}"],
    [/\{\{\$total_withdrawals\+101689885\}\}/g, "{{STAT_TOTAL_WITHDRAWALS}}"],
    [/<\?php echo date\('z'\)\+2000\?>/g, "{{STAT_DAYS_IN_WORK}}"],
    [/href="register"/g, 'href="/auth/signup"'],
    [/href="login"/g, 'href="/auth/login"'],
    [/href="about"/g, 'href="/about"'],
    [/href="faq"/g, 'href="/faq"'],
    [/href="terms"/g, 'href="/terms"'],
    [/href="privacy"/g, 'href="/privacy"'],
    [/href="investments"/g, 'href="/investments"'],
    [/href="optioncopytrading"/g, 'href="/optioncopytrading"'],
    [/href="oilandgas"/g, 'href="/oilandgas"'],
    [/href="contact"/g, 'href="/contact"'],
    [/href="forex"/g, 'href="/forex"'],
    [/href="futures"/g, 'href="/futures"'],
    [/href="stocks"/g, 'href="/stocks"'],
    [/href="advancetrading"/g, 'href="/advancetrading"'],
    [/href="livetrading"/g, 'href="/livetrading"'],
    [/href="softwares"/g, 'href="/softwares"'],
    [/href="statistic"/g, 'href="/statistic"'],
    [/href="verify"/g, 'href="/verify"'],
    [/url\(front\//g, "url(/front/"],
    [/src="front\//g, 'src="/front/'],
    [/href="front\//g, 'href="/front/'],
    [/href="temp\//g, 'href="/temp/'],
    [/src="temp\//g, 'src="/temp/'],
    [/use href="temp\//g, 'use href="/temp/'],
    [/href="index\.html"/g, 'href="/"'],
    [/\{\{\s*\$captcha\s*\}\}/g, "{{VERIFY_CAPTCHA}}"],
    [/\{\{(?!LOGO_URL|SITE_NAME|STAT_TOTAL_USERS|STAT_TOTAL_DEPOSITS|STAT_TOTAL_WITHDRAWALS|STAT_DAYS_IN_WORK|VERIFY_CAPTCHA)[^}]+\}\}/g, ""],
    [/\{!![^!]+!!\}/g, ""],
    [/@csrf/g, ""],
    [/action="\{\{[^"]+\}\}"/g, 'action="#"'],
  ];

  let out = html;
  for (const [pattern, repl] of replacements) {
    out = out.replace(pattern, repl);
  }
  return out.trim();
}

const base = fs.readFileSync(basePath, "utf8");
const shell = loadPortoShell(base);

fs.mkdirSync(outDir, { recursive: true });

for (const [slug, file] of Object.entries(PORTO_PAGES)) {
  const bladePath = path.join(viewsHome, file);
  if (!fs.existsSync(bladePath)) {
    console.warn(`Skip missing ${file}`);
    continue;
  }
  const blade = fs.readFileSync(bladePath, "utf8");
  const content = extractSection(blade);
  if (!content) {
    console.error(`No @section('content') in ${file}`);
    process.exitCode = 1;
    continue;
  }
  const html = postProcessHtml(
    [shell.header, content, shell.footer, shell.modal].join("\n\n"),
  );
  const outPath = path.join(outDir, `${slug}.html`);
  fs.writeFileSync(outPath, html + "\n", "utf8");
  console.log(`Wrote ${outPath} (${html.length} chars)`);
}

if (fs.existsSync(verifyPath)) {
  const verifyBlade = fs.readFileSync(verifyPath, "utf8");
  const verifyContent = extractSection(verifyBlade);
  if (verifyContent) {
    const verifyHtml = postProcessHtml(verifyContent);
    fs.writeFileSync(path.join(outDir, "verify-guest.html"), verifyHtml + "\n", "utf8");
    console.log(`Wrote verify-guest.html (${verifyHtml.length} chars)`);
  }
}

// Legacy single-file path (home) for older imports
fs.copyFileSync(path.join(outDir, "home.html"), path.join(root, "src/content/berkforte/marketing-home.html"));
console.log("Synced marketing-home.html from pages/home.html");
