/* =====================================================================
   Case-study interactions (shared)
   cursor · magnetic · progress · reveals · figure parallax · nav · smooth
   ===================================================================== */
(function(){
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = matchMedia('(pointer:coarse)').matches;
  var lerp = function(a,b,t){ return a+(b-a)*t; };

  /* per-page accent */
  var acc = document.body.dataset.acc;
  if (acc) document.documentElement.style.setProperty('--p-acc', acc);

  /* cursor (label style) */
  if (!coarse){
    var cur=document.getElementById('cursor'), dot=document.getElementById('cursorDot'), clabel=document.getElementById('clabel');
    if (cur && dot){
      var cx=innerWidth/2, cy=innerHeight/2, rx=cx, ry=cy;
      addEventListener('pointermove', function(e){ cx=e.clientX; cy=e.clientY;
        dot.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)'; });
      (function loop(){ rx=lerp(rx,cx,.2); ry=lerp(ry,cy,.2);
        cur.style.transform='translate('+rx+'px,'+ry+'px) translate(-50%,-50%)'; requestAnimationFrame(loop); })();
      var hot='a,button,[data-mag]';
      document.addEventListener('pointerover', function(e){
        var lbl=e.target.closest('[data-cursor]');
        if(lbl){ if(clabel) clabel.textContent=lbl.getAttribute('data-cursor'); cur.classList.add('label'); dot.style.opacity='0'; return; }
        if(e.target.closest(hot)) cur.classList.add('hover');
      });
      document.addEventListener('pointerout', function(e){
        if(e.target.closest('[data-cursor]')){ cur.classList.remove('label'); dot.style.opacity='1'; }
        if(e.target.closest(hot)) cur.classList.remove('hover');
      });
      document.addEventListener('pointerdown', function(){ cur.classList.add('down'); });
      document.addEventListener('pointerup', function(){ cur.classList.remove('down'); });
      addEventListener('mouseleave', function(){ cur.classList.add('hide'); dot.classList.add('hide'); });
      addEventListener('mouseenter', function(){ cur.classList.remove('hide'); dot.classList.remove('hide'); });
      document.querySelectorAll('[data-mag]').forEach(function(el){
        el.addEventListener('pointermove', function(e){ var r=el.getBoundingClientRect();
          el.style.transform='translate('+(e.clientX-(r.left+r.width/2))*.3+'px,'+(e.clientY-(r.top+r.height/2))*.3+'px)'; });
        el.addEventListener('pointerleave', function(){ el.style.transform=''; });
      });
    }
  }

  /* word split */
  function splitWords(el){
    if (el.dataset.split) return; el.dataset.split='1'; var i=0;
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(n){
        if (n.nodeType===3 && n.textContent.trim()){
          var frag=document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(p){
            if(!p) return;
            if(/^\s+$/.test(p)){ frag.appendChild(document.createTextNode(p)); return; }
            var s=document.createElement('span'); s.className='w'; s.textContent=p; s.style.setProperty('--i',i++); frag.appendChild(s);
          });
          node.replaceChild(frag,n);
        } else if (n.nodeType===1 && n.tagName!=='BR'){ walk(n); }
      });
    })(el);
  }
  if (!reduce) document.querySelectorAll('[data-reveal-words]').forEach(splitWords);

  /* reveal observer */
  if (!reduce && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(en){
      if(!en.isIntersecting) return;
      en.target.classList.add('in');
      en.target.querySelectorAll('.rv').forEach(function(r){ r.classList.add('in'); });
      io.unobserve(en.target);
    });},{threshold:0.01, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('[data-reveal],[data-reveal-words],.rv').forEach(function(el){ io.observe(el); });
    requestAnimationFrame(function(){
      document.querySelectorAll('[data-reveal],[data-reveal-words],.rv').forEach(function(el){
        var r=el.getBoundingClientRect();
        if(r.top<innerHeight*0.92 && r.bottom>0){ el.classList.add('in'); io.unobserve(el); }
      });
    });
  } else {
    document.querySelectorAll('[data-reveal],[data-reveal-words],.rv').forEach(function(el){ el.classList.add('in'); });
  }

  /* progress + nav + figure parallax */
  var bar=document.getElementById('progress');
  var nav=document.getElementById('nav');
  var figs=[];
  if(!coarse && !reduce){
    document.querySelectorAll('.fig[data-plx] img').forEach(function(img){ figs.push(img); img.style.willChange='transform'; });
  }
  var lastY=scrollY, ticking=false, plxRunning=false, visCount=0;
  function chrome(){
    var y=scrollY, h=document.documentElement.scrollHeight-innerHeight;
    if(bar) bar.style.width=(h>0?(y/h*100):0)+'%';
    if(nav){
      var dy=y-lastY;
      nav.classList.toggle('scrolled', y>40);
      if(dy>4 && y>200) nav.classList.add('away');
      else if(dy<-4 || y<200) nav.classList.remove('away');
    }
    lastY=y;
  }
  function plxFrame(){
    var vh=innerHeight, any=false;
    for(var i=0;i<figs.length;i++){
      var r=figs[i].parentNode.getBoundingClientRect();
      if(r.bottom<-100||r.top>vh+100) continue;
      any=true;
      var p=(r.top+r.height/2-vh/2)/(vh/2+r.height/2);
      figs[i].style.transform='translate3d(0,'+(-p*Math.min(28,r.height*.05)).toFixed(1)+'px,0) scale(1.08)';
    }
    if(visCount>0){ requestAnimationFrame(plxFrame); } else { plxRunning=false; }
  }
  function onScroll(){ if(ticking) return; ticking=true; requestAnimationFrame(function(){ chrome(); ticking=false; }); }
  addEventListener('scroll', onScroll, {passive:true}); chrome();
  /* only run the parallax loop while at least one figure is on-screen */
  if(figs.length && 'IntersectionObserver' in window){
    var pObs=new IntersectionObserver(function(es){
      es.forEach(function(en){ visCount += en.isIntersecting ? 1 : -1; });
      visCount = Math.max(0, visCount);
      if(visCount>0 && !plxRunning){ plxRunning=true; requestAnimationFrame(plxFrame); }
    },{rootMargin:'100px 0px'});
    figs.forEach(function(img){ pObs.observe(img.parentNode); });
  }

  /* smooth anchor + back-to-top */
  function smoothTo(target){
    if(!target) return;
    if(window.__scrollTo){ window.__scrollTo(target===document.body?window:target, 20); return; }
    var y=target.getBoundingClientRect().top+scrollY-20;
    if(reduce){ scrollTo(0,y); return; }
    var s=scrollY, d=y-s, dur=Math.min(1100,350+Math.abs(d)*.4), t0=performance.now();
    (function step(now){ var p=Math.min(1,(now-t0)/dur);
      var e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2; scrollTo(0,s+d*e); if(p<1) requestAnimationFrame(step); })(t0);
  }
  document.querySelectorAll('[data-scroll-top]').forEach(function(b){ b.addEventListener('click', function(){ smoothTo(document.body); }); });

  /* clip parallax figures: wrap so scale doesn't overflow rounded corners (already overflow:hidden on .fig) */
})();
