(function () {
    var root = document.querySelector('[data-sr-prognosis]');
    if (!root) {
        return;
    }

    var statusEl = root.querySelector('[data-sr-prognosis-status]');
    var resultEl = root.querySelector('[data-sr-prognosis-result]');
    var loseEl = root.querySelector('[data-sr-prognosis-lose]');
    var winEl = root.querySelector('[data-sr-prognosis-win]');
    var buttons = root.querySelectorAll('[data-sr-prognosis-pick]');

    function reset() {
        if (statusEl) {
            statusEl.hidden = true;
        }
        if (resultEl) {
            resultEl.hidden = true;
        }
        if (loseEl) {
            loseEl.hidden = true;
        }
        if (winEl) {
            winEl.hidden = true;
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            reset();
            if (statusEl) {
                statusEl.hidden = false;
            }

            window.setTimeout(function () {
                if (statusEl) {
                    statusEl.hidden = true;
                }
                if (resultEl) {
                    resultEl.hidden = false;
                }
                var win = Math.random() > 0.35;
                if (winEl) {
                    winEl.hidden = !win;
                }
                if (loseEl) {
                    loseEl.hidden = win;
                }
            }, 1200);
        });
    });
})();
