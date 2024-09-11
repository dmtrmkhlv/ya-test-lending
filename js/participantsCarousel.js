const participantsContainer = document.querySelector(".participants__line");

const existParticipants = Array.from(participantsContainer.children);

const beforeExistParticipants = [
  existParticipants[existParticipants.length - 3],
  existParticipants[existParticipants.length - 2],
  existParticipants[existParticipants.length - 1],
];
const afterExistParticipants = [
  existParticipants[0],
  existParticipants[1],
  existParticipants[2],
];

participantsContainer.innerHTML = "";
beforeExistParticipants.forEach((element) =>
  participantsContainer.appendChild(element.cloneNode(true))
);
existParticipants.forEach((element) =>
  participantsContainer.appendChild(element.cloneNode(true))
);
afterExistParticipants.forEach((element) =>
  participantsContainer.appendChild(element.cloneNode(true))
);

const participants = document.querySelectorAll(".participant");
const totalParticipants = participants.length;
const current = document.getElementById("current");
const total = document.getElementById("total");
const nextParticipant = document.getElementById("next_participant");
const prevParticipant = document.getElementById("prev_participant");
let index = 3;
let prevIndex = 3;
let isMobile = window.innerWidth < participants[0].clientWidth * 3 + 52;
let diffForMobile = 3;

window.addEventListener("resize", function () {
  isMobile = window.innerWidth < participants[0].clientWidth * 3;
});

participantsContainer.style.transform = `translateX(-${
  diffForMobile * (isMobile ? 100 : 33.33)
}%)`;

total.textContent = totalParticipants - 6;

nextParticipant.addEventListener("click", function () {
  prevIndex = index;
  if (index >= totalParticipants - 1) {
    index = 0;
  } else {
    index++;
  }
  updateCarousel();
});

prevParticipant.addEventListener("click", function () {
  prevIndex = index;
  if (index <= 0) {
    index = totalParticipants;
  }
  index--;
  updateCarousel();
});

function updateCarousel() {
  current.textContent = diffForMobile - 2;
  if (index > diffForMobile) {
    current.textContent = index - diffForMobile + 1;
  }
  if (index == 0 || index == 2) {
    current.textContent = totalParticipants - 6;
  }
  if (index == totalParticipants - diffForMobile) {
    current.textContent = 1;
  }
  let offset = -index * (isMobile ? 100 : 33.33);

  participantsContainer.style.transform = `translateX(${offset}%)`;
  participantsContainer.style.transition = "transform 0.5s ease";

  if (prevIndex == diffForMobile && index == diffForMobile - 1) {
    setTimeout(() => {
      participantsContainer.style.transition = "none";
      offset =
        -(totalParticipants - 2 - diffForMobile + 1) * (isMobile ? 100 : 33.33);
      participantsContainer.style.transform = `translateX(${offset}%)`;
      index = totalParticipants - 2 - diffForMobile + 1;
    }, 1000);
  }
  if (
    prevIndex == totalParticipants - diffForMobile - 1 &&
    index == totalParticipants - diffForMobile
  ) {
    setTimeout(() => {
      participantsContainer.style.transition = "none";
      offset = -1 * diffForMobile * (isMobile ? 100 : 33.33);
      participantsContainer.style.transform = `translateX(${offset}%)`;
      index = diffForMobile;
    }, 1000);
  }
}

setInterval(function () {
  nextParticipant.click();
}, 4000);
