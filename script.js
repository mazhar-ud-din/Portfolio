document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled', 'glass-strong');
    } else {
      header.classList.remove('scrolled', 'glass-strong');
    }
  }, { passive: true });

  // 2. Mobile Nav Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  let isMenuOpen = false;

  function setMenuOpen(open) {
    isMenuOpen = open;
    mobileNav?.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    setMenuIcon(open);
  }

  function setMenuIcon(open) {
    if (!menuToggle) return;
    menuToggle.innerHTML = open
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      setMenuOpen(!isMenuOpen);
    });

    mobileNav.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isMenuOpen) setMenuOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 767 && isMenuOpen) setMenuOpen(false);
    }, { passive: true });
  }

  // 3. Floating background particles
  const particlesContainer = document.getElementById('particles-container');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;
      Object.assign(p.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: (Math.random() * 0.3 + 0.1).toFixed(2),
        animation: `slow-drift ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        backgroundColor: '#20B2A6',
      });
      particlesContainer.appendChild(p);
    }
  }

  // 4. Mobile hero title typing loop
  // const mobileHeroTitle = document.querySelector('.hero-title-animated');
  // const mobileTitleQuery = window.matchMedia('(max-width: 767px)');
  // let mobileTitleTimer;
  // let mobileTitleIndex = 0;
  // let mobileTitleDeleting = false;

  // function stopMobileTitleTyping() {
  //   window.clearTimeout(mobileTitleTimer);
  //   mobileTitleTimer = undefined;
  //   mobileTitleIndex = 0;
  //   mobileTitleDeleting = false;
  //   if (mobileHeroTitle) mobileHeroTitle.textContent = '';
  // }

  // function runMobileTitleTyping() {
  //   if (!mobileHeroTitle || !mobileTitleQuery.matches) {
  //     stopMobileTitleTyping();
  //     return;
  //   }

  //   const fullText = mobileHeroTitle.dataset.text || '';
  //   mobileHeroTitle.textContent = fullText.slice(0, mobileTitleIndex);

  //   if (!mobileTitleDeleting && mobileTitleIndex < fullText.length) {
  //     mobileTitleIndex += 1;
  //     mobileTitleTimer = window.setTimeout(runMobileTitleTyping, 78);
  //     return;
  //   }

  //   if (!mobileTitleDeleting && mobileTitleIndex === fullText.length) {
  //     mobileTitleDeleting = true;
  //     mobileTitleTimer = window.setTimeout(runMobileTitleTyping, 1400);
  //     return;
  //   }

  //   if (mobileTitleDeleting && mobileTitleIndex > 0) {
  //     mobileTitleIndex -= 1;
  //     mobileTitleTimer = window.setTimeout(runMobileTitleTyping, 38);
  //     return;
  //   }

  //   mobileTitleDeleting = false;
  //   mobileTitleTimer = window.setTimeout(runMobileTitleTyping, 450);
  // }

  // function handleMobileTitleMode() {
  //   stopMobileTitleTyping();
  //   if (mobileTitleQuery.matches) runMobileTitleTyping();
  // }

  // if (mobileHeroTitle) {
  //   handleMobileTitleMode();
  //   mobileTitleQuery.addEventListener('change', handleMobileTitleMode);
  // }

  // 5. Contact Form - open a prefilled email draft
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedbackMsg = document.getElementById('form-feedback');
  const contactEmail = 'mazharuddin07610761@gmail.com';

  if (contactForm && submitBtn && feedbackMsg) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = `Portfolio contact from ${name}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message,
      ].join('\n');

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Opening email… <i data-lucide="loader-2"></i>';
      feedbackMsg.className = 'feedback-msg';
      feedbackMsg.innerHTML = '';
      feedbackMsg.style.display = 'none';
      if (typeof lucide !== 'undefined') lucide.createIcons();

      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      feedbackMsg.classList.add('success');
      feedbackMsg.innerHTML = `
        <i data-lucide="circle-check-big" style="flex-shrink:0;"></i>
        <p>Thanks, ${name}! Your email draft has been opened. Please send it from your email app.</p>
      `;
      feedbackMsg.style.display = 'flex';
      if (typeof lucide !== 'undefined') lucide.createIcons();

      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i data-lucide="send"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // 6. Projects view toggle – screenshots vs icon placeholders
  const projectsSection = document.getElementById('projects');
  const projectsViewToggle = document.getElementById('projects-view-toggle');
  const VIEW_STORAGE_KEY = 'projects-view';

  function setProjectsView(view) {
    if (!projectsSection) return;
    const mode = view === 'placeholders' ? 'placeholders' : 'screenshots';
    projectsSection.dataset.view = mode;

    projectsViewToggle?.querySelectorAll('.projects-view-btn').forEach(btn => {
      const active = btn.dataset.view === mode;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  if (projectsSection && projectsViewToggle) {
    setProjectsView(localStorage.getItem(VIEW_STORAGE_KEY) || 'placeholders');

    projectsViewToggle.addEventListener('click', e => {
      const btn = e.target.closest('.projects-view-btn');
      if (!btn) return;
      const view = btn.dataset.view;
      setProjectsView(view);
      localStorage.setItem(VIEW_STORAGE_KEY, view);
    });
  }

  // 6. Network canvas — reusable plexus background (hero + projects)
  function initNetworkCanvas(section, canvas, userCfg = {}) {
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const CFG = {
      count: reducedMotion ? 28 : 62,
      linkDist: 155,
      mouseDist: 200,
      speed: reducedMotion ? 0.15 : 0.45,
      pulseCount: reducedMotion ? 0 : 8,
      shootChance: reducedMotion ? 0 : 0.003,
      linkOpacity: 0.22,
      mouseLinkOpacity: 0.45,
      brightChance: 0.12,
      purpleChance: 0,
      edgeBias: false,
      ...userCfg,
    };

    let w = 0, h = 0;
    let mouse = { x: null, y: null };
    let frameId = null;
    let visible = false;
    let stars = [];
    let pulses = [];
    let shooters = [];
    let tick = 0;

    function resize() {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(a, b) { return Math.random() * (b - a) + a; }

    function createStar() {
      let x, y;
      if (CFG.edgeBias) {
        const roll = Math.random();
        if (roll < 0.32) x = rand(0, w * 0.32);
        else if (roll < 0.64) x = rand(w * 0.68, w);
        else x = rand(w * 0.18, w * 0.82);
        y = rand(0, h);
      } else {
        x = rand(0, w);
        y = rand(0, h);
      }

      const bright = Math.random() < CFG.brightChance;
      const purple = bright && CFG.purpleChance > 0 && Math.random() < CFG.purpleChance;

      return {
        x, y,
        vx: rand(-1, 1) * CFG.speed,
        vy: rand(-1, 1) * CFG.speed,
        r: bright ? rand(1.6, 2.6) : rand(0.6, 1.4),
        alpha: bright ? rand(0.7, 1) : rand(0.25, 0.6),
        pulse: rand(0, Math.PI * 2),
        bright,
        purple,
      };
    }

    function initStars() {
      stars = Array.from({ length: CFG.count }, createStar);
    }

    function spawnPulse() {
      if (pulses.length >= CFG.pulseCount) return;
      const a = Math.floor(rand(0, stars.length));
      let b = Math.floor(rand(0, stars.length));
      while (b === a) b = Math.floor(rand(0, stars.length));
      const dx = stars[b].x - stars[a].x;
      const dy = stars[b].y - stars[a].y;
      if (Math.hypot(dx, dy) > CFG.linkDist) return;
      pulses.push({ from: a, to: b, t: 0, speed: rand(0.006, 0.014) });
    }

    function spawnShooter() {
      shooters.push({
        x: rand(0, w), y: rand(0, h * 0.4),
        len: rand(40, 90), speed: rand(4, 8),
        angle: rand(Math.PI * 0.15, Math.PI * 0.45),
        alpha: 1,
      });
    }

    function updateStars() {
      stars.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.pulse += 0.04;

        if (mouse.x !== null) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CFG.mouseDist && dist > 0) {
            const f = (CFG.mouseDist - dist) / CFG.mouseDist * 0.018;
            s.vx += (dx / dist) * f;
            s.vy += (dy / dist) * f;
          }
        }

        if (s.x < 0) { s.x = 0; s.vx *= -1; }
        if (s.x > w) { s.x = w; s.vx *= -1; }
        if (s.y < 0) { s.y = 0; s.vy *= -1; }
        if (s.y > h) { s.y = h; s.vy *= -1; }

        s.vx *= 0.995;
        s.vy *= 0.995;
      });
    }

    function starColor(s, a) {
      if (s.purple) return `rgba(200, 190, 255, ${a})`;
      if (s.bright) return `rgba(200, 245, 240, ${a})`;
      return `rgba(32, 178, 166, ${a})`;
    }

    function drawStar(s) {
      const glow = s.bright ? 0.25 + Math.sin(s.pulse) * 0.15 : 0;
      const a = Math.min(1, s.alpha + glow);

      if (s.bright) {
        const glowColor = s.purple ? '167, 139, 250' : '32, 178, 166';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glowColor}, ${a * 0.14})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = starColor(s, a);
      ctx.fill();
    }

    function drawLinks() {
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist >= CFG.linkDist) continue;

          const fade = 1 - dist / CFG.linkDist;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(32, 178, 166, ${fade * CFG.linkOpacity})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        if (mouse.x === null) continue;
        const mdx = mouse.x - stars[i].x;
        const mdy = mouse.y - stars[i].y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist >= CFG.mouseDist) continue;

        const mfade = 1 - mdist / CFG.mouseDist;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(32, 178, 166, ${mfade * CFG.mouseLinkOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function drawPulses() {
      for (let idx = pulses.length - 1; idx >= 0; idx--) {
        const p = pulses[idx];
        const a = stars[p.from];
        const b = stars[p.to];
        if (!a || !b) { pulses.splice(idx, 1); continue; }

        p.t += p.speed;
        if (p.t >= 1) { pulses.splice(idx, 1); continue; }

        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(32, 178, 166, 0.08)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = -tick * 0.5;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 245, 240, 0.9)';
        ctx.shadowColor = 'rgba(32, 178, 166, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function drawShooters() {
      for (let idx = shooters.length - 1; idx >= 0; idx--) {
        const s = shooters[idx];
        const ex = s.x + Math.cos(s.angle) * s.len;
        const ey = s.y + Math.sin(s.angle) * s.len;

        const grad = ctx.createLinearGradient(s.x, s.y, ex, ey);
        grad.addColorStop(0, 'rgba(200, 245, 240, 0)');
        grad.addColorStop(0.6, `rgba(32, 178, 166, ${s.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(200, 245, 240, ${s.alpha})`);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.012;

        if (s.alpha <= 0 || s.x > w + 100 || s.y > h + 100) shooters.splice(idx, 1);
      }
    }

    function render() {
      ctx.clearRect(0, 0, w, h);
      drawLinks();
      drawPulses();
      stars.forEach(drawStar);
      drawShooters();

      if (!reducedMotion) {
        updateStars();
        tick++;
        if (Math.random() < CFG.shootChance) spawnShooter();
        if (pulses.length < CFG.pulseCount && Math.random() < 0.04) spawnPulse();
      }

      if (visible) frameId = requestAnimationFrame(render);
    }

    function start() {
      if (frameId) return;
      if (reducedMotion) { render(); return; }
      frameId = requestAnimationFrame(render);
    }

    function stop() {
      if (frameId) { cancelAnimationFrame(frameId); frameId = null; }
    }

    resize();
    initStars();
    for (let i = 0; i < CFG.pulseCount; i++) spawnPulse();

    const visObs = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    }, { threshold: 0.05 });
    visObs.observe(section);

    function setMouse(clientX, clientY) {
      const rect = section.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    }

    section.addEventListener('mousemove', e => setMouse(e.clientX, e.clientY), { passive: true });
    section.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
    section.addEventListener('touchmove', e => {
      if (e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    section.addEventListener('touchend', () => { mouse.x = null; mouse.y = null; });

    window.addEventListener('resize', () => {
      resize();
      initStars();
    });
  }

  // 7. Hero — dynamic plexus mesh background
  const heroSection = document.getElementById('hero');
  const heroCanvas = document.getElementById('hero-canvas');
  const reducedMotionHero = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initNetworkCanvas(heroSection, heroCanvas, {
    count: reducedMotionHero ? 40 : 98,
    linkDist: 185,
    mouseDist: 240,
    speed: reducedMotionHero ? 0.12 : 0.38,
    pulseCount: reducedMotionHero ? 0 : 14,
    shootChance: reducedMotionHero ? 0 : 0.004,
    linkOpacity: 0.32,
    mouseLinkOpacity: 0.55,
    brightChance: 0.15,
    purpleChance: 0.25,
    edgeBias: true,
  });

  // 8. Projects section – constellation network
  const projectsCanvas = document.getElementById('projects-canvas');

  initNetworkCanvas(projectsSection, projectsCanvas);

  // 9. Copyright year
  const copyright = document.getElementById('copyright');
  if (copyright) {
    copyright.textContent = `© ${new Date().getFullYear()} Mazhar Ud Din. All rights reserved.`;
  }

  // 10. Intersection Observer – fade in sections on scroll
  const fadeEls = document.querySelectorAll('.timeline-item, .feature-card, .project-card, .edu-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
});
