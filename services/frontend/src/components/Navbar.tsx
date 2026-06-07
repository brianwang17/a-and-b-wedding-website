type SectionKey = 'about' | 'event' | 'faqs' | 'gallery' | 'rsvp';

interface Props {
  onSectionClick: (section: SectionKey) => void;
}

const links: { label: string; section: SectionKey }[] = [
  { label: 'About Us', section: 'about' },
  { label: 'Event Info', section: 'event' },
  { label: 'FAQs', section: 'faqs' },
  { label: 'Gallery', section: 'gallery' },
];

export default function Navbar({ onSectionClick }: Props) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm border border-gold rounded-full px-6 py-3 flex items-center gap-6 shadow-sm">
      {links.map(({ label, section }) => (
        <button
          key={section}
          onClick={() => onSectionClick(section)}
          className="text-sm text-gray-700 hover:text-forest transition-colors whitespace-nowrap cursor-pointer bg-transparent border-0"
        >
          {label}
        </button>
      ))}
      <button
        onClick={() => onSectionClick('rsvp')}
        className="bg-[#1A1A1A] text-white text-sm px-5 py-2 rounded-full hover:bg-black transition-colors cursor-pointer border-0 whitespace-nowrap"
      >
        RSVP
      </button>
    </nav>
  );
}
