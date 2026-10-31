import { DEFAULT_SITE_NAME } from "@/lib/site/default-brand";

const BRAND_DISPLAY = DEFAULT_SITE_NAME;

type FixOptions = {
  siteName: string;
  logoUrl: string;
  contactEmail: string;
};

/** Porto nav + Light House Wealth branding applied when serving cached HTML. */
export function applyMarketingHtmlFixes(html: string, opts: FixOptions): string {
  let out = html;

  out = out.replace(/\sappear-animation/g, "");
  out = out.replace(/\sdata-appear-animation="[^"]*"/g, "");
  out = out.replace(/\sdata-appear-animation-delay="[^"]*"/g, "");

  out = out.replaceAll('href="mailto:support@berkForte.com"', `href="mailto:${opts.contactEmail}"`);
  out = out.replaceAll("support@berkForte.com", opts.contactEmail);
  out = out.replaceAll("support@berkforte.com", opts.contactEmail);
  out = out.replaceAll("SUPPORT@BERKFORTE.COM", opts.contactEmail.toUpperCase());

  out = out.replace(
    /(<a\s+class="nav-link"\s+)href="mailto:[^"]+"(\s*><i[\s\S]*?>\s*Contact Us)/g,
    '$1href="/contact"$2',
  );

  const addDropdownToggle = (label: string) => {
    const re = new RegExp(
      `<li class="dropdown">\\s*<a\\s+class="dropdown-item dropdown-toggle"\\s+href="#"\\s*>\\s*${label}\\s*<\\/a>`,
      "g",
    );
    out = out.replace(
      re,
      `<li class="dropdown"><a class="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">${label}</a>`,
    );
  };
  addDropdownToggle("Company");
  addDropdownToggle("Investors");
  addDropdownToggle("Services");

  // Header nav only — never use lazy [\s\S]*? across the document (home has /auth/login in body).
  out = out.replace(
    /<li class="">\s*<a\s+class="dropdown-item dropdown-toggle"\s+href="\/auth\/login"\s*>\s*Login\s*<\/a>\s*<\/li>/g,
    `<li><a class="nav-link px-3" href="/auth/login">Login</a></li>`,
  );
  out = out.replace(
    /<li class="">\s*<a\s+class="dropdown-item dropdown-toggle"\s+href="\/auth\/signup"\s*>\s*Signup\s*<\/a>\s*<\/li>/g,
    `<li><a class="nav-link px-3" href="/auth/signup">Signup</a></li>`,
  );

  out = out.replace(
    /<li class="dropdown">\s*<a\s+class="dropdown-item dropdown-toggle"\s+href="\/"\s*>\s*Home\s*<\/a>\s*<\/li>/g,
    `<li><a class="dropdown-item" href="/">Home</a></li>`,
  );

  out = out.replace(/alt="Berk Forte"/gi, `alt="${opts.siteName}"`);
  out = out.replace(/src=""\s*\/>/g, `src="${opts.logoUrl}" />`);
  out = out.replace(/src=""\s*>/g, `src="${opts.logoUrl}">`);

  const brandPatterns: [RegExp, string][] = [
    [/Berk Forte Limited/gi, `${BRAND_DISPLAY} Limited`],
    [/Berk Forte/gi, BRAND_DISPLAY],
    [/Berk forte/gi, BRAND_DISPLAY],
    [/BerkForte/gi, BRAND_DISPLAY.replace(/\s/g, "")],
    [/© Berk Forte Copyright/gi, `© ${BRAND_DISPLAY} Copyright`],
  ];
  for (const [pattern, repl] of brandPatterns) {
    out = out.replace(pattern, repl);
  }

  out = out.replace(/operated by Light House Wealth Limited, registered in Singapore,\s*Canada and UK/gi, `operated by ${BRAND_DISPLAY}`);

  out = out.replaceAll(
    "col-9 col-lg-6 order-1 order-lg-2 scale-3 pb-5 pb-lg-0 mt-0 mt-md-4 mb-5 mb-lg-0",
    "col-12 col-lg-6 order-1 order-lg-2 lhw-wealth-card-visual pb-5 pb-lg-0 mt-0 mt-md-4 mb-5 mb-lg-0",
  );

  out = out.replace(
    /<nav class="collapse">/g,
    '<nav class="collapse" id="lhw-mobile-nav">',
  );
  out = out.replace(
    /data-bs-target="\.header-nav-main nav"/g,
    'data-bs-target="#lhw-mobile-nav"',
  );

  out = out.replaceAll("http://gtranslate.net/", "https://gtranslate.net/");

  out = out.replace(/<div id="google_translate_element2"><\/div>/g, "");

  out = out.replace(
    /<a\s+href="#"\s+class=""\s+style="[\s\S]*?"\s+data-bs-toggle="modal"\s+data-bs-target="#defaultModal"\s*>/g,
    '<a href="#" class="lhw-lang-trigger" data-bs-toggle="modal" data-bs-target="#defaultModal">',
  );

  return out;
}
