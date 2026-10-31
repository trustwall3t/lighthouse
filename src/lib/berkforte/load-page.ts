import "server-only";

import type { BerkfortePublicSlug } from "@/lib/berkforte/slugs";
import { injectBerkfortePageVars } from "@/lib/berkforte/page-vars";
import type { HomeStats } from "@/types/site";
import fs from "node:fs";
import path from "node:path";

const pagesDir = () => path.join(process.cwd(), "src/content/berkforte/pages");

export function loadBerkfortePageHtml(slug: "home" | BerkfortePublicSlug | "verify-guest"): string {
  const file = path.join(pagesDir(), `${slug}.html`);
  return fs.readFileSync(file, "utf8");
}

type RenderOptions = {
  logoUrl: string;
  siteName: string;
  contactEmail?: string | null;
  stats?: HomeStats | null;
};

export function renderBerkfortePortoPageHtml(
  slug: "home" | BerkfortePublicSlug,
  opts: RenderOptions,
): string {
  return injectBerkfortePageVars(loadBerkfortePageHtml(slug), opts);
}
