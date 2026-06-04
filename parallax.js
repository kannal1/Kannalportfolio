(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function init() {
    var homeHero = document.querySelector('.hero');
    var birds = document.querySelector('canvas#birds');
    var heroFade = document.querySelector('.herofade');
    var blooms = Array.prototype.slice.call(document.querySelectorAll('.fx-blooms i'));

    var layerSelectors = [
      '.proj .shot img',
      '.play-piece video',
      '.story-step',
      '.cards3 .c',
      '.impact .card',
      '.meta-cell',
      '.img-2 img',
      '.screen-grid figure',
      '.phone-grid figure',
      '.flow-grid figure',
      '.ds-card',
      '[data-plx="layer"]'
    ];

    var zoomSelectors = [
      'figure.board img',
      'figure.hero-shot img',
      'figure[data-plx="zoom"] img',
      '[data-plx="zoom"]:not(figure)'
    ];

    var layers = [];
    var seen = new WeakSet();

    function add(el, mode, depth) {
      if (!el || seen.has(el)) return;
      seen.add(el);
      el.style.willChange = 'transform';
      el.style.transformOrigin = 'center center';
      layers.push({
        el: el,
        mode: mode,
        depth: depth || 18
      });
    }

    document.querySelectorAll(layerSelectors.join(',')).forEach(function (el, index) {
      add(el, 'layer', 10 + (index % 5) * 5);
    });

    document.querySelectorAll(zoomSelectors.join(',')).forEach(function (el, index) {
      add(el, 'zoom', 16 + (index % 4) * 4);
      if (el.parentElement && el.parentElement.tagName === 'FIGURE') {
        el.parentElement.style.overflow = 'hidden';
      }
    });

    var ticking = false;

    function update() {
      ticking = false;
      var vh = window.innerHeight || 1;

      if (homeHero) {
        var heroRect = homeHero.getBoundingClientRect();
        var heroProgress = clamp(-heroRect.top / vh, 0, 1.15);
        if (heroRect.bottom > -80) {
          if (birds) {
            birds.style.transform = 'translate3d(0,' + (heroProgress * 42).toFixed(2) + 'px,0) scale(' + (1 + heroProgress * 0.045).toFixed(4) + ')';
          }
          if (heroFade) {
            heroFade.style.transform = 'translate3d(0,' + (heroProgress * 24).toFixed(2) + 'px,0) scale(' + (1 + heroProgress * 0.025).toFixed(4) + ')';
            heroFade.style.opacity = (1 - heroProgress * 0.18).toFixed(3);
          }
          blooms.forEach(function (bloom, index) {
            var drift = heroProgress * (30 + index * 18);
            bloom.style.transform = 'translate3d(0,' + drift.toFixed(2) + 'px,0) scale(' + (1 + heroProgress * (0.08 + index * 0.02)).toFixed(4) + ')';
          });
        }
      }

      layers.forEach(function (item) {
        var rect = item.el.getBoundingClientRect();
        if (rect.bottom < -180 || rect.top > vh + 180) return;

        var centerOffset = ((rect.top + rect.height / 2) - vh / 2) / vh;
        var y = -centerOffset * item.depth;

        if (item.mode === 'zoom') {
          var focus = 1 - clamp(Math.abs(centerOffset) * 1.55, 0, 1);
          var scale = 1 + focus * 0.065;
          item.el.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0) scale(' + scale.toFixed(4) + ')';
        } else {
          item.el.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
        }
      });
    }

    function requestTick() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
