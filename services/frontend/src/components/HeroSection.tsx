import heroImg from '../assets/hero.png';

interface Props {
  onScrollClick: () => void;
}

export default function HeroSection({ onScrollClick }: Props) {
  return (
    <section className="relative h-screen w-full overflow-hidden select-none">
      <img
        src={heroImg}
        alt="Brian and Allison"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* subtle dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Couple name */}
      <div className="absolute bottom-28 left-0 right-0 text-center px-4">
        <h1
          className="text-white font-light italic leading-none"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(56px, 8vw, 100px)',
          }}
        >
          Brian &amp; Allison
        </h1>

        <button
          onClick={onScrollClick}
          className="mt-6 flex flex-col items-center gap-1 mx-auto text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-0"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">
            scroll to explore more
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>

      {/* Monogram */}
      <div
        className="absolute bottom-6 left-6 text-white text-sm tracking-widest"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        B &amp; A
      </div>
    </section>
  );
}
