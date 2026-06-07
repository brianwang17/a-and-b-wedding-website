const UNLOCK_DATE = new Date('2026-12-06');

interface Props {}

export default function EventInfoSection({}: Props) {
  const isUnlocked = new Date() >= UNLOCK_DATE;

  return (
    <section className="bg-cream min-h-screen py-20 px-8 md:px-16 relative">
      <h2
        className="text-forest italic font-light mb-12"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(44px, 5vw, 68px)',
        }}
      >
        Event Info
      </h2>

      {isUnlocked ? (
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Location photo placeholder */}
          <div className="bg-stone-200 aspect-video flex items-center justify-center border border-gold">
            <span className="text-stone-400 text-sm tracking-wider">venue photo</span>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sage text-xs tracking-widest uppercase mb-1">Ceremony</p>
              <p className="text-forest text-lg" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Venue Name TBD
              </p>
              <p className="text-[#3a3a3a] text-sm mt-1">Address TBD</p>
              <p className="text-sage text-sm mt-1">Ceremony begins at TBD</p>
            </div>
            <div>
              <p className="text-sage text-xs tracking-widest uppercase mb-1">Getting There</p>
              <p className="text-[#3a3a3a] text-sm leading-relaxed">
                Parking information and directions will be provided closer to the date.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Locked state */
        <div className="relative">
          {/* Blurred placeholder content */}
          <div className="filter blur-sm opacity-40 pointer-events-none select-none grid md:grid-cols-2 gap-12">
            <div className="bg-stone-200 aspect-video" />
            <div className="space-y-4">
              <div className="h-4 bg-stone-300 rounded w-3/4" />
              <div className="h-4 bg-stone-300 rounded w-1/2" />
              <div className="h-4 bg-stone-300 rounded w-2/3" />
            </div>
          </div>

          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-white/90 border border-gold px-8 py-6 text-center max-w-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-sage mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V7a4.5 4.5 0 10-9 0v3.5M5 10.5h14a1 1 0 011 1v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a1 1 0 011-1z"
                />
              </svg>
              <p
                className="text-forest text-sm italic"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '18px' }}
              >
                Details available December 6, 2026
              </p>
              <p className="text-sage text-xs mt-2 tracking-wide">
                Check back after invitations are sent
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
