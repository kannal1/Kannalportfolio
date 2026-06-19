/* =====================================================================
   Smooth scroll (Lenis) — inertia scrolling that preserves sticky + IO.
   Loaded on every page before the page script. Exposes window.__lenis
   and window.__scrollTo(target) for anchors / back-to-top.
   ===================================================================== */
(function(){
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Native fallback if reduced-motion or Lenis missing
  function nativeScrollTo(target, offset){
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    var y = (el === window || !el) ? 0 : el.getBoundingClientRect().top + scrollY - (offset||0);
    scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }

  if (reduce || typeof Lenis === 'undefined'){
    window.__scrollTo = nativeScrollTo;
    return;
  }

  var lenis = new Lenis({
    duration: 1.05,                       // weighted, premium feel
    easing: function(t){ return 1 - Math.pow(1 - t, 3); },  // ease-out cubic
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    syncTouch: false
  });
  window.__lenis = lenis;

  function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // anchors / back-to-top use Lenis for smoothness
  window.__scrollTo = function(target, offset){
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el === window || el === document.body) { lenis.scrollTo(0); return; }
    if (el) lenis.scrollTo(el, { offset: -(offset||20), duration: 1.1 });
  };

  // pause smoothing during the page-transition veil so navigation feels instant
  window.addEventListener('pagehide', function(){ try{ lenis.stop(); }catch(e){} });
})();
