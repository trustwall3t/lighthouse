"use client";

import Script from "next/script";

/** Porto counter plugin runs in theme.init before React injects marketing HTML — re-init here. */
export function BerkfortePortoCounters() {
  return (
    <Script id="berkforte-porto-counters" strategy="afterInteractive">
      {`
(function () {
  function applyFallback($el) {
    var fb = $el.attr("data-fallback");
    if (fb) {
      $el.text(fb);
      return;
    }
    var to = parseInt($el.attr("data-to"), 10);
    if (!to || isNaN(to)) return;
    var append = $el.attr("data-append") || "";
    $el.text(to.toLocaleString("en-US") + append);
  }

  function init() {
    var root = document.querySelector(".berkforte-porto-page");
    if (!root || typeof jQuery === "undefined") return false;

    var $ = jQuery;
    var $targets = $(root).find(".counters [data-to]").filter(function () {
      var to = $(this).attr("data-to");
      return to && /^\\d+$/.test(String(to).trim());
    });

    if (!$targets.length) return false;

    if (!window.theme || !$.isFunction($.fn.themePluginCounter) || !$.isFunction($.fn.countTo)) {
      $targets.each(function () {
        applyFallback($(this));
      });
      return true;
    }

    var defaults = $.extend({}, window.theme.PluginCounter.defaults, {
      forceInit: true,
      speed: 2200,
    });

    $targets.each(function () {
      var $el = $(this);
      if ($el.data("__counter")) return;
      var to = parseInt($el.attr("data-to"), 10);
      if (!to || isNaN(to)) {
        applyFallback($el);
        return;
      }
      $el.text("0");
      try {
        $el.themePluginCounter(defaults);
      } catch (e) {
        applyFallback($el);
      }
    });

    setTimeout(function () {
      $targets.each(function () {
        var $el = $(this);
        var t = ($el.text() || "").trim();
        if (t === "0" || t === "") applyFallback($el);
      });
    }, 2800);

    return true;
  }

  function run() {
    if (init()) return;
    var tries = 0;
    var t = setInterval(function () {
      tries += 1;
      if (init() || tries > 40) clearInterval(t);
    }, 150);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
  window.addEventListener("load", run);
})();
`}
    </Script>
  );
}
