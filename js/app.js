/* SICT235 Codelab 03 — progress, accessible formative questions, lazy Gist embeds */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const steps = [...document.querySelectorAll('.lesson-step')];
  const links = [...document.querySelectorAll('.step-link')];
  const storageKey = 'sict235-codelab03-dart-foundations-v2-layout';
  const read = (k) => {try {return localStorage.getItem(k);}catch{return null;}};
  const write = (k,v) => {try {localStorage.setItem(k,v);}catch{/* private browsing */}};
  const saved = (() => {try{return JSON.parse(read(storageKey)||'{}');} catch{return {};}})();
  const done = new Set(Array.isArray(saved.done) ? saved.done.filter(x => Number.isInteger(x) && x >= 0 && x < steps.length) : []);
  let current = Number.isInteger(saved.current) ? Math.min(steps.length-1,Math.max(0,saved.current)) : 0;
  const sidebar = $('sidebar');
  const scrim = $('scrim');
  const toggle = $('menuToggle');
  const mark = $('markButton');
  function closeSidebar(){sidebar.classList.remove('open');scrim.hidden=true;toggle.setAttribute('aria-expanded','false');}
  function persist(){write(storageKey,JSON.stringify({current,done:[...done].sort((a,b)=>a-b)}));}
  function refreshProgress(){
    const value=Math.round(done.size*100/steps.length);
    $('progressLabel').textContent=`${done.size} of ${steps.length}`;
    $('progressbar').setAttribute('aria-valuenow',String(value));
    $('progressFill').style.width=value+'%';
    links.forEach((link,i)=>link.classList.toggle('completed',done.has(i)));
    mark.textContent=done.has(current)?'✓ Completed':'✓ Mark completed';
    mark.setAttribute('aria-pressed',String(done.has(current)));
    const celebration=$('completionMessage');
    if(celebration)celebration.hidden=!(done.size===steps.length && current===steps.length-1);
    persist();
  }
  function show(n,{scroll=false}={}){
    current=Math.max(0,Math.min(steps.length-1,n));
    steps.forEach((s,i)=>{s.hidden=i!==current;s.classList.toggle('is-active',i===current);});
    links.forEach((l,i)=>{l.classList.toggle('active',i===current);if(i===current)l.setAttribute('aria-current','step');else l.removeAttribute('aria-current');});
    $('previousButton').disabled=current===0;
    $('nextButton').disabled=current===steps.length-1;
    $('footerStep').textContent=`Section ${current+1} of ${steps.length}`;
    refreshProgress();closeSidebar();
    if(scroll)window.scrollTo({top:0,behavior:'instant'});
  }
  links.forEach((l,i)=>l.addEventListener('click',()=>show(i,{scroll:true})));
  $('previousButton').addEventListener('click',()=>show(current-1,{scroll:true}));
  $('nextButton').addEventListener('click',()=>show(current+1,{scroll:true}));
  mark.addEventListener('click',()=>{done.has(current)?done.delete(current):done.add(current);refreshProgress(); /* no scrolling */});
  $('resetProgress').addEventListener('click',()=>{if(!window.confirm('Reset this session\'s section progress?'))return;done.clear();show(0,{scroll:true});});
  toggle.addEventListener('click',()=>{const open=!sidebar.classList.contains('open');sidebar.classList.toggle('open',open);scrim.hidden=!open;toggle.setAttribute('aria-expanded',String(open));});
  $('sidebarClose').addEventListener('click',closeSidebar);
  scrim.addEventListener('click',closeSidebar);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSidebar();});
  const themeKey=storageKey+'-theme';
  document.body.dataset.theme=read(themeKey)==='dark'?'dark':'light';
  const refreshTheme=()=>{$('themeIcon').textContent=document.body.dataset.theme==='dark'?'☀':'☾';$('themeToggle').setAttribute('aria-label',document.body.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme');};
  $('themeToggle').addEventListener('click',()=>{document.body.dataset.theme=document.body.dataset.theme==='dark'?'light':'dark';write(themeKey,document.body.dataset.theme);refreshTheme();});refreshTheme();

  // Each quiz question gives immediate, explanatory, non-graded feedback.
  document.querySelectorAll('.quiz-item').forEach(item=>{
    item.querySelectorAll('input[type="radio"]').forEach(input=>input.addEventListener('change',()=>{
      const good=input.dataset.right==='true';const feedback=item.querySelector('.quiz-feedback');
      feedback.textContent=(good?'Correct. ':'Not quite. ')+item.querySelector('.answer-detail').textContent;
      feedback.className='quiz-feedback '+(good?'good':'retry');
    }));
  });
  // Overall quiz assessment: score, unanswered questions, and retry.
  document.querySelectorAll('.quiz-form').forEach(form => {
    if(form.querySelector('.quiz-evaluate'))return;
    const controls=document.createElement('div');controls.className='quiz-assessment';
    controls.innerHTML='<button type="button" class="quiz-evaluate">Evaluate my answers</button><button type="button" class="quiz-reset">Try again</button><p class="quiz-score" role="status" aria-live="polite">Answer all questions, then evaluate your quiz.</p>';
    form.appendChild(controls);
    const result=controls.querySelector('.quiz-score');
    controls.querySelector('.quiz-evaluate').addEventListener('click',()=>{
      const items=[...form.querySelectorAll('.quiz-item')];
      const answered=items.filter(item=>item.querySelector('input[type="radio"]:checked'));
      const correct=items.filter(item=>item.querySelector('input[type="radio"]:checked')?.dataset.right==='true').length;
      const percent=Math.round(correct/items.length*100);
      result.textContent=`Your score: ${correct}/${items.length} (${percent}%). ${items.length-answered.length ? `${items.length-answered.length} unanswered question(s). ` : ''}${correct===items.length?'Excellent! All answers are correct.':'Review the feedback above and try again.'}`;
      result.className='quiz-score '+(correct===items.length?'good':'');
      items.forEach(item=>{if(!item.querySelector('input[type="radio"]:checked')){const fb=item.querySelector('.quiz-feedback');fb.textContent='Not answered yet.';fb.className='quiz-feedback retry';}});
    });
    controls.querySelector('.quiz-reset').addEventListener('click',()=>{
      form.querySelectorAll('input[type="radio"]').forEach(input=>{input.checked=false;});
      form.querySelectorAll('.quiz-feedback').forEach(fb=>{fb.textContent='Choose one option.';fb.className='quiz-feedback';});
      result.textContent='Answer all questions, then evaluate your quiz.';result.className='quiz-score';
    });
  });
  document.querySelectorAll('.check-card').forEach(item=>{
    item.querySelectorAll('.answer-buttons button').forEach(btn=>btn.addEventListener('click',()=>{
      const good=btn.dataset.correct==='true';
      item.querySelectorAll('.answer-buttons button').forEach(b=>{b.classList.remove('right','wrong');b.setAttribute('aria-pressed','false');});
      btn.classList.add(good?'right':'wrong');btn.setAttribute('aria-pressed','true');
      const fb=item.querySelector('.quiz-feedback');fb.className='quiz-feedback '+(good?'good':'retry');
      fb.textContent=(good?'Correct. ':'Review the explanation and try again. ')+item.querySelector('.answer-detail').textContent;
    }));
  });

  function sourceFor(id){const pre=document.querySelector(`button[data-copy="${id}"]`)?.closest('.inline-code-box')?.querySelector('pre');return pre?.textContent||'';}
  document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{
    const source=sourceFor(btn.dataset.copy);if(!source)return;
    try {
      if(navigator.clipboard && window.isSecureContext)await navigator.clipboard.writeText(source);
      else {const temp=document.createElement('textarea');temp.value=source;temp.style.position='fixed';temp.style.left='-9999px';document.body.append(temp);temp.select();const ok=document.execCommand('copy');temp.remove();if(!ok)throw Error('Copy not available');}
      const old=btn.textContent;btn.textContent='Copied ✓';setTimeout(()=>{btn.textContent=old;},1500);
    } catch {btn.textContent='Select code to copy';}
  }));
  const gistIDs=window.DART_GISTS||{};
  function gistUrl(id){return /^[a-f0-9]{16,64}$/i.test(id||'') ? `https://dartpad.dev/?id=${encodeURIComponent(id)}&embed=true` : null;}
  document.querySelectorAll('.external-dartpad').forEach(a=>{
    const id=gistIDs[a.dataset.activity];const url=gistUrl(id);
    a.href=url?`https://dartpad.dev/?id=${encodeURIComponent(id)}`:'https://dartpad.dev/';
    if(!url)a.title='Gist not published yet. Copy starter code from above and paste into DartPad.';
  });
  document.querySelectorAll('.load-dartpad').forEach(btn=>btn.addEventListener('click',()=>{
    const name=btn.dataset.activity,slot=document.querySelector(`.embed-slot[data-activity="${name}"]`),url=gistUrl(gistIDs[name]);
    if(!slot)return;
    if(!url){
      slot.innerHTML='<p class="embed-status"><strong>Gist not configured.</strong> Publish the included <code>main.dart</code> examples using <code>tools/publish_gists.py</code>, then reload this page. Meanwhile, copy the visible starter code and use the “Open in DartPad” fallback or your local Dart SDK.</p>';
      return;
    }
    if(slot.querySelector('iframe'))return;
    const iframe=document.createElement('iframe');iframe.className='exercise-frame';iframe.title=`DartPad live editor: ${name}`;
    iframe.src=url;iframe.loading='lazy';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allow='clipboard-write';
    slot.replaceChildren(iframe);
    btn.textContent='Editor loaded ✓';btn.disabled=true;
  }));
  show(current);
})();
