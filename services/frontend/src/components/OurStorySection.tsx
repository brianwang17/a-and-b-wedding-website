import { useState } from 'react';
import { storyItems, type StoryItem } from '../data/storyItems';
import heroImg from '../assets/hero.png';


function StoryCard({ item, size }: { item: StoryItem; size: 'sm' | 'lg' }) {
  const isLarge = size === 'lg';

  if (item.textOnly) {
    return (
      <div
        className={`flex items-center justify-center transition-all duration-500 ${
          isLarge ? 'opacity-100' : 'opacity-40 scale-90'
        }`}
      >
        <p
          className="text-forest italic"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: isLarge ? 'clamp(28px, 3vw, 40px)' : '18px',
          }}
        >
          {item.caption}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#FAFAF5] border border-[#E8E0D0] transition-all duration-500 ${
        isLarge ? 'opacity-100 shadow-md' : 'opacity-50 scale-90'
      }`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.caption}
          className={`w-full object-cover ${isLarge ? 'h-72 md:h-96' : 'h-48 md:h-64'}`}
        />
      ) : (
        /* Placeholder — replace item.image with your actual photo import */
        <div
          className={`w-full bg-stone-200 flex items-center justify-center ${
            isLarge ? 'h-72 md:h-96' : 'h-48 md:h-64'
          }`}
        >
          <span className="text-stone-400 text-xs tracking-wider">photo</span>
        </div>
      )}
      <div className={`px-4 ${isLarge ? 'py-5' : 'py-3'}`}>
        <p
          className={`text-center text-[#3a3a3a] ${isLarge ? 'text-base' : 'text-xs'}`}
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {item.caption}
        </p>
      </div>
    </div>
  );
}

export default function OurStorySection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const count = storyItems.length;

  const prevIdx = (activeIdx - 1 + count) % count;
  const nextIdx = (activeIdx + 1) % count;

  const goNext = () => setActiveIdx(nextIdx);
  const goPrev = () => setActiveIdx(prevIdx);

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Hero photo continues as background behind torn-paper section */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Torn paper top edge */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: 80, display: 'block' }}
        >
          <path
            d="M0,40 C30,15 60,55 90,35 C120,15 150,50 180,30 C210,10 240,48 270,28
               C300,8 330,52 360,32 C390,12 420,50 450,30 C480,10 510,48 540,28
               C570,8 600,50 630,32 C660,14 690,52 720,30 C750,8 780,48 810,28
               C840,8 870,50 900,32 C930,14 960,52 990,30 C1020,8 1050,48 1080,30
               C1110,12 1140,50 1170,30 C1200,10 1230,48 1260,28
               C1290,8 1320,50 1350,32 C1380,14 1410,52 1440,30
               L1440,80 L0,80 Z"
            fill="#F8F4ED"
          />
        </svg>
      </div>

      {/* Main story content — textured paper background */}
      <div
        className="relative"
        style={{
          background: `
            repeating-linear-gradient(45deg, rgba(160,140,120,0.08) 0px, rgba(160,140,120,0.08) 1px, transparent 0px, transparent 50%),
            repeating-linear-gradient(-45deg, rgba(160,140,120,0.08) 0px, rgba(160,140,120,0.08) 1px, transparent 0px, transparent 50%),
            #F8F4ED
          `,
          backgroundSize: '28px 28px, 28px 28px, auto',
        }}
      >
        {/* Torn paper left edge */}
        <div className="absolute left-0 inset-y-0 w-16 overflow-hidden pointer-events-none z-10">
          <svg
            viewBox="0 0 64 1000"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0,0 L64,0 C54,25 60,50 50,75 C60,100 55,125 50,150 C58,175 52,200 48,225
                 C56,250 50,275 54,300 C46,325 52,350 48,375 C56,400 50,425 52,450
                 C44,475 52,500 48,525 C56,550 50,575 46,600 C54,625 48,650 52,675
                 C44,700 50,725 48,750 C56,775 50,800 46,825 C54,850 48,875 52,900
                 C46,925 52,950 48,975 L64,1000 L0,1000 Z"
              fill="#F8F4ED"
            />
          </svg>
        </div>

        {/* Torn paper right edge */}
        <div className="absolute right-0 inset-y-0 w-16 overflow-hidden pointer-events-none z-10">
          <svg
            viewBox="0 0 64 1000"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M64,0 L0,0 C10,25 4,50 14,75 C4,100 9,125 14,150 C6,175 12,200 16,225
                 C8,250 14,275 10,300 C18,325 12,350 16,375 C8,400 14,425 12,450
                 C20,475 12,500 16,525 C8,550 14,575 18,600 C10,625 16,650 12,675
                 C20,700 14,725 16,750 C8,775 14,800 18,825 C10,850 16,875 12,900
                 C18,925 12,950 16,975 L0,1000 L64,1000 Z"
              fill="#F8F4ED"
            />
          </svg>
        </div>

        <div className="px-20 py-14">
          {/* Heading */}
          <h2
            className="text-forest italic font-light mb-12"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(52px, 6vw, 80px)',
            }}
          >
            our story
          </h2>

          {/* Carousel */}
          <div className="relative">
            {/* Prev arrow */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 flex items-center justify-center text-forest/60 hover:text-forest transition-colors cursor-pointer bg-transparent border-0"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next arrow */}
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 flex items-center justify-center text-forest/60 hover:text-forest transition-colors cursor-pointer bg-transparent border-0"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Three-card display */}
            <div className="grid items-start" style={{ gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem' }}>
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <StoryCard item={storyItems[prevIdx]} size="sm" />
                </div>
              </div>
              <div>
                <StoryCard item={storyItems[activeIdx]} size="lg" />
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <StoryCard item={storyItems[nextIdx]} size="sm" />
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {storyItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer border-0 ${
                    i === activeIdx ? 'bg-forest w-4' : 'bg-forest/30'
                  }`}
                  aria-label={`Go to story ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Torn paper bottom edge */}
      <div
        style={{
          background: `
            repeating-linear-gradient(45deg, rgba(160,140,120,0.08) 0px, rgba(160,140,120,0.08) 1px, transparent 0px, transparent 50%),
            repeating-linear-gradient(-45deg, rgba(160,140,120,0.08) 0px, rgba(160,140,120,0.08) 1px, transparent 0px, transparent 50%),
            #F8F4ED
          `,
          backgroundSize: '28px 28px, 28px 28px, auto',
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: 80, display: 'block' }}
        >
          <path
            d="M0,40 C30,65 60,25 90,45 C120,65 150,30 180,50 C210,70 240,32 270,52
               C300,72 330,28 360,48 C390,68 420,30 450,50 C480,70 510,32 540,52
               C570,72 600,30 630,48 C660,66 690,28 720,50 C750,72 780,32 810,52
               C840,72 870,30 900,48 C930,66 960,28 990,50 C1020,72 1050,32 1080,50
               C1110,68 1140,30 1170,50 C1200,70 1230,32 1260,52
               C1290,72 1320,30 1350,48 C1380,66 1410,28 1440,50
               L1440,0 L0,0 Z"
            fill="#F5F0E8"
          />
        </svg>
      </div>
    </section>
  );
}
