import { useState } from 'react';

interface Props {}

interface FAQ {
  question: string;
  answer: string;
  locked?: boolean;
}

const faqs: FAQ[] = [
  {
    question: 'dress code?',
    answer:
      'Formal / Black tie optional. Think elegant — suits, gowns, cocktail dresses. We love a pop of color if you want to stand out! Please avoid white or ivory.',
  },
  {
    question: 'any stays? (coupon code inside!)',
    answer:
      'We have a room block at a nearby hotel. Details and your exclusive discount code are printed inside your invitation envelope!',
  },
  {
    question: 'tips after feeling tipsy?',
    answer:
      "You're welcome to leave your car overnight in the venue's valet lot — just make sure to grab your keys from valet before midnight. Ride-share back and pick it up the next morning!",
    locked: true,
  },
];

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  const UNLOCK_DATE = new Date('2026-12-06');
  const isLocked = faq.locked && new Date() < UNLOCK_DATE;

  return (
    <div className="border-b border-gold/40 py-5">
      <button
        onClick={() => !isLocked && setOpen((o) => !o)}
        className={`w-full text-left flex items-center justify-between gap-4 bg-transparent border-0 ${
          isLocked ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        <span
          className="text-sage"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(20px, 2.5vw, 28px)',
          }}
        >
          {faq.question}
        </span>

        {isLocked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-sage/50 shrink-0"
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 text-forest/60 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {open && !isLocked && (
        <p className="mt-3 text-[#3a3a3a] text-sm leading-relaxed max-w-2xl">
          {faq.answer}
        </p>
      )}

      {isLocked && (
        <p className="mt-2 text-sage/60 text-xs tracking-wide italic">
          Available after invitations are sent (December 6, 2026)
        </p>
      )}
    </div>
  );
}

export default function FAQsSection({}: Props) {
  return (
    <section className="bg-cream min-h-screen py-20 px-8 md:px-16">
      <h2
        className="text-forest italic font-light mb-12"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(52px, 6vw, 80px)',
        }}
      >
        questions?
      </h2>

      <div className="max-w-3xl">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} faq={faq} />
        ))}
      </div>
    </section>
  );
}
