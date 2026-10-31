(function () {
  var PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174';

  function initViewer(root) {
    var url = root.getAttribute('data-pdf-url');
    if (!url) return;

    var canvas = root.querySelector('[data-sr-pdf-canvas]');
    var stage = root.querySelector('[data-sr-pdf-stage]');
    var pageInfo = root.querySelector('[data-sr-pdf-page-info]');
    var prevBtn = root.querySelector('[data-sr-pdf-prev]');
    var nextBtn = root.querySelector('[data-sr-pdf-next]');
    var zoomInBtn = root.querySelector('[data-sr-pdf-zoom-in]');
    var zoomOutBtn = root.querySelector('[data-sr-pdf-zoom-out]');
    var fitBtn = root.querySelector('[data-sr-pdf-fit-width]');
    var loadingEl = root.querySelector('[data-sr-pdf-loading]');
    var errorEl = root.querySelector('[data-sr-pdf-error]');

    if (!canvas || !stage) return;

    var pdfDoc = null;
    var pageNum = 1;
    var pageCount = 0;
    var scale = 1;
    var fitWidth = true;
    var rendering = false;
    var pendingPage = null;

    function setLoading(on) {
      if (loadingEl) loadingEl.hidden = !on;
    }

    function setError(message) {
      if (errorEl) {
        errorEl.hidden = !message;
        if (message) errorEl.textContent = message;
      }
    }

    function updateControls() {
      if (pageInfo) {
        pageInfo.textContent = pageCount ? 'Page ' + pageNum + ' of ' + pageCount : '—';
      }
      if (prevBtn) prevBtn.disabled = pageNum <= 1;
      if (nextBtn) nextBtn.disabled = !pageCount || pageNum >= pageCount;
    }

    function renderPage(num) {
      if (!pdfDoc) return;
      rendering = true;
      setLoading(true);

      pdfDoc.getPage(num).then(function (page) {
        var viewport = page.getViewport({ scale: 1 });
        var targetScale = scale;

        if (fitWidth && stage.clientWidth > 0) {
          var padding = 32;
          targetScale = (stage.clientWidth - padding) / viewport.width;
        } else if (!fitWidth) {
          targetScale = scale;
        }

        var scaledViewport = page.getViewport({ scale: targetScale });
        canvas.width = Math.floor(scaledViewport.width);
        canvas.height = Math.floor(scaledViewport.height);
        canvas.style.width = scaledViewport.width + 'px';
        canvas.style.height = scaledViewport.height + 'px';

        return page.render({
          canvasContext: canvas.getContext('2d'),
          viewport: scaledViewport,
        }).promise;
      }).then(function () {
        rendering = false;
        setLoading(false);
        updateControls();
        if (pendingPage !== null) {
          var next = pendingPage;
          pendingPage = null;
          goToPage(next);
        }
      }).catch(function () {
        rendering = false;
        setLoading(false);
        setError('Unable to display this page. Try downloading the PDF instead.');
      });
    }

    function goToPage(num) {
      if (!pdfDoc || num < 1 || num > pageCount) return;
      if (rendering) {
        pendingPage = num;
        return;
      }
      pageNum = num;
      renderPage(pageNum);
    }

    function loadPdf() {
      if (typeof pdfjsLib === 'undefined') {
        setError('PDF viewer failed to load. Please download the document.');
        return;
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_CDN + '/pdf.worker.min.js';
      setLoading(true);
      setError('');

      pdfjsLib.getDocument({ url: url, withCredentials: false }).promise.then(function (pdf) {
        pdfDoc = pdf;
        pageCount = pdf.numPages;
        pageNum = 1;
        updateControls();
        renderPage(pageNum);
      }).catch(function () {
        setLoading(false);
        setError('Could not load the certificate PDF. Check the file or use Download PDF.');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToPage(pageNum - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToPage(pageNum + 1);
      });
    }
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', function () {
        fitWidth = false;
        scale = Math.min(scale + 0.2, 3);
        renderPage(pageNum);
      });
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', function () {
        fitWidth = false;
        scale = Math.max(scale - 0.2, 0.6);
        renderPage(pageNum);
      });
    }
    if (fitBtn) {
      fitBtn.addEventListener('click', function () {
        fitWidth = true;
        renderPage(pageNum);
      });
    }

    root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPage(pageNum - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToPage(pageNum + 1);
      }
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (pdfDoc && fitWidth) renderPage(pageNum);
      }, 150);
    });

    loadPdf();
  }

  function boot() {
    var nodes = document.querySelectorAll('[data-sr-pdf-viewer]');
    if (!nodes.length) return;
    nodes.forEach(initViewer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
