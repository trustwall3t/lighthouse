"use client";

import Script from "next/script";

/** Ensures Porto scroll animations never leave main content at opacity 0. */
export function BerkfortePortoReveal() {
  return (
    <Script id="berkforte-porto-reveal" strategy="afterInteractive">
      {`
(function () {
  function reveal() {
    var root = document.querySelector(".berkforte-porto-page");
    if (!root) return;
    root.querySelectorAll(".appear-animation, .block-appear-animation").forEach(function (el) {
      el.classList.add("appear-animation-visible");
      el.style.opacity = "1";
      el.style.visibility = "visible";
    });
    root.querySelectorAll(".main, .main-layout__content, section, .section").forEach(function (el) {
      el.style.opacity = "1";
      el.style.visibility = "visible";
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", reveal);
  } else {
    reveal();
  }
  window.addEventListener("load", reveal);
})();
`}
    </Script>
  );
}
