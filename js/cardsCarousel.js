const cardsContainer = document.querySelector(".cards");
const cards = document.querySelectorAll(".card_move");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const circles = document.querySelectorAll(".circle");

let currentIndex = 0;

function updateCardsCarousel() {
  const cardWidth = cards[0].offsetWidth;
  const margin =
    parseInt(getComputedStyle(cards[0]).marginLeft) +
    parseInt(getComputedStyle(cards[0]).marginRight);
  const translateXValue = -(currentIndex * cardWidth + currentIndex * margin);
  cardsContainer.style.transform = `translateX(${
    translateXValue - currentIndex * 40
  }px)`;

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === cards.length - 1;

  circles.forEach((circle, index) => {
    circle.classList.toggle("active", index === currentIndex);
  });
}
circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    currentIndex = index;
    updateCardsCarousel();
  });
});
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCardsCarousel();
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCardsCarousel();
  }
});
