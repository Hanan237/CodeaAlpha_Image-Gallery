const specimens = [
  { title: "Blush bouquet", category: "pastel", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700&q=80" },
  { title: "Soft peony", category: "bloom", img: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=700&q=80" },
  { title: "Lilac field", category: "dreamy", img: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=700&q=80" },
  { title: "Cotton clouds", category: "dreamy", img: "https://images.unsplash.com/photo-1495197359483-d092478c170a?w=700&q=80" },
  { title: "Dahlia dream", category: "bloom", img: "https://images.unsplash.com/photo-1500572476120-e3e94c8e73fc?w=700&q=80" },
  { title: "Baby pink petals", category: "pastel", img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=700&q=80" },
];

const gallery = document.getElementById("gallery");
const filterBtns = document.querySelectorAll(".filter-btn");

function renderGallery() {
  gallery.innerHTML = "";
  specimens.forEach((s, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.category = s.category;
    card.dataset.index = i;
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="thumb-wrap">
        <span class="tag">${s.category}</span>
        <img src="${s.img}" alt="${s.title}" loading="lazy">
      </div>
      <div class="meta">
        <h3>${s.title}</h3>
        <p>Photo ${String(i + 1).padStart(2, "0")}</p>
      </div>
    `;
    card.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".card").forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbTitle = document.getElementById("lbTitle");
const lbIndex = document.getElementById("lbIndex");
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  const s = specimens[currentIndex];
  lbImage.src = s.img;
  lbImage.alt = s.title;
  lbTitle.textContent = s.title;
  lbIndex.textContent = `${currentIndex + 1} / ${specimens.length}`;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNext() {
  currentIndex = (currentIndex + 1) % specimens.length;
  updateLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + specimens.length) % specimens.length;
  updateLightbox();
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbNext").addEventListener("click", showNext);
document.getElementById("lbPrev").addEventListener("click", showPrev);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});

renderGallery();
