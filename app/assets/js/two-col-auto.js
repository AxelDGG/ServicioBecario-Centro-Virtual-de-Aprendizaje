/* two-col-auto.js
   En desktop (>= 992px), si un .card supera cierto alto, le agrega la clase
   .card--two-col para repartir su contenido en 2 columnas y aprovechar el
   ancho. Calcula la altura --two-col-height para forzar que la columna
   izquierda se llene primero antes de pasar contenido a la derecha. */

(function () {
    'use strict';

    var DESKTOP_MIN_WIDTH = 992;
    var TWO_COL_THRESHOLD_PX = 1100;
    var COLUMN_BUFFER_PX = 80;
    var TWO_COL_CLASS = 'card--two-col';
    var OPT_OUT_CLASS = 'card--no-two-col';
    var FORCE_CLASS = 'card--force-two-col';

    // Selectores que indican que la card NO debe entrar en 2 columnas
    // (composiciones especiales que se romperian al partirlas).
    var EXCLUDE_CHILD_SELECTORS = [
        '.card-horizon',
        '.widget-feed',
        '.progress',
        '.btn-group',
        '#circlecontainer'
    ];

    function shouldSkip(card) {
        if (card.classList.contains(OPT_OUT_CLASS)) return true;
        // No tocar cards que ya viven dentro de un split-view manual
        if (card.closest && card.closest('.split-view')) return true;
        // El opt-in explicito sobreescribe la heuristica de exclusion
        if (card.classList.contains(FORCE_CLASS)) return false;
        for (var i = 0; i < EXCLUDE_CHILD_SELECTORS.length; i++) {
            if (card.querySelector(EXCLUDE_CHILD_SELECTORS[i])) return true;
        }
        return false;
    }

    function applyTwoColLayout() {
        var isDesktop = window.innerWidth >= DESKTOP_MIN_WIDTH;
        var cards = document.querySelectorAll('.card');

        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];

            if (!isDesktop) {
                card.classList.remove(TWO_COL_CLASS);
                card.style.removeProperty('--two-col-height');
                continue;
            }

            if (shouldSkip(card)) {
                card.classList.remove(TWO_COL_CLASS);
                card.style.removeProperty('--two-col-height');
                continue;
            }

            // Medir altura sin la clase aplicada para evitar histeresis
            var hadClass = card.classList.contains(TWO_COL_CLASS);
            if (hadClass) {
                card.classList.remove(TWO_COL_CLASS);
                card.style.removeProperty('--two-col-height');
            }

            var heightOneCol = card.scrollHeight;
            var forced = card.classList.contains(FORCE_CLASS);

            if (heightOneCol > TWO_COL_THRESHOLD_PX || forced) {
                var targetHeight = Math.ceil(heightOneCol / 2 + COLUMN_BUFFER_PX);

                // Si la card tiene tabs, el contenido del tab activo va a
                // la columna derecha completo. La altura objetivo debe ser
                // al menos la del panel activo para que no se corte.
                var activePane = card.querySelector('.tab-content > .tab-pane.active, .tab-content > .tab-pane.show.active');
                if (activePane) {
                    var paneHeight = activePane.scrollHeight + COLUMN_BUFFER_PX;
                    if (paneHeight > targetHeight) targetHeight = paneHeight;
                }

                card.style.setProperty('--two-col-height', targetHeight + 'px');
                card.classList.add(TWO_COL_CLASS);
            }
        }
    }

    var resizeTimer = null;
    function onResize() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(applyTwoColLayout, 150);
    }

    function init() {
        applyTwoColLayout();
        window.addEventListener('resize', onResize);
        // Reaplicar tras carga de imagenes (puede cambiar el alto medido)
        window.addEventListener('load', applyTwoColLayout);
        // Recalcular cuando el usuario cambia de tab (cada panel puede
        // tener una altura distinta y el contenedor debe ajustarse).
        if (typeof window.jQuery !== 'undefined') {
            window.jQuery(document).on('shown.bs.tab', function () {
                applyTwoColLayout();
            });
        } else {
            document.addEventListener('shown.bs.tab', applyTwoColLayout, true);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
