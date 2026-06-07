import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import OurStorySection from "../components/OurStorySection";
import DateSection from "../components/DateSection";
import EventInfoSection from "../components/EventInfoSection";
import FAQsSection from "../components/FAQsSection";
import RSVPSection from "../components/RSVPSection";
import GallerySection from "../components/GallerySection";

interface Props {
  guestName: string;
}

type NavKey = "about" | "event" | "faqs" | "gallery" | "rsvp";

const NAV_TO_IDX: Record<NavKey, number> = {
  about: 1,
  event: 3,
  faqs: 4,
  rsvp: 5,
  gallery: 6,
};

const TOTAL = 7;

export default function MainSite({ guestName }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Fade in on first render to make the card-zoom handoff seamless
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  const idxRef = useRef(0);
  const transitioning = useRef(false);
  const touchY = useRef(0);

  const goTo = (next: number) => {
    if (transitioning.current) return;
    const clamped = Math.max(0, Math.min(TOTAL - 1, next));
    if (clamped === idxRef.current) return;
    transitioning.current = true;
    idxRef.current = clamped;
    setActiveIdx(clamped);
    setTimeout(() => {
      transitioning.current = false;
    }, 900);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (transitioning.current) return;

      // Don't hijack scroll if user is inside a scrollable element not at its boundary
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const canScroll =
          el.scrollHeight > el.clientHeight + 2 &&
          style.overflowY !== "hidden" &&
          style.overflowY !== "visible";
        if (canScroll) {
          const atBottom =
            el.scrollTop >= el.scrollHeight - el.clientHeight - 2;
          const atTop = el.scrollTop <= 0;
          if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
        }
        el = el.parentElement;
      }

      if (e.deltaY > 20) goTo(idxRef.current + 1);
      else if (e.deltaY < -20) goTo(idxRef.current - 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (transitioning.current) return;
      const delta = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 60) return;
      goTo(idxRef.current + (delta > 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      if (transitioning.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown")
        goTo(idxRef.current + 1);
      else if (e.key === "ArrowUp" || e.key === "PageUp")
        goTo(idxRef.current - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, []); // runs once; all navigation uses refs, not state

  const sections = [
    <HeroSection key="hero" onScrollClick={() => goTo(1)} />,
    <OurStorySection key="about" />,
    <DateSection key="date" />,
    <EventInfoSection key="event" />,
    <FAQsSection key="faqs" />,
    <RSVPSection key="rsvp" guestName={guestName} />,
    <GallerySection key="gallery" />,
  ];

  const onHero = activeIdx === 0;

  return (
    <div
      className="fixed inset-0 overflow-hidden transition-opacity duration-500"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      <Navbar onSectionClick={(key) => goTo(NAV_TO_IDX[key as NavKey] ?? 0)} />

      {sections.map((section, idx) => (
        <div
          key={idx}
          className="absolute inset-0 overflow-y-auto transition-opacity duration-700 ease-in-out"
          style={{
            opacity: idx === activeIdx ? 1 : 0,
            pointerEvents: idx === activeIdx ? "auto" : "none",
          }}
        >
          {section}
        </div>
      ))}

      {/* Progress dots — right edge */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        {sections.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to section ${idx + 1}`}
            className="block rounded-full transition-all duration-300 cursor-pointer border-0 p-0"
            style={{
              width: "6px",
              height: idx === activeIdx ? "16px" : "6px",
              background:
                idx === activeIdx
                  ? onHero
                    ? "rgba(255,255,255,0.9)"
                    : "#2D4A35"
                  : onHero
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(45,74,53,0.25)",
            }}
          />
        ))}
      </div>

      {/* B & A monogram — bottom-left */}
      <div
        className="fixed bottom-6 left-6 z-40 text-sm tracking-widest select-none transition-colors duration-700"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          color: onHero ? "rgba(255,255,255,0.85)" : "#2D4A35",
        }}
      >
        B &amp; A
      </div>
    </div>
  );
}
