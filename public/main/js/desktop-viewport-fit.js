/**
 * Keeps public pages at a fixed desktop layout width, scaled to fit the device
 * (same effect as Hana Fidelity public mobile — full desktop UI, no sideways scroll).
 */
(function () {
    var meta = document.querySelector('meta[name="viewport"][data-sr-fit]');
    if (!meta) {
        return;
    }

    var root = document.documentElement;
    root.classList.add('sr-desktop-lock');
    if (document.body) {
        document.body.classList.add('sr-desktop-lock');
    }

    var layoutWidth = parseInt(meta.getAttribute('data-layout-width'), 10) || 1200;

    /** Physical screen width in CSS px — matches public-viewport document.write. */
    function readDeviceWidth() {
        if (window.screen && window.screen.width > 0) {
            return window.screen.width;
        }
        if (window.visualViewport && window.visualViewport.width > 0) {
            return window.visualViewport.width;
        }

        return window.innerWidth || layoutWidth;
    }

    function computeScale(deviceWidth) {
        var scale = layoutWidth > 0 ? deviceWidth / layoutWidth : 1;
        if (scale > 1) {
            scale = 1;
        }

        return Math.round(scale * 10000) / 10000;
    }

    function viewportContent(scale) {
        return (
            'width=' + layoutWidth +
            ', initial-scale=' + scale +
            ', minimum-scale=' + scale +
            ', maximum-scale=5' +
            ', user-scalable=yes' +
            ', viewport-fit=cover'
        );
    }

    function syncViewportHeight() {
        var h = 0;
        if (window.visualViewport && window.visualViewport.height > 0) {
            h = window.visualViewport.height;
        } else if (window.innerHeight > 0) {
            h = window.innerHeight;
        }
        if (h > 0) {
            root.style.setProperty('--sr-viewport-h', h + 'px');
        }
    }

    function markReady() {
        syncViewportHeight();
        root.classList.remove('sr-desktop-boot');
        root.classList.add('sr-desktop-ready');
    }

    function apply() {
        var scale = computeScale(readDeviceWidth());
        var next = viewportContent(scale);
        if (meta.content !== next) {
            meta.content = next;
        }
    }

    function reveal() {
        markReady();
    }

    /* document.write already set the viewport; only adjust on resize/orientation. */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            requestAnimationFrame(function () {
                requestAnimationFrame(reveal);
            });
        }, { once: true });
    } else {
        requestAnimationFrame(function () {
            requestAnimationFrame(reveal);
        });
    }

    setTimeout(reveal, 2500);

    window.addEventListener('orientationchange', function () {
        setTimeout(function () {
            apply();
            syncViewportHeight();
            reveal();
        }, 200);
    });
    window.addEventListener('resize', function () {
        apply();
        syncViewportHeight();
    });
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', function () {
            apply();
            syncViewportHeight();
        });
    }
})();
