(function () {
  function readCookieLang(pageLang) {
    var match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (!match) {
      return pageLang;
    }
    var parts = decodeURIComponent(match[1]).split("/").filter(Boolean);
    if (parts.length >= 2) {
      return parts[parts.length - 1];
    }
    return pageLang;
  }

  function clearGoogTransCookies() {
    var host = window.location.hostname;
    var expired = "Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "googtrans=;path=/;expires=" + expired;
    if (host) {
      document.cookie = "googtrans=;path=/;domain=" + host + ";expires=" + expired;
      document.cookie = "googtrans=;path=/;domain=." + host + ";expires=" + expired;
    }
  }

  function setGoogTrans(pageLang, lang) {
    if (!lang || lang === pageLang) {
      clearGoogTransCookies();
      return;
    }
    var value = "/" + pageLang + "/" + lang;
    var host = window.location.hostname;
    document.cookie = "googtrans=" + encodeURIComponent(value) + ";path=/";
    if (host) {
      document.cookie = "googtrans=" + encodeURIComponent(value) + ";path=/;domain=" + host;
      document.cookie = "googtrans=" + encodeURIComponent(value) + ";path=/;domain=." + host;
    }
  }

  function bindSelect(select) {
    if (select.dataset.gtranslateBound === "1") {
      return;
    }
    var root = select.closest("[data-sr-lang-picker]");
    if (!root) {
      return;
    }
    var pageLang = root.getAttribute("data-page-lang") || "en";
    var active = readCookieLang(pageLang);
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === active) {
        select.value = active;
        break;
      }
    }
    select.addEventListener("change", function () {
      setGoogTrans(pageLang, select.value);
      window.location.reload();
    });
    select.dataset.gtranslateBound = "1";
  }

  function initAllPickers() {
    var selects = document.querySelectorAll("[data-sr-gtranslate-select]");
    for (var i = 0; i < selects.length; i++) {
      bindSelect(selects[i]);
    }
  }

  window.__srInitGtranslatePickers = initAllPickers;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllPickers);
  } else {
    initAllPickers();
  }
})();
