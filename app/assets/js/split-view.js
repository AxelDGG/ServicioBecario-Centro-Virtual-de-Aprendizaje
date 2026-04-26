/* Split View
 * Convierte bloques <div class="split-view"> en:
 *  - Dos columnas lado a lado en escritorio (>= 992 px) — solo CSS.
 *  - Pestañas con botones Anterior/Siguiente en móvil/tablet (< 992 px).
 *
 * Markup esperado:
 *   <div class="split-view" data-split-labels="Parte 1|Parte 2">
 *     <div class="split-pane">...</div>
 *     <div class="split-pane">...</div>
 *   </div>
 */
(function () {
    'use strict';

    function initSplitView(root) {
        if (root.dataset.splitInit === '1') return;
        root.dataset.splitInit = '1';

        var panes = Array.prototype.filter.call(
            root.children,
            function (el) { return el.classList && el.classList.contains('split-pane'); }
        );
        if (panes.length < 2) return;

        // Envolver los paneles en un contenedor para que la nav y los controles queden fuera del flex
        var panesWrap = document.createElement('div');
        panesWrap.className = 'split-view__panes';
        var firstPane = panes[0];
        root.insertBefore(panesWrap, firstPane);
        panes.forEach(function (p) { panesWrap.appendChild(p); });

        // Etiquetas
        var labelAttr = root.getAttribute('data-split-labels') || '';
        var labels = labelAttr.split('|').map(function (s) { return s.trim(); });
        while (labels.length < panes.length) {
            labels.push('Parte ' + (labels.length + 1));
        }

        // Nav (pestañas) — solo visible en móvil vía CSS
        var nav = document.createElement('div');
        nav.className = 'split-view__nav';
        nav.setAttribute('role', 'tablist');

        var navBtns = labels.slice(0, panes.length).map(function (label, i) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'split-view__nav-btn';
            btn.textContent = label;
            btn.setAttribute('role', 'tab');
            btn.addEventListener('click', function () { setActive(i); });
            nav.appendChild(btn);
            return btn;
        });
        root.insertBefore(nav, panesWrap);

        // Controles Anterior / Siguiente — solo visible en móvil vía CSS
        var controls = document.createElement('div');
        controls.className = 'split-view__controls';

        var prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'split-view__ctrl-btn split-view__ctrl-btn--prev';
        prevBtn.innerHTML = '&laquo; Anterior';
        prevBtn.addEventListener('click', function () { setActive(activeIdx - 1); });

        var indicator = document.createElement('span');
        indicator.className = 'split-view__indicator';

        var nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'split-view__ctrl-btn split-view__ctrl-btn--next';
        nextBtn.innerHTML = 'Siguiente &raquo;';
        nextBtn.addEventListener('click', function () { setActive(activeIdx + 1); });

        controls.appendChild(prevBtn);
        controls.appendChild(indicator);
        controls.appendChild(nextBtn);
        root.appendChild(controls);

        var activeIdx = 0;
        function setActive(i) {
            if (i < 0) i = 0;
            if (i > panes.length - 1) i = panes.length - 1;
            activeIdx = i;
            panes.forEach(function (p, idx) {
                p.classList.toggle('is-active', idx === i);
            });
            navBtns.forEach(function (b, idx) {
                b.classList.toggle('is-active', idx === i);
                b.setAttribute('aria-selected', idx === i ? 'true' : 'false');
            });
            indicator.textContent = (i + 1) + ' / ' + panes.length;
            prevBtn.disabled = (i === 0);
            nextBtn.disabled = (i === panes.length - 1);
        }
        setActive(0);
    }

    function initAll() {
        var roots = document.querySelectorAll('.split-view');
        Array.prototype.forEach.call(roots, initSplitView);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();
