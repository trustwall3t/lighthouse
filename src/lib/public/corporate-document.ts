import fs from "node:fs";
import path from "node:path";

const DEFAULT_PATH = "documents/certificate-of-incorporation.pdf";

export type CorporateCertificate = {
  title: string;
  lead: string;
  entityLabel: string;
  url: string | null;
  exists: boolean;
  filename: string | null;
};

/** Mirrors silkroadaassets `CorporateDocument::certificateOfIncorporation()`. */
export function getCorporateCertificate(): CorporateCertificate | null {
  const enabled = process.env.CORPORATE_CERTIFICATE_ENABLED !== "0";
  if (!enabled) return null;

  const relative = (
    process.env.CORPORATE_CERTIFICATE_PATH ?? DEFAULT_PATH
  ).replace(/^\/+/, "");

  const publicPath = path.join(process.cwd(), "public", relative);
  const exists = fs.existsSync(publicPath) && fs.statSync(publicPath).isFile();

  return {
    title: process.env.CORPORATE_CERTIFICATE_TITLE ?? "Certificate of incorporation",
    lead:
      process.env.CORPORATE_CERTIFICATE_LEAD ??
      "Registered Asia-Pacific corporation. Official filing document. Use the page controls below to read each page, or download the full PDF.",
    entityLabel: process.env.CORPORATE_CERTIFICATE_ENTITY ?? "Asian corporation",
    url: exists ? `/${relative}` : null,
    exists,
    filename: path.basename(relative),
  };
}
