/* ---------------- data ---------------- */
const DODGE_LINES = [
  "Nice try 😏",
  "So close!",
  "Almost had it!",
  "Not today, cutie.",
  "Okay okay, last one, promise…"
];
const MAX_DODGES = 5;

/* ---------------- your photos & videos ----------------
   1. Create a folder called "images" next to index.html, style.css and
      script.js, and put your files inside it.
   2. List the filenames below, in the order you want them to appear.
   3. Leave an array empty ( [] ) to keep the "add a photo here" placeholder
      tiles instead. */
const PHOTO_FILES = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo3.jpg',
  'images/photo4.jpg',
  'images/photo5.jpg',
  'images/photo6.jpg',
  'images/photo7.jpg',
];
const VIDEO_FILES = [
  'images/clip1.mp4',
  'images/clip2.mp4',
  'images/clip3.mp4',
];


let current = 0;
const TOTAL = 8;      // total slides, including the teaser
const PAGE_TOTAL = 7; // "PAGE X OF Y" only counts the real gift pages

/* ---------------- build slides ---------------- */
const slidesEl = document.getElementById('slides');

function heartIcon(size = 30) {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size}px;height:${size}px"><path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2.2 5 5.7 5c2 0 3.4 1.1 4.3 2.4C10.9 6.1 12.3 5 14.3 5c3.5 0 5.3 3.6 3.7 6.9C19.5 16.4 12 21 12 21z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
}

function sparkleIcon(size = 16) {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size}px;height:${size}px"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" fill="currentColor"/></svg>`;
}

/* ---------- teaser / "click yes" game slide ---------- */
function buildTeaserSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">${sparkleIcon(14)} A LITTLE GAME FIRST</span>
    <h1 class="big">Ready for your gift? 🎀</h1>
    <p class="slide-sub" id="teaserSub">Just click "Yes" and it's all yours…</p>
    <div class="teaser-stage" id="teaserStage">
      <button class="btn teaser-yes" id="teaserYes">Yes</button>
      <button class="btn ghost teaser-no" id="teaserNo">No</button>
    </div>
    <p class="hint" id="teaserHint">psst — it might not want to be caught right away</p>
  `;
  return el;
}

function buildSlide1() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 1 OF ${PAGE_TOTAL}</span>
    <h1 class="big">Happy Birthday.</h1>
    <p class="slide-sub">This small gift is only for you my friend.... Open the gift whenever you are ready</p>
    <div class="gift-wrap">
      <div class="gift-scene" id="giftScene">
        <div class="gift-glow" id="giftGlow"></div>
        <div class="gift-shadow"></div>
        <button class="gift-box" id="giftBox" aria-label="Open your gift">
          <span class="lid" id="giftLid">
            <span class="lid-ribbon-h"></span>
            <span class="lid-ribbon-v"></span>
          </span>
          <span class="bow" id="giftBow">
            <span class="bow-loop bow-loop-l"></span>
            <span class="bow-loop bow-loop-r"></span>
            <span class="bow-knot"></span>
          </span>
          <span class="base"></span>
          <span class="ribbon-v"></span>
          <span class="ribbon-h"></span>
        </button>
        <div class="confetti-field" id="giftConfetti" aria-hidden="true"></div>
      </div>
      <div class="cta-row">
        <button class="btn" id="openGiftBtn">Open your gift</button>
      </div>
    </div>
  `;
  return el;
}

function buildMediaSlide({ page, title, sub, kind, files, count }) {
  const el = document.createElement('div');
  const grid = document.createElement('div');
  grid.className = 'media-grid';

  const total = (files && files.length) ? files.length : count;
  let tiles = '';
  for (let i = 0; i < total; i++) {
    const src = (files && files[i]) ? files[i] : null;
    let inner;
    if (src) {
      inner = kind === 'video'
        ? `<video controls src="${src}"></video>`
        : `<img src="${src}" alt="">`;
    } else {
      inner = kind === 'video'
        ? '<!-- Add a video that plays right here on the page, e.g. <video controls src="images/clip1.mp4"></video> -->'
        : '<!-- Add a photo here, e.g. <img src="images/photo1.jpg" alt=""> -->';
    }
    tiles += `<div class="media-tile" data-kind="${kind}">${inner}</div>`;
  }
  el.innerHTML = `
    <span class="kicker">PAGE ${page} OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">${title}</h2>
    <p class="slide-sub">${sub}</p>
  `;
  grid.innerHTML = tiles;
  el.appendChild(grid);
  const continueRow = document.createElement('div');
  continueRow.className = 'cta-row';
  continueRow.style.marginTop = '26px';
  continueRow.innerHTML = `<button class="btn continue-btn">Continue</button>`;
  el.appendChild(continueRow);
  return el;
}

/* ---------- cake cutting scene ---------- */
function buildCakeSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 4 OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">Make a Wish 🎂</h2>
    <p class="slide-sub">Blow out the candles, then cut the first slice.</p>
    <div class="cake-stage">
      <svg id="cakeSvg" viewBox="0 0 300 210" class="cake-svg">
        <ellipse class="cake-plate-shadow" cx="130" cy="190" rx="115" ry="11"/>
        <ellipse class="side-plate" cx="252" cy="178" rx="38" ry="9"/>

        <!-- smoke wisps, hidden until candles are blown out -->
        <g id="smoke" class="smoke">
          <path class="smoke-wisp" d="M70,38 C66,28 76,24 72,14" />
          <path class="smoke-wisp" d="M126,32 C122,22 132,18 128,8" />
          <path class="smoke-wisp" d="M182,38 C178,28 188,24 184,14" />
        </g>

        <g id="flames">
          <circle class="flame-glow" cx="70" cy="30" r="11"/>
          <circle class="flame-glow" cx="126" cy="24" r="11"/>
          <circle class="flame-glow" cx="182" cy="30" r="11"/>
          <ellipse class="flame" cx="70" cy="30" rx="5" ry="9"/>
          <ellipse class="flame" cx="126" cy="24" rx="5" ry="9"/>
          <ellipse class="flame" cx="182" cy="30" rx="5" ry="9"/>
        </g>
        <rect x="66" y="34" width="4" height="16" fill="#F7E9DD"/>
        <rect x="122" y="28" width="4" height="16" fill="#F7E9DD"/>
        <rect x="178" y="34" width="4" height="16" fill="#F7E9DD"/>

        <!-- exposed interior, revealed once the slice lifts away -->
        <g id="cutFace" class="cut-face">
          <rect x="150" y="60" width="16" height="110" fill="#F7E9DD"/>
          <rect x="150" y="94" width="16" height="10" fill="#FF4136"/>
          <rect x="150" y="132" width="16" height="10" fill="#FF4136"/>
        </g>

        <!-- remaining cake body (left of the cut line) -->
        <g id="cakeBody">
          <rect x="30" y="60" width="130" height="110" rx="14" fill="#FF9B90"/>
          <rect x="30" y="60" width="130" height="24" rx="10" fill="#FF2D2D"/>
          <path class="drip" d="M30,80 q8,14 16,0 q8,14 16,0 q8,14 16,0 q8,14 16,0 q8,14 16,0 q8,14 16,0 q8,14 16,0 v-4 h-112 z"/>
          <circle class="sprinkle" cx="45" cy="72" r="2.4"/>
          <circle class="sprinkle" cx="75" cy="68" r="2.4"/>
          <circle class="sprinkle" cx="105" cy="72" r="2.4"/>
          <circle class="sprinkle" cx="135" cy="68" r="2.4"/>
        </g>

        <!-- the slice: identical visual style, lifted away on cut -->
        <g id="cakeSlice" class="cake-slice">
          <rect x="160" y="60" width="40" height="110" rx="14" fill="#FF9B90"/>
          <rect x="160" y="60" width="40" height="24" rx="10" fill="#FF2D2D"/>
          <path class="drip" d="M160,80 q8,14 16,0 q8,14 16,0 v-4 h-32 z"/>
          <circle class="sprinkle" cx="172" cy="70" r="2.4"/>
          <circle class="sprinkle" cx="190" cy="70" r="2.4"/>
          <rect x="160" y="60" width="6" height="110" fill="#F7E9DD" opacity="0.9"/>
        </g>

        <g id="knife" class="knife">
          <rect x="-5" y="0" width="62" height="11" rx="5" fill="#F7E9DD"/>
          <rect x="52" y="-4" width="16" height="19" rx="4" fill="#5A2E2E"/>
        </g>
      </svg>
      <div class="confetti-field" id="confettiField" aria-hidden="true"></div>
      <div class="balloon-field" id="balloonField" aria-hidden="true"></div>
    </div>
    <div class="cta-row" id="cakeCtaRow">
      <button class="btn" id="blowBtn">Blow out the candles</button>
    </div>
  `;
  return el;
}

function buildMessageSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 5 OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">From the Heart</h2>
    <p class="slide-sub">Some of the things i wanna say to you on your birthday</p>
    <div class="letter">
      <!--
        Write the birthday message right here, replacing the lines below.
        This page is for reading only on the live site — edit the text
        in this file, not on the page itself.
      -->
      <p class="letter-text">Happy Birthday, Chavi... oops, sorry — Chotuu Badmash 😜😜. Yes, I said it, and no, I'm not taking it back, because that's exactly who you are to me. One minute you're the one giving me the wisest, most level-headed advice, and the next you're the biggest troublemaker in the room, dragging me into whatever chaos you've cooked up — and somehow I wouldn't have it any other way.</p>
      <p class="letter-text">I hope this year brings you everything you've ever wanted in life — the big, loud dreams you talk about for hours, and the small, quiet ones you never say out loud but I know you carry anyway. I hope every plan you've been holding onto starts falling into place, every hard day gets balanced out by ten good ones, and every wish you make this year finds its way back to you, right when you need it most. ❤️❤️</p>
      <p class="letter-text">My dear best friend, I've always wanted you to become a great person — and the truth is, you already are one. I've watched you grow through things that weren't easy, stumble, dust yourself off, laugh about it later, and come back stronger every single time. That's not luck, that's just who you are, and it makes me endlessly proud to be the one who gets to call you my best friend.</p>
      <p class="letter-text">So here's to you, Chotuu — to another year of your chaos, your kindness, your ridiculous humor, and everything that makes you, you. Happy birthday. I mean every single word of this, today and always.</p>
    </div>
    <div class="cta-row" style="margin-top:22px;">
      <button class="btn continue-btn">Continue</button>
    </div>
  `;
  return el;
}

/* ---------- her turn to write ---------- */
// Sent via Formspree straight to the birthday page's owner.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xljdpqbv';

function buildHerMessageSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 6 OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">Your Turn 💌</h2>
    <p class="slide-sub">Whatever's on your mind right now — write it here.</p>
    <div class="her-note-box">
      <form id="herForm" action="${FORMSPREE_ENDPOINT}" method="POST">
        <input type="hidden" name="_subject" value="A note from your birthday page 💌">
        <textarea id="herNote" name="message" class="her-textarea" rows="6" placeholder="Dear diary..." required></textarea>
        <div class="cta-row" style="margin-top:16px;">
          <button class="btn" type="submit" id="sendNoteBtn">Send it</button>
        </div>
        <p class="hint" id="noteStatus"></p>
      </form>
    </div>
    <div class="cta-row" style="margin-top:22px;">
      <button class="btn continue-btn">Continue</button>
    </div>
  `;
  return el;
}

function buildGoodbyeSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 7 OF ${PAGE_TOTAL}</span>
    <h2 class="slide-title">Things i promise you this year</h2>
    <p class="slide-sub">I swear to keep these promises for eternity</p>
    <div class="finale-card">
      <div class="finale-text">
        <p class="finale-line">However today goes, I hope it's a good one, start to finish.</p>
        <p class="finale-line">This is the last page — but not the last time I'll say it.</p>
        <p class="finale-line">Happy birthday. Truly. That's the whole wish.</p>
        <p class="finale-line">Goodbye for now.</p>
      </div>
    </div>
    <p class="the-end">THE END!</p>
  `;
  return el;
}

const builders = [
  buildTeaserSlide,
  buildSlide1,
  () => buildMediaSlide({ page: 2, title: 'A Few Favorites', sub: 'Some of your photos that worth keeping saved for eternity..', kind: 'photo', count: 4, files: PHOTO_FILES }),
  () => buildMediaSlide({ page: 3, title: 'A Little Motion', sub: 'Some moment of you that i love', kind: 'video', count: 2, files: VIDEO_FILES }),
  buildCakeSlide,
  buildMessageSlide,
  buildHerMessageSlide,
  buildGoodbyeSlide
];

builders.forEach((build, i) => {
  const slide = document.createElement('section');
  slide.className = 'slide' + (i === 0 ? ' active' : '');
  slide.id = 'slide-' + i;
  const inner = document.createElement('div');
  inner.className = 'slide-inner';
  inner.appendChild(build());
  slide.appendChild(inner);
  slidesEl.appendChild(slide);
});

/* ---------------- navigation ---------------- */
function goTo(index) {
  const wrapped = index >= TOTAL || index < 0;
  current = (index + TOTAL) % TOTAL;
  document.querySelectorAll('.slide').forEach((s, i) => s.classList.toggle('active', i === current));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (wrapped && current === 0) resetGiftBox();
}
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT') return;
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft') goTo(current - 1);
});

/* ---------------- teaser "runaway yes button" game ---------------- */
(function setupTeaser() {
  const stage = document.getElementById('teaserStage');
  const yesBtn = document.getElementById('teaserYes');
  const noBtn = document.getElementById('teaserNo');
  const sub = document.getElementById('teaserSub');
  const hint = document.getElementById('teaserHint');
  if (!stage || !yesBtn) return;

  let dodges = 0;
  let caught = false;

  function dodge() {
    if (caught) return;
    const stageRect = stage.getBoundingClientRect();
    const btnRect = yesBtn.getBoundingClientRect();
    const maxX = Math.max(stageRect.width - btnRect.width - 8, 0);
    const maxY = Math.max(stageRect.height - btnRect.height - 8, 0);
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    yesBtn.style.left = x + 'px';
    yesBtn.style.top = y + 'px';
    sub.textContent = DODGE_LINES[Math.min(dodges, DODGE_LINES.length - 1)];
    dodges++;
    if (dodges >= MAX_DODGES) {
      caught = true;
      yesBtn.classList.add('catchable');
      hint.textContent = "okay, it's all yours now";
    }
  }

  // desktop: dodge the moment the cursor gets near
  yesBtn.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse') dodge();
  });
  // mobile: a tap should dodge rather than register as a click, until caught
  yesBtn.addEventListener('touchstart', (e) => {
    if (!caught) { e.preventDefault(); dodge(); }
  }, { passive: false });

  yesBtn.addEventListener('click', () => {
    if (!caught) { dodge(); return; }
    goTo(1);
  });

  noBtn.addEventListener('click', () => {
    sub.textContent = "\"No\" isn't on the menu today 💕";
  });
})();

/* ---------------- delegated events (continue) ---------------- */
slidesEl.addEventListener('click', (e) => {
  if (e.target.id === 'openGiftBtn' || e.target.closest('#giftBox')) {
    openGiftSequence();
  }
  if (e.target.id === 'blowBtn') {
    blowOutCandles();
  }
  if (e.target.closest('.continue-btn')) {
    goTo(current + 1);
  }
});

/* ---------------- reusable particle burst ---------------- */
function spawnParticles(field, { count = 24, colors, shapes = ['confetti'], xRange = [40, 60], yStart = '40%', spreadX = 160, fallDistance = 160, durationRange = [1.2, 2.4], delayRange = [0, 0.3] } = {}) {
  if (!field) return;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    piece.className = 'confetti-piece' + (shape === 'crumb' ? ' crumb-piece' : '');
    piece.style.left = (xRange[0] + Math.random() * (xRange[1] - xRange[0])) + '%';
    piece.style.top = yStart;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', (Math.random() * spreadX * 2 - spreadX) + 'px');
    piece.style.setProperty('--fall', fallDistance + 'px');
    piece.style.animationDuration = (durationRange[0] + Math.random() * (durationRange[1] - durationRange[0])) + 's';
    piece.style.animationDelay = (delayRange[0] + Math.random() * (delayRange[1] - delayRange[0])) + 's';
    field.appendChild(piece);
    setTimeout(() => piece.remove(), 3200);
  }
}

/* ---------------- gift opening: shake -> untie -> pop -> glow -> confetti ---------------- */
let giftBusy = false;
function openGiftSequence() {
  if (giftBusy) return;
  giftBusy = true;
  const box = document.getElementById('giftBox');
  const bow = document.getElementById('giftBow');
  const lid = document.getElementById('giftLid');
  const glow = document.getElementById('giftGlow');
  const field = document.getElementById('giftConfetti');
  if (!box) { giftBusy = false; return; }

  box.classList.add('shaking');

  setTimeout(() => {
    box.classList.remove('shaking');
    bow.classList.add('untied');
  }, 620);

  setTimeout(() => {
    lid.classList.add('opened');
    box.classList.add('opened');
    glow.classList.add('lit');
  }, 900);

  setTimeout(() => {
    spawnParticles(field, {
      count: 30,
      colors: ['#FF4136', '#FF9B90', '#F7E9DD', '#FFB6C9', '#FF2D2D'],
      xRange: [30, 70],
      yStart: '30%',
      spreadX: 120,
      fallDistance: -180,
      durationRange: [1, 1.8]
    });
  }, 1050);

  setTimeout(() => goTo(2), 1650);
}

function resetGiftBox() {
  const box = document.getElementById('giftBox');
  const bow = document.getElementById('giftBow');
  const lid = document.getElementById('giftLid');
  const glow = document.getElementById('giftGlow');
  if (!box) return;
  box.classList.remove('opened', 'shaking');
  bow.classList.remove('untied');
  lid.classList.remove('opened');
  glow.classList.remove('lit');
  giftBusy = false;
}

/* ---------------- cake: blow out candles -> cut -> lift slice ---------------- */
function blowOutCandles() {
  const flames = document.getElementById('flames');
  const smoke = document.getElementById('smoke');
  const ctaRow = document.getElementById('cakeCtaRow');
  if (!flames) return;

  flames.classList.add('out');
  smoke.classList.add('rising');
  ctaRow.innerHTML = '<button class="btn" id="cutBtn">Cut the cake</button>';

  ctaRow.addEventListener('click', function onCut(e) {
    if (e.target.id !== 'cutBtn') return;
    ctaRow.removeEventListener('click', onCut);
    startCakeCut();
  });
}

const BALLOON_RISE_MS = 2600;   // slow, gentle rise — keep in sync with the .balloon-rise CSS animation duration
const BALLOON_COUNT = 15;
const BALLOON_MAX_DELAY_MS = 500; // balloons launch staggered over this window, not all at once

function startCakeCut() {
  const knife = document.getElementById('knife');
  const slice = document.getElementById('cakeSlice');
  const cutFace = document.getElementById('cutFace');
  const cakeBody = document.getElementById('cakeBody');
  const ctaRow = document.getElementById('cakeCtaRow');
  const field = document.getElementById('confettiField');
  const balloonField = document.getElementById('balloonField');

  knife.classList.add('plunge');

  setTimeout(() => {
    cakeBody.classList.add('squish');
    spawnParticles(field, {
      count: 14,
      colors: ['#F7E9DD', '#FF9B90', '#5A2E2E'],
      shapes: ['crumb'],
      xRange: [55, 65],
      yStart: '55%',
      spreadX: 40,
      fallDistance: 80,
      durationRange: [0.8, 1.3]
    });
  }, 420);

  setTimeout(() => {
    knife.classList.add('lift');
    slice.classList.add('lifted');
    cutFace.classList.add('revealed');
    spawnBalloon(balloonField);
  }, 620);

  // the continue button only appears once all balloons have finished rising to the top
  setTimeout(() => {
    ctaRow.innerHTML = '<button class="btn continue-btn">Continue</button>';
  }, 620 + BALLOON_RISE_MS + BALLOON_MAX_DELAY_MS);
}

function spawnBalloon(field) {
  if (!field) return;
  const colors = ['var(--love-red-strong)', 'var(--love-red)', 'var(--pink-pop)', 'var(--love-red-soft)'];
  for (let i = 0; i < BALLOON_COUNT; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const delay = Math.random() * BALLOON_MAX_DELAY_MS;
    const drift = Math.random() * 180 - 90;
    const size = 90 + Math.random() * 90; // big balloons that fill the screen
    balloon.style.left = (Math.random() * 100) + 'vw';
    balloon.style.width = size + 'px';
    balloon.style.height = (size * 1.28) + 'px';
    balloon.style.marginLeft = (-size / 2) + 'px';
    balloon.style.animationDelay = delay + 'ms';
    balloon.style.setProperty('--balloon-drift', drift + 'px');
    balloon.style.background = `radial-gradient(circle at 32% 28%, var(--cream), ${colors[Math.floor(Math.random() * colors.length)]} 70%)`;
    balloon.innerHTML = '<span class="balloon-string"></span>';
    field.appendChild(balloon);
    setTimeout(() => balloon.remove(), delay + BALLOON_RISE_MS + 150);
  }
}


/* ---------------- her note: send it via Formspree ---------------- */
(function setupHerForm() {
  const form = document.getElementById('herForm');
  if (!form) return;
  const status = document.getElementById('noteStatus');
  const sendBtn = document.getElementById('sendNoteBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const note = document.getElementById('herNote');
    if (!note.value.trim()) return;

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';
    status.textContent = '';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.textContent = 'Sent ✓';
        sendBtn.textContent = 'Sent';
        note.disabled = true;
      } else {
        throw new Error('Formspree error');
      }
    } catch (err) {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send it';
      status.textContent = "Couldn't send just now — check your connection and try again.";
    }
  });
})();

/* ---------------- ambient floating hearts + sparkles ---------------- */
(function seedHearts() {
  const field = document.getElementById('heartsField');
  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 14;
  for (let i = 0; i < count; i++) {
    const size = 14 + Math.random() * 14;
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    h.style.animationDuration = (14 + Math.random() * 10) + 's';
    h.style.animationDelay = (Math.random() * 14) + 's';
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.innerHTML = i % 3 === 0 ? sparkleIcon(size) : heartIcon(size);
    field.appendChild(h);
  }
})();
