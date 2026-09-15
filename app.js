(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const entry = $('#entry');
  const enterBtn = $('#enterBtn');
  const entryHint = $('#entryHint');
  const topbar = $('#topbar');
  const music = $('#bgMusic');
  const musicToggle = $('#musicToggle');
  const musicIcon = $('#musicIcon');
  const playerMainBtn = $('#playerMainBtn');
  const inlinePlay = $('#inlinePlay');
  const floatingPlayer = $('#floatingPlayer');
  const vinyl = $('#vinyl');
  const volumeControl = $('#volumeControl');
  const audioProgress = $('#audioProgress');
  const audioTime = $('#audioTime');
  const toast = $('#toast');

  document.body.classList.add('locked');
  music.volume = Number(volumeControl.value);

  // ---------- Utilidades ----------
  const showToast = (message, ms = 2600) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), ms);
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ---------- Música ----------
  async function tryPlayMusic({ quiet = false } = {}) {
    try {
      await music.play();
      setMusicUI(true);
      return true;
    } catch (err) {
      setMusicUI(false);
      if (!quiet) showToast('Toca para comenzar y la música empezará ♫');
      return false;
    }
  }

  function setMusicUI(playing) {
    musicIcon.textContent = playing ? '❚❚' : '♫';
    playerMainBtn.textContent = playing ? '❚❚' : '♫';
    inlinePlay.textContent = playing ? '❚❚' : '▶';
    playerMainBtn.classList.toggle('is-playing', playing);
    vinyl.classList.toggle('is-playing', playing);
  }

  async function toggleMusic() {
    if (music.paused) await tryPlayMusic();
    else { music.pause(); setMusicUI(false); }
  }

  [musicToggle, playerMainBtn, inlinePlay].forEach(btn => btn.addEventListener('click', toggleMusic));
  volumeControl.addEventListener('input', () => { music.volume = Number(volumeControl.value); });
  music.addEventListener('play', () => setMusicUI(true));
  music.addEventListener('pause', () => setMusicUI(false));
  music.addEventListener('timeupdate', () => {
    const p = music.duration ? (music.currentTime / music.duration) * 100 : 0;
    audioProgress.style.width = `${p}%`;
    audioTime.textContent = formatTime(music.currentTime);
  });
  music.addEventListener('error', () => {
    entryHint.textContent = 'La página está lista. Falta colocar assets/audio/amor.mp3 ♫';
    showToast('Falta el archivo assets/audio/amor.mp3');
  }, { once: true });

  $('.player-inline__track').addEventListener('click', (e) => {
    if (!music.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    music.currentTime = ((e.clientX - rect.left) / rect.width) * music.duration;
  });

  // Mejor esfuerzo: algunos navegadores sí permiten autoplay por historial de interacción.
  window.addEventListener('load', () => tryPlayMusic({ quiet: true }));

  // ---------- Entrada ----------
  enterBtn.addEventListener('click', async () => {
    await tryPlayMusic({ quiet: true });
    document.body.classList.remove('locked');
    entry.classList.add('is-hidden');
    topbar.classList.add('is-visible');
    floatingPlayer.classList.add('is-visible');
    setTimeout(() => entry.setAttribute('aria-hidden', 'true'), 900);
    burst(window.innerWidth / 2, window.innerHeight / 2, 48, ['#ffd3de','#f1a0b4','#ffffff','#d9af75']);
    startTypewriter();
  });

  // ---------- Typewriter ----------
  const introText = 'Feliz 20, mi amor. Te conocí cuando tenías 19 y hoy tengo la suerte de poder celebrar esta nueva etapa contigo. Esta página es solo una pequeña forma de decirte lo importante que eres para mí.';
  function startTypewriter() {
    const el = $('#typewriter');
    if (reduceMotion) { el.textContent = introText; return; }
    let i = 0;
    const tick = () => {
      el.textContent = introText.slice(0, i++);
      if (i <= introText.length) setTimeout(tick, 21 + Math.random() * 18);
    };
    tick();
  }

  // ---------- Reveal on scroll ----------
  $$('.reveal').forEach(el => { if (el.dataset.delay) el.style.setProperty('--delay', `${el.dataset.delay}ms`); });
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(el => observer.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // ---------- Corazones ambientales ----------
  const floatingHearts = $('#floatingHearts');
  for (let i = 0; i < 20; i++) {
    const h = document.createElement('span');
    h.className = 'floating-heart';
    h.textContent = Math.random() > .28 ? '♡' : '♥';
    h.style.left = `${Math.random() * 100}%`;
    h.style.fontSize = `${12 + Math.random() * 22}px`;
    h.style.animationDuration = `${12 + Math.random() * 18}s`;
    h.style.animationDelay = `${-Math.random() * 22}s`;
    h.style.opacity = `${.08 + Math.random() * .18}`;
    floatingHearts.appendChild(h);
  }

  // ---------- Tilt de la tarjeta ----------
  const tiltCard = $('#tiltCard');
  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    tiltCard.addEventListener('pointermove', (e) => {
      const r = tiltCard.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      tiltCard.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(4px)`;
    });
    tiltCard.addEventListener('pointerleave', () => { tiltCard.style.transform = ''; });
  }

  // ---------- 20 razones ----------
  const reasons = [
    'Tu risa, porque cambia por completo el ambiente cuando aparece.',
    'Tus ojos, porque podría quedarme mirándolos mucho más de lo que admito.',
    'Tus lunares, esos pequeños detalles que te hacen todavía más tú.',
    'Tus ocurrencias y esa forma tuya de sorprenderme con cualquier cosa.',
    'Tu personalidad, incluso cuando vienes con carácter incluido. ♡',
    'La fuerza que tienes cuando las cosas se complican.',
    'La forma en la que sigues adelante, aunque a veces te cueste.',
    'Tus labios… sí, esta razón necesitaba su propio corazón.',
    'Tu manera de escucharme cuando necesito sacar algo de mi cabeza.',
    'Que conmigo puedes ser tú, sin tener que aparentar nada.',
    'Las pequeñas cosas que haces sin darte cuenta y que a mí sí me quedan grabadas.',
    'Tu forma de emocionarte cuando algo realmente te importa.',
    'Tus sueños y todo lo que todavía quieres conseguir.',
    'Tu lado sensible, incluso cuando intentas esconderlo.',
    'Que hemos aprendido cosas juntos y todavía nos queda muchísimo por aprender.',
    'La tranquilidad que siento en esos momentos simples contigo.',
    'Que puedes hacer que un día normal termine teniendo un recuerdo bonito.',
    'Tu manera de crecer y cambiar sin dejar de ser tú.',
    'Porque eres Cinthia. Esa sola razón ya podría contar por varias.',
    'Y la número 20: porque te elegí hoy y me gustaría seguir eligiéndote mañana. ♡'
  ];

  const heartGrid = $('#heartGrid');
  const reasonDisplay = $('#reasonDisplay');
  const progressBar = $('#reasonProgressBar');
  const progressText = $('#reasonProgressText');
  const reasonPercent = $('#reasonPercent');
  const discovered = new Set();

  reasons.forEach((reason, i) => {
    const btn = document.createElement('button');
    btn.className = 'heart-token';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Descubrir razón ${i + 1}`);
    btn.innerHTML = '<span>♡</span>';
    btn.addEventListener('click', (e) => {
      discovered.add(i);
      btn.classList.add('is-open');
      btn.innerHTML = `<span>${i + 1}</span>`;
      reasonDisplay.innerHTML = `<span class="reason-display__number">${i + 1}</span><p>${reason}</p>`;
      const pct = Math.round(discovered.size / reasons.length * 100);
      progressBar.style.width = `${pct}%`;
      progressText.textContent = `${discovered.size} de 20 descubiertas`;
      reasonPercent.textContent = `${pct}%`;
      clickSpark(e.clientX, e.clientY);
      if (discovered.size === reasons.length) {
        burst(window.innerWidth / 2, window.innerHeight * .55, 55, ['#972d44','#e994aa','#f7d6df','#d7ad73']);
        setTimeout(() => showToast('Descubriste las 20. Y todavía me faltaron razones. ♡'), 300);
      }
    });
    heartGrid.appendChild(btn);
  });

  // ---------- Constelación ----------
  const stars = $$('.star');
  const starCounter = $('#starCounter');
  const skyMessage = $('#skyMessage');
  const sky = $('#sky');
  const foundStars = new Set();
  stars.forEach((star, idx) => {
    star.addEventListener('click', (e) => {
      if (foundStars.has(idx)) return;
      foundStars.add(idx);
      star.classList.add('is-found');
      starCounter.textContent = `${foundStars.size} / 5`;
      skyMessage.querySelector('p').textContent = `encontraste ${star.dataset.word} ♡`;
      clickSpark(e.clientX, e.clientY, '#ffd5df');
      if (foundStars.size === stars.length) {
        sky.classList.add('is-complete');
        starCounter.textContent = 'M + C';
        skyMessage.querySelector('p').textContent = 'entre tantas cosas bonitas, mi favorita es haberte encontrado a ti.';
        burst(window.innerWidth / 2, window.innerHeight / 2, 70, ['#ffd5df','#fff','#e88ba2']);
      }
    });
  });

  // ---------- Scratch card ----------
  const scratchCanvas = $('#scratchCanvas');
  const scratchCard = $('#scratchCard');
  const scratchPercent = $('#scratchPercent');
  const sctx = scratchCanvas.getContext('2d', { willReadFrequently: true });
  let scratching = false;
  let scratchDone = false;
  let scratchMoveCount = 0;

  function setupScratch() {
    const rect = scratchCard.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    scratchCanvas.width = Math.round(rect.width * dpr);
    scratchCanvas.height = Math.round(rect.height * dpr);
    scratchCanvas.style.width = `${rect.width}px`;
    scratchCanvas.style.height = `${rect.height}px`;
    sctx.setTransform(dpr,0,0,dpr,0,0);
    const g = sctx.createLinearGradient(0,0,rect.width,rect.height);
    g.addColorStop(0,'#8f2c43'); g.addColorStop(.5,'#c85e78'); g.addColorStop(1,'#6d2135');
    sctx.globalCompositeOperation = 'source-over';
    sctx.fillStyle = g;
    sctx.fillRect(0,0,rect.width,rect.height);
    sctx.fillStyle = 'rgba(255,255,255,.86)';
    sctx.textAlign = 'center';
    sctx.textBaseline = 'middle';
    sctx.font = `700 ${Math.max(18, Math.min(28, rect.width/24))}px "DM Sans", sans-serif`;
    sctx.fillText('RASCA AQUÍ  ♡', rect.width/2, rect.height/2 - 8);
    sctx.font = `500 ${Math.max(12, Math.min(15, rect.width/45))}px "DM Sans", sans-serif`;
    sctx.fillText('hay algo debajo', rect.width/2, rect.height/2 + 26);
  }

  function scratchAt(clientX, clientY) {
    const rect = scratchCanvas.getBoundingClientRect();
    const x = clientX - rect.left, y = clientY - rect.top;
    sctx.globalCompositeOperation = 'destination-out';
    sctx.beginPath(); sctx.arc(x,y,34,0,Math.PI*2); sctx.fill();
    scratchMoveCount++;
    if (scratchMoveCount % 10 === 0) estimateScratch();
  }

  function estimateScratch() {
    const w = scratchCanvas.width, h = scratchCanvas.height;
    const data = sctx.getImageData(0,0,w,h).data;
    let clear = 0, sampled = 0;
    const step = 32 * 4;
    for (let i = 3; i < data.length; i += step) { sampled++; if (data[i] < 45) clear++; }
    const pct = Math.min(100, Math.round(clear / sampled * 100));
    scratchPercent.textContent = `${pct}%`;
    if (pct > 58 && !scratchDone) {
      scratchDone = true;
      scratchCanvas.style.transition = 'opacity .7s ease';
      scratchCanvas.style.opacity = '0';
      scratchCanvas.style.pointerEvents = 'none';
      scratchPercent.textContent = '100%';
      burst(window.innerWidth/2, window.innerHeight/2, 45, ['#972d44','#f5bac8','#ffffff']);
      showToast('Secreto descubierto ♡');
    }
  }

  scratchCanvas.addEventListener('pointerdown', (e) => { scratching = true; scratchCanvas.setPointerCapture(e.pointerId); scratchAt(e.clientX,e.clientY); });
  scratchCanvas.addEventListener('pointermove', (e) => { if (scratching) scratchAt(e.clientX,e.clientY); });
  scratchCanvas.addEventListener('pointerup', () => { scratching = false; estimateScratch(); });
  scratchCanvas.addEventListener('pointercancel', () => { scratching = false; });
  setupScratch();
  window.addEventListener('resize', () => { if (!scratchDone) setupScratch(); });

  // ---------- Sobre ----------
  const envelope = $('#envelope');
  $('#sealBtn').addEventListener('click', () => {
    envelope.classList.add('is-open');
    burst(window.innerWidth/2, window.innerHeight*.55, 42, ['#9a2c45','#efb3c2','#d6ae73']);
    showToast('Carta abierta para Cinthia 💌');
  });

  // ---------- Hold to promise ----------
  const holdButton = $('#holdButton');
  const holdFill = $('#holdFill');
  const holdLabel = $('#holdLabel');
  const promiseResult = $('#promiseResult');
  let holdRAF = null, holdStart = 0, promiseCompleted = false;
  const holdDuration = 2200;

  function updateHold(now) {
    if (!holdStart) holdStart = now;
    const p = Math.min(1, (now - holdStart) / holdDuration);
    holdFill.style.transform = `scaleX(${p})`;
    holdLabel.textContent = p < 1 ? `Sellando… ${Math.round(p*100)}%` : 'Promesa sellada';
    if (p >= 1) {
      promiseCompleted = true;
      holdButton.classList.remove('is-holding');
      holdButton.classList.add('is-complete');
      promiseResult.textContent = 'Prometo seguir aprendiendo a quererte bonito, cuidarte y hacerte sentir especial. — Mijail ♡';
      burst(window.innerWidth/2, window.innerHeight/2, 85, ['#972d44','#f3b0c0','#e0b56f','#ffffff']);
      navigator.vibrate?.([80,40,100]);
      return;
    }
    holdRAF = requestAnimationFrame(updateHold);
  }
  function beginHold(e) {
    if (promiseCompleted) return;
    e.preventDefault(); holdStart = 0; holdButton.classList.add('is-holding'); holdRAF = requestAnimationFrame(updateHold);
  }
  function cancelHold() {
    if (promiseCompleted) return;
    cancelAnimationFrame(holdRAF); holdRAF = null; holdStart = 0; holdButton.classList.remove('is-holding');
    holdFill.style.transform = 'scaleX(0)'; holdLabel.textContent = 'Mantén presionado';
  }
  holdButton.addEventListener('pointerdown', beginHold);
  ['pointerup','pointerleave','pointercancel'].forEach(ev => holdButton.addEventListener(ev, cancelHold));

  // ---------- Final ----------
  const finalAnswer = $('#finalAnswer');
  $$('.answer-button').forEach(btn => btn.addEventListener('click', () => {
    const sweet = btn.dataset.answer === 'dulces';
    finalAnswer.innerHTML = sweet
      ? 'Trato hecho: muchos cumpleaños, muchos dulces y muchos momentos juntos. 🍭♡<br><strong>Te adoro, mi amor.</strong>'
      : 'Entonces queda oficialmente anotado: quiero seguir celebrándote todas las veces que la vida nos deje. ❤️<br><strong>Te adoro, Cinthia.</strong>';
    megaCelebration();
  }));

  // ---------- Fullscreen ----------
  $('#fullscreenBtn').addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
      else await document.exitFullscreen?.();
    } catch { showToast('Tu navegador no permitió pantalla completa.'); }
  });

  // ---------- Share / replay ----------
  $('#replayBtn').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  $('#shareBtn').addEventListener('click', async () => {
    const shareData = { title: 'Para Cinthia 💗', text: 'Una sorpresa hecha con mucho cariño ♡', url: location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(location.href); showToast('Enlace copiado ♡'); }
    } catch (err) { if (err?.name !== 'AbortError') showToast('No se pudo compartir desde este navegador.'); }
  });

  // ---------- Canvas de confeti ----------
  const fxCanvas = $('#fxCanvas');
  const ctx = fxCanvas.getContext('2d');
  let particles = [];
  let animationFrame = null;
  function resizeFX() { fxCanvas.width = innerWidth * Math.min(devicePixelRatio || 1, 2); fxCanvas.height = innerHeight * Math.min(devicePixelRatio || 1, 2); fxCanvas.style.width = `${innerWidth}px`; fxCanvas.style.height = `${innerHeight}px`; ctx.setTransform(Math.min(devicePixelRatio || 1, 2),0,0,Math.min(devicePixelRatio || 1, 2),0,0); }
  resizeFX(); window.addEventListener('resize', resizeFX);

  function burst(x, y, count = 35, colors = ['#972d44','#efafbf','#fff']) {
    if (reduceMotion) return;
    for (let i=0;i<count;i++) particles.push({
      x, y, vx:(Math.random()-.5)*9, vy:(Math.random()-.75)*10,
      g:.12+Math.random()*.08, life:1, decay:.012+Math.random()*.018,
      r:2+Math.random()*4, rot:Math.random()*Math.PI, vr:(Math.random()-.5)*.25,
      color:colors[Math.floor(Math.random()*colors.length)], shape:Math.random()>.25?'rect':'heart'
    });
    if (!animationFrame) animationFrame = requestAnimationFrame(drawParticles);
  }

  function drawParticles() {
    ctx.clearRect(0,0,innerWidth,innerHeight);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += p.vr; p.life -= p.decay;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.globalAlpha=Math.max(0,p.life); ctx.fillStyle=p.color;
      if (p.shape === 'heart') {
        ctx.scale(.7,.7); ctx.beginPath(); ctx.moveTo(0,4); ctx.bezierCurveTo(-9,-4,-10,-12,-3,-15); ctx.bezierCurveTo(1,-17,4,-14,5,-10); ctx.bezierCurveTo(7,-14,11,-17,15,-14); ctx.bezierCurveTo(22,-9,17,-1,5,8); ctx.closePath(); ctx.fill();
      } else ctx.fillRect(-p.r,-p.r,p.r*2,p.r*1.2);
      ctx.restore();
    });
    if (particles.length) animationFrame = requestAnimationFrame(drawParticles);
    else { animationFrame = null; ctx.clearRect(0,0,innerWidth,innerHeight); }
  }

  function clickSpark(x,y,color='#972d44') { burst(x,y,10,[color,'#f4c2cf','#fff']); }
  function megaCelebration() {
    burst(innerWidth*.15, innerHeight*.75, 70, ['#972d44','#f5b3c3','#fff','#d9ae72']);
    setTimeout(()=>burst(innerWidth*.85, innerHeight*.72, 70, ['#8f2b42','#ef9db2','#fff','#e1bc86']), 250);
    setTimeout(()=>burst(innerWidth*.5, innerHeight*.4, 90, ['#972d44','#f6ced8','#fff','#d9ae72']), 500);
    navigator.vibrate?.([80,40,80]);
  }

  // ---------- Pequeños destellos al tocar ----------
  document.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button,a,input,canvas')) return;
    if (Math.random() < .38) clickSpark(e.clientX,e.clientY,'#c85d76');
  });

  // ---------- Magnetic button, desktop ----------
  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r=btn.getBoundingClientRect();
        btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px, ${(e.clientY-r.top-r.height/2)*.08}px)`;
      });
      btn.addEventListener('pointerleave', () => btn.style.transform='');
    });
  }

  // ---------- Media Session ----------
  if ('mediaSession' in navigator && 'MediaMetadata' in window) {
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Amor', artist: 'Emmanuel Cortes', album: 'Sorpresa para Cinthia'
      });
      navigator.mediaSession.setActionHandler('play', () => music.play());
      navigator.mediaSession.setActionHandler('pause', () => music.pause());
    } catch {}
  }

  // ---------- Service Worker ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
