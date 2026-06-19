/* =====================================================================
   Motion & micro-interactions
   cursor · magnetic · reveals · word/line split · counters · nav ·
   smooth anchors · CGB tier · 3Eco roles · Ola dial · loader
   ===================================================================== */
(function(){
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = matchMedia('(pointer:coarse)').matches;
  var lerp = function(a,b,t){ return a+(b-a)*t; };

  /* ---------- per-project accent variable ---------- */
  document.querySelectorAll('.proj[data-accent]').forEach(function(p){
    p.style.setProperty('--p-acc', p.dataset.accent);
  });

  /* ---------- custom cursor (label style) ---------- */
  if (!coarse) {
    var cur = document.getElementById('cursor');
    var dot = document.getElementById('cursorDot');
    var clabel = document.getElementById('clabel');
    var cx = innerWidth/2, cy = innerHeight/2, rx = cx, ry = cy;
    addEventListener('pointermove', function(e){
      cx = e.clientX; cy = e.clientY;
      dot.style.transform = 'translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';
    });
    (function loop(){
      rx = lerp(rx, cx, 0.2); ry = lerp(ry, cy, 0.2);
      cur.style.transform = 'translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    var hot = 'a,button,.proj-shot,.tier-switch,.role-rail,.cluster,.as-tags span,[data-mag]';
    document.addEventListener('pointerover', function(e){
      var lbl = e.target.closest('[data-cursor]');
      if (lbl){ clabel.textContent = lbl.getAttribute('data-cursor'); cur.classList.add('label'); dot.style.opacity = '0'; return; }
      if (e.target.closest(hot)) cur.classList.add('hover');
    });
    document.addEventListener('pointerout', function(e){
      if (e.target.closest('[data-cursor]')){ cur.classList.remove('label'); dot.style.opacity = '1'; }
      if (e.target.closest(hot)) cur.classList.remove('hover');
    });
    document.addEventListener('pointerdown', function(){ cur.classList.add('down'); });
    document.addEventListener('pointerup', function(){ cur.classList.remove('down'); });
    addEventListener('mouseleave', function(){ cur.classList.add('hide'); dot.classList.add('hide'); });
    addEventListener('mouseenter', function(){ cur.classList.remove('hide'); dot.classList.remove('hide'); });

    document.querySelectorAll('[data-mag]').forEach(function(el){
      el.addEventListener('pointermove', function(e){
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate('+((e.clientX-(r.left+r.width/2))*0.3)+'px,'+((e.clientY-(r.top+r.height/2))*0.3)+'px)';
      });
      el.addEventListener('pointerleave', function(){ el.style.transform = ''; });
    });
  }

  /* ---------- line-split the hero title ---------- */
  if (!reduce) {
    var h1 = document.querySelector('.hero-title');
    if (h1) {
      // wrap each existing line (split on <br>) into masked, rising spans
      var html = h1.innerHTML.split(/<br\s*\/?>/i);
      h1.innerHTML = html.map(function(seg){
        return '<span class="ln"><span>'+seg+'</span></span>';
      }).join('');
      h1.querySelectorAll('.ln > span').forEach(function(s, i){
        s.style.animationDelay = (0.45 + i*0.12) + 's';
      });
    }
  }

  /* ---------- word reveal split ---------- */
  function splitWords(el){
    if (el.dataset.split) return; el.dataset.split = '1';
    var i = 0;
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(n){
        if (n.nodeType === 3 && n.textContent.trim()){
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(p){
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var s = document.createElement('span'); s.className = 'w'; s.textContent = p;
            s.style.setProperty('--i', i++); frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') { walk(n); }
      });
    })(el);
  }
  if (!reduce) document.querySelectorAll('[data-reveal-words]').forEach(splitWords);

  /* ---------- reveal observer ---------- */
  var io;
  if (!reduce && 'IntersectionObserver' in window){
    io = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        en.target.querySelectorAll('.reveal-shot').forEach(function(s){ s.classList.add('in'); });
        if (en.target.hasAttribute('data-counter-group')) runCounters(en.target);
        if (en.target.classList.contains('ola-stage')) sweepDial();
        io.unobserve(en.target);
      });
    }, {threshold:0.18, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('[data-reveal],[data-reveal-words],[data-counter-group],.reveal-shot,.ola-stage')
      .forEach(function(el){ io.observe(el); });
    // safety: reveal anything already within the viewport on first paint
    requestAnimationFrame(function(){
      document.querySelectorAll('[data-reveal],[data-reveal-words],[data-counter-group],.reveal-shot,.ola-stage').forEach(function(el){
        if (el.classList.contains('in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight*0.92 && r.bottom > 0){
          el.classList.add('in');
          el.querySelectorAll('.reveal-shot').forEach(function(s){ s.classList.add('in'); });
          if (el.hasAttribute('data-counter-group')) runCounters(el);
          if (el.classList.contains('ola-stage')) sweepDial();
          io.unobserve(el);
        }
      });
    });
  } else {
    document.querySelectorAll('[data-reveal],[data-reveal-words],.reveal-shot')
      .forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- counters ---------- */
  function runCounters(group){
    group.querySelectorAll('[data-count]').forEach(function(el){
      var target = parseFloat(el.dataset.count);
      var prefix = el.dataset.prefix || '';
      var suffix = el.dataset.suffix || '';
      var dec = (String(target).split('.')[1]||'').length;
      var start = performance.now(), DUR = 1700;
      (function tick(now){
        var t = Math.min(1, (now - start)/DUR);
        var e = 1 - Math.pow(1 - t, 4);
        var val = t >= 1 ? target : target * e;          /* land exactly */
        var shown = dec ? val.toFixed(dec)
          : Math.round(val).toLocaleString('en-US');
        el.textContent = prefix + shown + suffix;
        if (t < 1) requestAnimationFrame(tick);
      })(performance.now());
    });
  }

  /* ---------- nav scroll state ---------- */
  var nav = document.getElementById('nav');
  var lastY = scrollY;
  addEventListener('scroll', function(){
    var y = scrollY;
    nav.classList.toggle('scrolled', y > 40);
    if (y > 200 && y > lastY + 4) nav.classList.add('away');
    else if (y < lastY - 4 || y < 200) nav.classList.remove('away');
    lastY = y;
  }, {passive:true});

  /* ---------- smooth anchor scroll (Lenis-aware) ---------- */
  function smoothTo(target){
    if (!target) return;
    if (window.__scrollTo) { window.__scrollTo(target, 20); return; }
    var y = target.getBoundingClientRect().top + scrollY - 20;
    if (reduce){ scrollTo(0, y); return; }
    var startY = scrollY, dist = y - startY, dur = Math.min(1100, 350 + Math.abs(dist)*0.4), t0=performance.now();
    (function step(now){ var p=Math.min(1,(now-t0)/dur); var e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
      scrollTo(0, startY+dist*e); if(p<1) requestAnimationFrame(step); })(t0);
  }
  document.querySelectorAll('[data-scroll]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if (id && id.charAt(0)==='#'){ e.preventDefault(); smoothTo(document.querySelector(id)); }
    });
  });
  document.querySelectorAll('[data-scroll-top]').forEach(function(b){
    b.addEventListener('click', function(){ if(window.__scrollTo){window.__scrollTo(window);}else{smoothTo(document.body);} });
  });

  /* ---------- CGB: wireframe -> final UI slider ---------- */
  (function(){
    var ba = document.getElementById('cgbBA'); if(!ba) return;
    var before = document.getElementById('baBefore');
    var handle = document.getElementById('baHandle');
    var dragging = false;
    function setPos(clientX){
      var r = ba.getBoundingClientRect();
      var p = Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100));
      before.style.width = p + '%';
      handle.style.left = p + '%';
    }
    ba.addEventListener('pointerdown', function(e){ dragging = true; ba.setPointerCapture(e.pointerId); setPos(e.clientX); });
    ba.addEventListener('pointermove', function(e){ if(dragging) setPos(e.clientX); });
    ba.addEventListener('pointerup', function(){ dragging = false; });
    ba.addEventListener('pointercancel', function(){ dragging = false; });
    /* a gentle auto-hint on first reveal so people know it drags */
    var hinted = false;
    var io2 = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting && !hinted && !reduce){
          hinted = true;
          var REST = 55;                          /* settle slightly right so both halves show */
          before.style.width = REST+'%'; handle.style.left = REST+'%';
          var t0 = performance.now();
          (function sweep(now){
            var k = Math.min(1,(now-t0)/1200);
            var e = 1 - Math.pow(1-k,3);
            /* nudge toward the wireframe, then ease back to REST */
            var p = REST + Math.sin(e*Math.PI)*18;
            before.style.width = p+'%'; handle.style.left = p+'%';
            if(k<1) requestAnimationFrame(sweep);
            else { before.style.width = REST+'%'; handle.style.left = REST+'%'; }
          })(t0);
          io2.unobserve(en.target);
        }
      });
    },{threshold:.4});
    io2.observe(ba);
  })();

  /* ---------- 3Eco: role switcher ---------- */
  (function(){
    var rail = document.querySelector('.role-rail'); if(!rail) return;
    var roles = rail.querySelectorAll('.role');
    var glyph = document.getElementById('rpGlyph');
    var kicker = document.getElementById('rpKicker');
    var title = document.getElementById('rpTitle');
    var desc = document.getElementById('rpDesc');
    var tags = document.getElementById('rpTags');
    var D = [
      { t:'Dispatch board', k:'SURFACE 01 / 04',
        d:'A live queue where you assign routes, catch the exceptions, and fix them before they blow up. Built dense, for someone scanning forty orders at once.',
        tg:['Live queue','Exceptions','Bulk assign'] },
      { t:'On-route view', k:'SURFACE 02 / 04',
        d:'Stripped to one decision at a time. Next stop, proof of delivery, one tap to confirm. Big targets, easy to hit with gloves on, readable in sunlight.',
        tg:['One-task','Large targets','Offline-safe'] },
      { t:'Audit trail', k:'SURFACE 03 / 04',
        d:'Every action is timestamped and traceable. The filters hold up to a regulator and the exports hold up in a dispute.',
        tg:['Timestamped','Filterable','Exportable'] },
      { t:'Control panel', k:'SURFACE 04 / 04',
        d:'Settings, roles, and system health for the whole org. This is the screen that has to make the other three trustworthy.',
        tg:['Permissions','Org health','Config'] }
    ];
    function glyphFor(i){
      var a = getComputedStyle(document.getElementById('3eco')).getPropertyValue('--p-acc').trim() || '#4ED7A8';
      var dim = 'rgba(237,234,227,.14)';
      var g = [
        // dispatch: stacked rows
        '<rect x="6" y="10" width="88" height="14" rx="3" fill="'+a+'"/><rect x="6" y="30" width="88" height="14" rx="3" fill="'+dim+'"/><rect x="6" y="50" width="88" height="14" rx="3" fill="'+dim+'"/><rect x="6" y="70" width="60" height="14" rx="3" fill="'+dim+'"/>',
        // on-route: single big card + button
        '<rect x="14" y="10" width="72" height="46" rx="6" fill="'+dim+'"/><rect x="14" y="64" width="72" height="20" rx="10" fill="'+a+'"/>',
        // audit: timeline
        '<line x1="16" y1="8" x2="16" y2="88" stroke="'+dim+'" stroke-width="2"/><circle cx="16" cy="20" r="5" fill="'+a+'"/><circle cx="16" cy="48" r="5" fill="'+dim+'"/><circle cx="16" cy="76" r="5" fill="'+dim+'"/><rect x="28" y="16" width="58" height="8" rx="4" fill="'+dim+'"/><rect x="28" y="44" width="48" height="8" rx="4" fill="'+dim+'"/><rect x="28" y="72" width="40" height="8" rx="4" fill="'+dim+'"/>',
        // control: grid of toggles
        '<rect x="8" y="10" width="38" height="34" rx="5" fill="'+a+'"/><rect x="54" y="10" width="38" height="34" rx="5" fill="'+dim+'"/><rect x="8" y="52" width="38" height="34" rx="5" fill="'+dim+'"/><rect x="54" y="52" width="38" height="34" rx="5" fill="'+dim+'"/>'
      ];
      return '<svg viewBox="0 0 100 96" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">'+g[i]+'</svg>';
    }
    function set(i){
      roles.forEach(function(r,j){ r.classList.toggle('on', j === i); });
      var d = D[i];
      kicker.textContent = d.k; title.textContent = d.t; desc.textContent = d.d;
      glyph.innerHTML = glyphFor(i);
      tags.innerHTML = d.tg.map(function(x){ return '<span>'+x+'</span>'; }).join('');
      [title, desc, tags, kicker].forEach(function(el){
        el.classList.remove('rp-fade'); void el.offsetWidth; el.classList.add('rp-fade');
      });
    }
    roles.forEach(function(r){ r.addEventListener('click', function(){ set(+r.dataset.role); }); });
    set(0);
  })();

  /* ---------- Ola: speedometer dial ---------- */
  var dialFill = document.getElementById('dialFill');
  var speedNum = document.getElementById('speedNum');
  var rangeNum = document.getElementById('rangeNum');
  var DASH = 490, ARC = 0.75;            // 270° usable arc
  function setDial(speed, max){
    max = max || 120;
    var frac = Math.min(1, speed/max) * ARC;
    if (dialFill) dialFill.style.strokeDashoffset = DASH * (1 - frac);
    if (speedNum) speedNum.textContent = Math.round(speed);
  }
  function ease(to, max, dur, withRange){
    var from = parseFloat(speedNum ? speedNum.textContent : 0) || 0;
    var t0 = performance.now();
    (function step(now){
      var p = Math.min(1, (now - t0)/dur);
      var e = 1 - Math.pow(1 - p, 3);
      var v = from + (to - from)*e;
      setDial(v, max);
      if (withRange && rangeNum) rangeNum.textContent = Math.round(63 + (e* (84-63)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  var dialSwept = false;
  function sweepDial(){ if(dialSwept) return; dialSwept = true; if(reduce){ setDial(42,120); if(rangeNum) rangeNum.textContent='84'; return;} ease(42, 120, 1500, true); }
  var cluster = document.querySelector('.cluster');
  if (cluster && !reduce){
    cluster.addEventListener('pointerenter', function(){ ease(72, 120, 700); });
    cluster.addEventListener('pointerleave', function(){ ease(42, 120, 900); });
  }
  var rev = document.getElementById('revOla');
  if (rev && !reduce){
    rev.addEventListener('click', function(){
      ease(108, 120, 600);
      setTimeout(function(){ ease(42, 120, 1400); }, 750);
    });
  }
})();
