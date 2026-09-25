/* ============================================================
   EDITABLE CONTENT — change the text/photo/video paths here
   ============================================================ */

// Phrases for the scrolling "You're..." list on bouquet 1
const PHRASES = [
  "my pookie", "my love", "my life", "my baby", "my boy",
  "my sweetheart", "my cutie", "my soulmate", "my forever",
  "my handsome", "my home", "my everything", "my whole heart",
  "my man", "my loverboy", "my cutiepie", "my babe", "my favorite person"
];

// Photos for the collage on bouquet 1, page 2 (put files in photos/)
const COLLAGE_PHOTOS = [
  "photos/collage1.jpg",
  "photos/collage2.jpg",
  "photos/collage3.jpg",
  "photos/collage4.jpg",
  "photos/collage5.jpg",
  "photos/collage6.jpg"
];

// Letter text on bouquet 3
const LETTER_TEXT = document.getElementById("letterText").textContent.trim();
const LETTER_SIGNATURE = "With love, Dimple";

/* ============================================================
   PAGE NAVIGATION
   ============================================================ */
function goToPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  // trigger per-page effects
  if (id === "b1-1") startScrollList();
  if (id === "b1-2") animateCollage();
  if (id === "page-final") startFinalHearts();
  if (id === "b2-1") resetVideo();
}

document.getElementById("btnToPage2").addEventListener("click", () => goToPage("page-2"));
document.getElementById("btnToFinal").addEventListener("click", () => goToPage("page-final"));

document.querySelectorAll(".bouquet-card").forEach(card => {
  card.addEventListener("click", () => goToPage(card.dataset.target));
});
document.querySelectorAll(".arrow-btn, .back-btn").forEach(btn => {
  btn.addEventListener("click", () => goToPage(btn.dataset.target));
});

/* ============================================================
   BACKGROUND STARS (page 1 + everywhere)
   ============================================================ */
function makeStars(count = 22) {
  const wrap = document.getElementById("starsBg");
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.textContent = "★";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.fontSize = (0.6 + Math.random() * 1.2) + "rem";
    s.style.animationDelay = (Math.random() * 3) + "s";
    wrap.appendChild(s);
  }
}
makeStars();

/* ============================================================
   SCROLLING "YOU'RE..." LIST
   ============================================================ */
let scrollListBuilt = false;
function startScrollList() {
  if (scrollListBuilt) return;
  scrollListBuilt = true;
  const ul = document.getElementById("scrollList");
  // duplicate the list once so the CSS animation (translateY -50%) loops seamlessly
  const doubled = [...PHRASES, ...PHRASES];
  doubled.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
}

/* ============================================================
   PHOTO COLLAGE FLY-IN
   ============================================================ */
let collageBuilt = false;
function animateCollage() {
  const grid = document.getElementById("collageGrid");
  if (!collageBuilt) {
    collageBuilt = true;
    COLLAGE_PHOTOS.forEach(src => {
      const div = document.createElement("div");
      div.className = "collage-photo";
      const img = document.createElement("img");
      img.src = src;
      img.alt = "memory";
      div.appendChild(img);
      grid.appendChild(div);
    });
  }
  // (re)trigger fly-in animation each time the page is opened
  const dirs = [
    { x: "-40vw", y: "-10vh", r: "-15deg" },
    { x: "40vw", y: "-10vh", r: "15deg" },
    { x: "-30vw", y: "20vh", r: "10deg" },
    { x: "30vw", y: "20vh", r: "-10deg" },
    { x: "0vw", y: "-30vh", r: "8deg" },
    { x: "0vw", y: "30vh", r: "-8deg" }
  ];
  document.querySelectorAll(".collage-photo").forEach((el, i) => {
    el.classList.remove("fly-in");
    const d = dirs[i % dirs.length];
    el.style.setProperty("--fx", d.x);
    el.style.setProperty("--fy", d.y);
    el.style.setProperty("--fr", d.r);
    void el.offsetWidth; // restart animation
    el.style.animationDelay = (i * 0.12) + "s";
    el.classList.add("fly-in");
  });
}

/* ============================================================
   VIDEO PLAYER CONTROLS
   ============================================================ */
const video = document.getElementById("mainVideo");
const playBtn = document.getElementById("playBtn");
const playOverlayBtn = document.getElementById("playOverlayBtn");
const muteBtn = document.getElementById("muteBtn");
const likeBtn = document.getElementById("likeBtn");
const seekBar = document.getElementById("seekBar");

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.textContent = "⏸";
    playOverlayBtn.style.display = "none";
  } else {
    video.pause();
    playBtn.textContent = "▶";
    playOverlayBtn.style.display = "block";
  }
}
playBtn.addEventListener("click", togglePlay);
playOverlayBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
});

likeBtn.addEventListener("click", () => {
  const liked = likeBtn.classList.toggle("liked");
  likeBtn.textContent = liked ? "♥" : "♡";
});

video.addEventListener("timeupdate", () => {
  if (video.duration) {
    seekBar.value = (video.currentTime / video.duration) * 100;
  }
});
seekBar.addEventListener("input", () => {
  if (video.duration) {
    video.currentTime = (seekBar.value / 100) * video.duration;
  }
});

function resetVideo() {
  video.pause();
  video.currentTime = 0;
  playBtn.textContent = "▶";
  playOverlayBtn.style.display = "block";
  seekBar.value = 0;
}

/* ============================================================
   FINAL PAGE FLOATING HEARTS
   ============================================================ */
let finalHeartsBuilt = false;
function startFinalHearts() {
  if (finalHeartsBuilt) return;
  finalHeartsBuilt = true;
  const wrap = document.getElementById("finalHearts");
  for (let i = 0; i < 18; i++) {
    const h = document.createElement("span");
    h.className = "fheart";
    h.textContent = "❤";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (1 + Math.random() * 1.6) + "rem";
    h.style.animationDuration = (5 + Math.random() * 5) + "s";
    h.style.animationDelay = (Math.random() * 5) + "s";
    wrap.appendChild(h);
  }
}