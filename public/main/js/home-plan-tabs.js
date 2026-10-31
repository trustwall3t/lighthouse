(function () {
    var root = document.querySelector('[data-sr-plan-tabs]');
    if (!root) {
        return;
    }

    var tabs = root.querySelectorAll('[data-sr-plan-tab]');
    var panels = root.querySelectorAll('[data-sr-plan-panel]');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var id = tab.getAttribute('data-sr-plan-tab');
            if (!id) {
                return;
            }

            tabs.forEach(function (t) {
                var active = t === tab;
                t.classList.toggle('is-active', active);
                t.setAttribute('aria-selected', active ? 'true' : 'false');
            });

            panels.forEach(function (panel) {
                var show = panel.getAttribute('data-sr-plan-panel') === id;
                panel.classList.toggle('is-active', show);
                panel.hidden = !show;
            });
        });
    });
})();
