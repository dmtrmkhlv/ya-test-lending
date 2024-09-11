const runningLines = document.querySelectorAll(".running-line");

function runnigLineSetup(runningLine) {
  let windowWidth = window.innerWidth;
  let lastWidth = window.innerWidth;
  let lastHeight = window.innerHeight;
  const firstLineText = runningLine.querySelector(".running-line__text");
  const secondLineText = firstLineText.cloneNode(true);

  firstLineText.style.left = `${windowWidth}px`;
  secondLineText.style.left = `${windowWidth}px`;
  runningLine.appendChild(secondLineText);

  const moveState = {
    isFirst: true,
    isSecond: false,
  };

  let intervalId;

  window.addEventListener("resize", function () {
    if (intervalId) {
      if (
        window.innerWidth !== lastWidth ||
        window.innerHeight !== lastHeight
      ) {
        clearInterval(intervalId);
        windowWidth = window.innerWidth;
        lastWidth = window.innerWidth;
        moveState.isFirst = true;
        moveState.isSecond = false;
        firstLineText.style.left = `${windowWidth}px`;
        secondLineText.style.left = `${windowWidth}px`;
      }
    }

    intervalId = setInterval(() => {
      lastHeight = window.innerHeight;
      checkPosition(
        firstLineText,
        secondLineText,
        window.innerWidth,
        moveState
      );
    }, 16);
  });

  intervalId = setInterval(() => {
    checkPosition(firstLineText, secondLineText, window.innerWidth, moveState);
  }, 16);
}

function checkPosition(firstLineText, secondLineText, windowWidth, moveState) {
  const firstRect = firstLineText.getBoundingClientRect();
  const secondRect = secondLineText.getBoundingClientRect();
  if (moveState.isFirst) {
    moveEl(firstLineText);
  }
  if (moveState.isSecond) {
    moveEl(secondLineText);
  }

  if (Math.floor(firstRect.right) < windowWidth) {
    moveState.isSecond = true;
  }

  if (
    Math.floor(secondRect.left) < 0 &&
    Math.floor(secondRect.right) >= windowWidth
  ) {
    moveState.isFirst = false;
    firstLineText.style.left = `${windowWidth}px`;
  } else if (Math.floor(secondRect.right) < windowWidth) {
    moveState.isFirst = true;
  }

  if (
    Math.floor(firstRect.left) < 0 &&
    Math.floor(firstRect.right) >= windowWidth
  ) {
    moveState.isSecond = false;
    secondLineText.style.left = `${windowWidth}px`;
  } else if (Math.floor(firstRect.right) < windowWidth) {
    moveState.isSecond = true;
  }
}

function moveEl(el) {
  let newLeft = +el.style.left.split("px")[0];
  el.style.left = newLeft - 1 + "px";
}

runningLines.forEach((runningLine) => {
  runnigLineSetup(runningLine);
});
