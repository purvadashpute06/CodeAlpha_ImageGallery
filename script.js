const cards = [...document.querySelectorAll(".photo-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const count = document.getElementById("photo-count");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxLocation = document.getElementById("lightbox-location");
let visibleCards = cards;
let currentIndex = 0;

function updateCount() {
  const total = visibleCards.length;
  count.textContent = `${total} photograph${total === 1 ? "" : "s"}`;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    cards.forEach(card => card.classList.toggle("hidden", category !== "all" && card.dataset.category !== category));
    visibleCards = cards.filter(card => !card.classList.contains("hidden"));
    updateCount();
  });
});

function showImage(index) {
  if (!visibleCards.length) return;
  currentIndex = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[currentIndex];
  const image = card.querySelector("img");
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = card.dataset.title;
  lightboxLocation.textContent = card.dataset.location;
}
function openLightbox(card) {
  visibleCards = cards.filter(item => !item.classList.contains("hidden"));
  showImage(visibleCards.indexOf(card));
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("close-lightbox").focus();
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
cards.forEach(card => card.addEventListener("click", () => openLightbox(card)));
document.getElementById("close-lightbox").addEventListener("click", closeLightbox);
document.getElementById("prev-image").addEventListener("click", () => showImage(currentIndex - 1));
document.getElementById("next-image").addEventListener("click", () => showImage(currentIndex + 1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentIndex - 1);
  if (event.key === "ArrowRight") showImage(currentIndex + 1);
});
updateCount();