import { useState } from 'react';

interface Props {
  guestName: string;
}

type Step = 'idle' | 'attending' | 'details' | 'done';

export default function RSVPSection({ guestName }: Props) {
  const [step, setStep] = useState<Step>('idle');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [plusOne, setPlusOne] = useState('');
  const [meal, setMeal] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName,
          attending,
          plusOne: plusOne.trim() || null,
          meal: meal || null,
          songRequest: songRequest.trim() || null,
        }),
      });
    } catch {
      // Proceed to success even if backend is down during dev
    } finally {
      setSubmitting(false);
      setStep('done');
    }
  }

  return (
    <section className="bg-cream min-h-screen py-20 px-8 md:px-16">
      <h2
        className="text-forest italic font-light mb-4"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(52px, 6vw, 80px)',
        }}
      >
        rsvp
      </h2>

      {step === 'idle' && (
        <>
          <p className="text-[#3a3a3a] text-sm leading-relaxed max-w-xl mb-10">
            Let us know if you'll be joining us on March 6, 2027. You'll be able to confirm
            your attendance, add a plus one, choose a meal, and request a song.
          </p>
          <button
            onClick={() => setStep('attending')}
            className="bg-forest text-white px-10 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#1e3326] transition-colors cursor-pointer border-0"
          >
            Begin RSVP
          </button>
        </>
      )}

      {step === 'attending' && (
        <div className="border border-gold bg-white px-8 py-10 max-w-md">
          <p
            className="text-forest mb-2 text-lg"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '22px' }}
          >
            Welcome, {guestName}
          </p>
          <p className="text-sage text-xs tracking-widest uppercase mb-8">
            Will you be attending?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => { setAttending(true); setStep('details'); }}
              className="flex-1 bg-forest text-white py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#1e3326] transition-colors cursor-pointer border-0"
            >
              Joyfully Accepts
            </button>
            <button
              onClick={() => { setAttending(false); setStep('details'); }}
              className="flex-1 border border-forest text-forest py-3 rounded-full text-xs tracking-widest uppercase hover:bg-forest/10 transition-colors cursor-pointer bg-transparent"
            >
              Regretfully Declines
            </button>
          </div>
        </div>
      )}

      {step === 'details' && (
        <form onSubmit={handleSubmit} className="border border-gold bg-white px-8 py-10 max-w-md space-y-6">
          {attending && (
            <>
              <div>
                <label className="block text-forest text-xs tracking-widest uppercase mb-2">
                  Plus One Name{' '}
                  <span className="text-sage normal-case tracking-normal">(if applicable)</span>
                </label>
                <input
                  type="text"
                  value={plusOne}
                  onChange={(e) => setPlusOne(e.target.value)}
                  placeholder="Guest name"
                  className="w-full border border-gold px-4 py-2 text-sm outline-none focus:border-forest transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-forest text-xs tracking-widest uppercase mb-2">
                  Meal Preference
                </label>
                <select
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  className="w-full border border-gold px-4 py-2 text-sm outline-none focus:border-forest transition-colors bg-white text-[#3a3a3a] cursor-pointer"
                >
                  <option value="">Select an option</option>
                  <option value="chicken">Chicken</option>
                  <option value="fish">Fish</option>
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-forest text-xs tracking-widest uppercase mb-2">
              Song Request{' '}
              <span className="text-sage normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={songRequest}
              onChange={(e) => setSongRequest(e.target.value)}
              placeholder="Song & artist"
              className="w-full border border-gold px-4 py-2 text-sm outline-none focus:border-forest transition-colors bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-forest text-white py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#1e3326] transition-colors disabled:opacity-60 cursor-pointer border-0"
          >
            {submitting ? 'Sending…' : 'Submit RSVP'}
          </button>
        </form>
      )}

      {step === 'done' && (
        <div className="border border-gold bg-white px-8 py-12 max-w-md text-center">
          {attending ? (
            <>
              <p
                className="text-forest italic text-3xl mb-3"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                We can't wait to celebrate with you!
              </p>
              <p className="text-sage text-sm">See you on March 6, 2027 in Escondido, CA.</p>
            </>
          ) : (
            <>
              <p
                className="text-forest italic text-3xl mb-3"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                We'll miss you!
              </p>
              <p className="text-sage text-sm">Thank you for letting us know.</p>
            </>
          )}
        </div>
      )}
    </section>
  );
}
