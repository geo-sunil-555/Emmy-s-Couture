gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 860px)").matches;

/* ---------------------------------------------
   SMOOTH SCROLL (Lenis)
--------------------------------------------- */
let lenis;
if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/* ---------------------------------------------
   NAV — solid on scroll
--------------------------------------------- */
const nav = document.getElementById("nav");
ScrollTrigger.create({
  start: 80,
  end: 99999,
  onUpdate: (self) => {
    nav.classList.toggle("is-scrolled", self.scroll() > 80);
  },
});

/* ---------------------------------------------
   HERO — scale + fade as user scrolls past
--------------------------------------------- */
gsap.fromTo("#heroImg",
  { scale: 1, opacity: 1 },
  {
    scale: 1.08,
    opacity: 0.35,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=100%",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  }
);

gsap.to(".hero__content", {
  y: -60,
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "70% top",
    scrub: true,
  },
});

gsap.from(".hero__content > *", {
  y: 24,
  opacity: 0,
  duration: 1.1,
  stagger: 0.12,
  ease: "power2.out",
  delay: 0.2,
});

/* ---------------------------------------------
   COLLECTION — horizontal scroll-jack (desktop only)
--------------------------------------------- */
function buildCollectionScroll() {
  const track = document.getElementById("collectionTrack");
  if (!track) return;

  const distance = () => track.scrollWidth - window.innerWidth;

  const st = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: ".collection__pin",
      start: "top top",
      end: () => `+=${distance()}`,
      scrub: 0.6,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // subtle scale-up on the piece nearest center as it becomes active
  document.querySelectorAll(".piece__img-wrap img").forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.12 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".piece"),
          containerAnimation: st.scrollTrigger.animation,
          start: "left 90%",
          end: "left 10%",
          scrub: true,
        },
      }
    );
  });
}

if (!isMobile) {
  buildCollectionScroll();
}

/* ---------------------------------------------
   CRAFTSMANSHIP — staggered paragraph reveal
--------------------------------------------- */
gsap.utils.toArray(".craft__para").forEach((para) => {
  gsap.to(para, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: para,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
});

gsap.from(".craft__line", {
  opacity: 0,
  y: 24,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".craft__line",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
});

/* ---------------------------------------------
   CLOSING — fade in
--------------------------------------------- */
gsap.from(".closing > *", {
  opacity: 0,
  y: 20,
  duration: 1,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".closing",
    start: "top 80%",
  },
});

/* ---------------------------------------------
   Recalculate on resize
--------------------------------------------- */
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

/* ---------------------------------------------
   UPGRADE PATH:
   Swap #heroImg's <img> for a <canvas>/WebGL <div id="heroCanvas">
   mounted with Three.js / React Three Fiber, and drive its camera
   rotation off the same ScrollTrigger progress used above for
   .hero__img-wrap — the scroll math here (scale 1 → 1.08, opacity
   1 → 0.3 over "top top" to "bottom top") maps directly to a
   camera dolly + fade if you later render the gown as a 3D model.
--------------------------------------------- */
