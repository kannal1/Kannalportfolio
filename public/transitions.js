/* =====================================================================
   Page transitions — a continuous upward wipe between pages.
   Included on every page before the page-specific script.
   ===================================================================== */
(function(){
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* build the veil */
  var veil = document.createElement('div');
  veil.className = 'pageveil';
  veil.innerHTML = '<div class="pv-mark"><span class="pv-sq"></span><b>KU</b></div>';
  document.body.appendChild(veil);

  if (reduce){
    veil.style.display = 'none';
  } else {
    /* ENTER: veil starts covering, then slides up & away to reveal the page */
    veil.classList.add('cover');                 // instant, no transition (CSS handles)
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        veil.classList.add('anim');              // enable transition
        veil.classList.remove('cover');
        veil.classList.add('out');               // slide up off-screen
      });
    });
    setTimeout(function(){ veil.classList.remove('anim','out'); veil.classList.add('rest'); }, 720);
  }

  /* LEAVE: intercept internal links, wipe up to cover, then navigate */
  function leave(url){
    if (reduce){ location.href = url; return; }
    veil.classList.remove('rest','out','cover');
    /* place veil below the viewport with no transition, then transition up to cover */
    veil.classList.add('below');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        veil.classList.add('anim');
        veil.classList.remove('below');
        veil.classList.add('cover');
      });
    });
    setTimeout(function(){ location.href = url; }, 560);
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href]');
    if (!a) return;
    if (a.hasAttribute('data-no-trans')) return;
    var href = a.getAttribute('href');
    if (!href) return;
    if (href.charAt(0) === '#') return;                          // same-page anchor
    if (/^(https?:|mailto:|tel:)/i.test(href)) return;           // external
    if (a.target === '_blank') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    leave(href);
  });

  /* restore on back/forward cache */
  addEventListener('pageshow', function(ev){
    if (ev.persisted){ veil.classList.remove('cover','below','anim'); veil.classList.add('out','rest'); }
  });
})();
