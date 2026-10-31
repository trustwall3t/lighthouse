"use client";

import Script from "next/script";

/** Loads GTranslate + Google widget for Porto modal (`#google_translate_element2`, `doGTranslate`). */
export function BerkforteGTranslate() {
  return (
    <>
      <div id="google_translate_element2" className="lhw-gtranslate-engine-host" aria-hidden="true" />
      <Script id="berkforte-gtranslate-do" strategy="afterInteractive">
        {`
window.doGTranslate = function doGTranslate(arg) {
  var pair = typeof arg === "string" ? arg : arg && arg.value;
  if (!pair) return;
  var lang = pair.split("|")[1];
  if (!lang) return;
  var combo = null;
  var selects = document.getElementsByTagName("select");
  for (var i = 0; i < selects.length; i++) {
    if (selects[i].className === "goog-te-combo") {
      combo = selects[i];
      break;
    }
  }
  var mount = document.getElementById("google_translate_element2");
  if (!mount || !mount.innerHTML.length || !combo || !combo.innerHTML.length) {
    setTimeout(function () { window.doGTranslate(arg); }, 500);
    return;
  }
  combo.value = lang;
  try {
    var ev = document.createEvent("HTMLEvents");
    ev.initEvent("change", true, true);
    combo.dispatchEvent(ev);
    combo.dispatchEvent(ev);
  } catch (e) {}
};

function googleTranslateElementInit2() {
  if (!window.google || !google.translate || !google.translate.TranslateElement) return;
  if (document.getElementById("google_translate_element2")) {
    new google.translate.TranslateElement(
      { pageLanguage: "en", autoDisplay: false },
      "google_translate_element2"
    );
  }
}
window.googleTranslateElementInit2 = googleTranslateElementInit2;
`}
      </Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2"
        strategy="afterInteractive"
      />
    </>
  );
}
