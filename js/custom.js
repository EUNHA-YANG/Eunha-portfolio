window.addEventListener("load", function () {
  window.scrollTo(0, 0);
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
});

// 페이지 떠나기 전 스크롤 위치 초기화
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

// visual
let visualTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#visual",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play reverse play reverse",
    markers: false,
  },
});

visualTimeline
  .set("#visual ul li", { scale: 0, opacity: 0 })
  .to("#visual ul li", {
    scale: 1.5,
    opacity: 1,
    duration: 2,
    ease: "power3.out",
    stagger: 0.25,
  })

  .from(
    "#visual .st",
    {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      duration: 2,
      ease: "power2.out",
    },
    "-=1.2"
  )
  .from(
    "#visual .st1",
    {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      duration: 2,
      ease: "power2.out",
    },
    "-=1.2"
  )
  .from(
    "#visual .st2",
    {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      duration: 2,
      ease: "power2.out",
    },
    "-=1.4"
  );

// con01
gsap.from(".con01 h2", {
  scrollTrigger: {
    trigger: ".con01",
    start: "top 80%",
    toggleActions: "play none none reverse",
    markers: false,
  },
  opacity: 0,
  y: 50,

  duration: 1,
});

// con01 imgBox
gsap.from(".con01 .imgBox", {
  scrollTrigger: {
    trigger: ".con01 .wrap",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -100,
  rotation: -5,
  duration: 1.5,
});

// con01 textBox
gsap.from(".con01 .df", {
  scrollTrigger: {
    trigger: ".con01 .textBox",
    start: "top 70%",
    toggleActions: "play none none reverse",
    markers: false,
  },
  opacity: 0,
  x: 100,
  stagger: 0.2,
  duration: 1,
});

// con01 스킬
gsap.from(".con01 .skill li", {
  scrollTrigger: {
    trigger: ".con01",
    start: "20% center",
    end: "40% center",
    scrub: 2,
    markers: false,
  },
  opacity: 0,
  y: 50,
  stagger: 0.3,
  duration: 1,
});

//con02

let upBox = document.querySelectorAll(".upBox");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".con02",
    start: "top top",
    end: "+=300%",
    scrub: 1.5,
    pin: true,
    markers: false,
    anticipatePin: 1,
  },
});

upBox.forEach((box, index) => {
  tl.fromTo(
    box,
    {
      x: "100%",
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
      onStart: () => {
        // 이전 슬라이드들 숨기기
        upBox.forEach((prevBox, prevIndex) => {
          if (prevIndex < index) {
            gsap.to(prevBox, {
              opacity: 0,
              duration: 0.3,
            });
          }
        });
      },
    }
  );
});

tl.to({}, { duration: 2 });

gsap.from(".con02 h2", {
  scrollTrigger: {
    trigger: ".con02",
    start: "top 80%",
    toggleActions: "play none none reverse",
    markers: false,
  },
  opacity: 0,
  y: 50,
  duration: 1,
});

//con03

let con03 = document.querySelector(".con03");
let imgLeft = con03.querySelector(".imgScrollLeft");
let imgRight = con03.querySelector(".imgScrollRight");
let centerBox = con03.querySelector(".centerBox");

function getMoveAmount(ul) {
  return ul.scrollHeight - con03.offsetHeight;
}

let moveLeft = getMoveAmount(imgLeft);
let moveRight = getMoveAmount(imgRight);

let t2 = gsap.timeline({
  scrollTrigger: {
    trigger: con03,
    start: "top top",
    end: "+=350%",
    scrub: 1,
    pin: true, // pin the entire section
    anticipatePin: 1,
  },
});

t2.fromTo(imgLeft, { yPercent: -50 }, { yPercent: 50, ease: "none" }, 0).fromTo(
  imgRight,
  { yPercent: 50 },
  { yPercent: -50, ease: "none" },
  0
);

gsap.from(".con03 h2", {
  scrollTrigger: {
    trigger: ".con03",
    start: "30% 80%",
    end: "top 50%",
    scrub: 1,
    markers: false,
  },
  opacity: 0,

  filter: "blur(10px)",
  duration: 1,
});

// con04

const galleryItems = document.querySelectorAll(".con04 .wrap li");
const modalBox = document.querySelector(".modalBox");
const closeBtn = document.querySelector("#btn");
const modalImages = document.querySelectorAll(".modaling li");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const currentCounter = document.querySelector(".current");
const totalCounter = document.querySelector(".total");

let currentIndex = 0;
const totalImages = modalImages.length;

// 총 이미지 수 표시
totalCounter.textContent = totalImages;

// 이미지 표시 함수
function showImage(index) {
  modalImages.forEach((img, i) => {
    img.classList.remove("active");
    if (i === index) {
      img.classList.add("active");
    }
  });
  currentCounter.textContent = index + 1;
  currentIndex = index;
}

// 갤러리 아이템 클릭 시 모달 열기
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    modalBox.classList.add("active");
    document.body.style.overflow = "hidden";
    showImage(index);
  });
});

// 이전 버튼
prevBtn.addEventListener("click", () => {
  let newIndex = currentIndex - 1;
  if (newIndex < 0) {
    newIndex = totalImages - 1;
  }
  showImage(newIndex);
});

// 다음 버튼
nextBtn.addEventListener("click", () => {
  let newIndex = currentIndex + 1;
  if (newIndex >= totalImages) {
    newIndex = 0;
  }
  showImage(newIndex);
});

// 키보드 화살표로 이미지 넘기기
document.addEventListener("keydown", (e) => {
  if (!modalBox.classList.contains("active")) return;

  if (e.key === "ArrowLeft") {
    prevBtn.click();
  } else if (e.key === "ArrowRight") {
    nextBtn.click();
  } else if (e.key === "Escape") {
    modalBox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// 닫기 버튼
closeBtn.addEventListener("click", () => {
  modalBox.classList.remove("active");
  document.body.style.overflow = "auto";
});

// 모달 배경 클릭 시 닫기
modalBox.addEventListener("click", (e) => {
  if (e.target === modalBox) {
    modalBox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

let list = gsap.utils.toArray(".con04 li");
gsap.to(list, {
  xPercent: "-430", //x(가로)축으로 (-)왼쪽방향 list 가로크기만큼 400%만큼 이동
  scrollTrigger: {
    trigger: ".con04",
    start: "top top",
    end: "+=1500",
    scrub: 2,
    pin: true,
    markers: false,
  },
});
gsap.from(".con04 h2", {
  scrollTrigger: {
    trigger: ".con04",
    start: "top 80%",
    end: "top 50%",
    scrub: 1,
    markers: false,
  },
  opacity: 0,
  y: 50,
  filter: "blur(10px)",
  duration: 1,
});

// con05
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".con05",
      start: "top top",
      end: "50% 50%",
      scrub: 2,
      markers: false,
      once: true,
    },
  })
  .fromTo(
    ".con05",
    { "clip-path": "inset(60% 60% 60% 60% round 30%)" },
    { "clip-path": "inset(0% 0% 0% 0% round 0%)", duration: 5 }
  )
  .from(
    ".con05 h2",
    {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 3,
    },
    "-=4"
  )
  .fromTo(
    ".con05 .text",
    { "background-size": "0% 100%" },
    { "background-size": "100% 100%", duration: 5, stagger: 0.3 },
    "-=2"
  );
