import Script from "next/script";

/** Guest auth layout assets (`public/temp` from berkforte.com). */
export function BerkforteGuestAssets() {
  return (
    <>
      <link rel="stylesheet" href="/temp/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/temp/css/materialdesignicons.min.css" />
      <link rel="stylesheet" href="/temp/css/line.css" />
      <link rel="stylesheet" href="/temp/css/style.css" />
      <link rel="stylesheet" href="/temp/css/colors/default.css" />
      <Script src="/temp/js/jquery-3.5.1.min.js" strategy="afterInteractive" />
      <Script src="/temp/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/temp/js/feather.min.js" strategy="afterInteractive" />
      <Script src="/temp/js/app.js" strategy="afterInteractive" />
    </>
  );
}
