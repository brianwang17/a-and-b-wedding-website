export default function DateSection() {
  return (
    <section className="bg-cream min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p
        className="text-sage text-sm italic tracking-wide mb-4"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        so please join us on…
      </p>

      <h2
        className="text-forest font-bold uppercase tracking-wide leading-none"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(48px, 7vw, 88px)',
        }}
      >
        March 6, 2027
      </h2>

      <p className="text-sage text-sm tracking-[0.3em] uppercase my-4">In</p>

      <h3
        className="text-forest font-light"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(40px, 6vw, 72px)',
        }}
      >
        Escondido, CA
      </h3>

      <p className="text-sage text-sm tracking-wide mt-6 italic">
        address to be provided soon…
      </p>
    </section>
  );
}
