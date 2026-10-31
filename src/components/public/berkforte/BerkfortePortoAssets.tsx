import Script from "next/script";

/** Porto theme CSS/JS for Berk Forte marketing (from berkforte.com `public/front`). */
export function BerkfortePortoAssets() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800%7CShadows+Into+Light&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/front/vendor/bootstrap/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/front/vendor/fontawesome-free/css/all.min.css" />
      <link rel="stylesheet" href="/front/vendor/animate/animate.compat.css" />
      <link
        rel="stylesheet"
        href="/front/vendor/simple-line-icons/css/simple-line-icons.min.css"
      />
      <link rel="stylesheet" href="/front/vendor/owl.carousel/assets/owl.carousel.min.css" />
      <link
        rel="stylesheet"
        href="/front/vendor/owl.carousel/assets/owl.theme.default.min.css"
      />
      <link rel="stylesheet" href="/front/vendor/magnific-popup/magnific-popup.min.css" />
      <link rel="stylesheet" href="/front/css/theme.css" />
      <link rel="stylesheet" href="/front/css/theme-elements.css" />
      <link rel="stylesheet" href="/front/css/theme-blog.css" />
      <link rel="stylesheet" href="/front/css/theme-shop.css" />
      <link rel="stylesheet" href="/front/css/skins/default.css" />
      <link rel="stylesheet" href="/front/css/custom.css" />
      <link rel="stylesheet" href="/front/css/lighthouse-nav.css" />
      <Script src="/dash/js/core/jquery.3.2.1.min.js" strategy="beforeInteractive" />
      <Script src="/front/js/theme.js" strategy="afterInteractive" />
      <Script src="/front/vendor/plugins/js/plugins.min.js" strategy="afterInteractive" />
      <Script src="/front/js/theme.init.js" strategy="afterInteractive" />
    </>
  );
}
