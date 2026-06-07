export default function GallerySection() {
  return (
    <section
      className="py-20 px-8 md:px-16 min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #B8CDD4 0%, #C9D8DC 40%, #D4E0E4 70%, #E8EEF0 100%)',
      }}
    >
      <h2
        className="text-forest italic font-light mb-12"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(52px, 6vw, 80px)',
        }}
      >
        gallery
      </h2>

      {/* Placeholder — photos will be added closer to the wedding */}
      <div className="flex-1 flex items-center justify-center">
        <p
          className="text-forest/40 italic text-xl"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          photos coming soon…
        </p>
      </div>
    </section>
  );
}
