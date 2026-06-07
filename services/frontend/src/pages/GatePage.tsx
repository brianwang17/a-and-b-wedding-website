import { useState, useEffect } from "react";

interface Props {
  onAuthenticated: (name: string) => void;
}

const FALLBACK_CODE = import.meta.env.VITE_INVITATION_CODE ?? "password";

// Each entry: [text, ms-per-char, ms-pause-after-line-finishes]
const LINES = [
  ["WE ARE GETTING MARRIED!", 65, 150],
  ["YOU ARE INVITED", 55, 80],
  ["TO THE WEDDING OF", 55, 300],
  ["BRIAN & ALLISON", 95, 500],
] as const;

export default function GatePage({ onAuthenticated }: Props) {
  const [chars, setChars] = useState([0, 0, 0, 0]);
  const [phase, setPhase] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);

  const [step, setStep] = useState<"code" | "name">("code");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [opening, setOpening] = useState(false);

  // ── Typewriter engine ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase >= LINES.length) {
      const t = setTimeout(() => setCardVisible(true), 400);
      return () => clearTimeout(t);
    }

    const [text, speed, pause] = LINES[phase];
    const shown = chars[phase];

    if (shown >= text.length) {
      const t = setTimeout(() => setPhase((p) => p + 1), pause);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setChars((prev) => {
        const next = [...prev] as typeof prev;
        next[phase] = (prev[phase] + 1) as (typeof prev)[number];
        return next;
      });
    }, speed);
    return () => clearTimeout(t);
  }, [phase, chars]);

  const skip = () => {
    if (cardVisible) return;
    setChars([
      LINES[0][0].length,
      LINES[1][0].length,
      LINES[2][0].length,
      LINES[3][0].length,
    ]);
    setPhase(LINES.length);
    setCardVisible(true);
  };

  // ── Auth logic ───────────────────────────────────────────────────────────
  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json();
      if (data.valid) setStep("name");
      else setError("Invalid code. Check your invitation.");
    } catch {
      if (code.trim().toUpperCase() === FALLBACK_CODE.toUpperCase())
        setStep("name");
      else setError("Invalid code. Check your invitation.");
    } finally {
      setLoading(false);
    }
  }

  function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setOpening(true);
    // Let the zoom animation play before handing off to MainSite
    setTimeout(() => onAuthenticated(name.trim()), 950);
  }

  // ── Render ───────────────────────────────────────────────────────────────
  const cursor = (lineIdx: number) =>
    phase === lineIdx ? <span className="typewriter-cursor">|</span> : null;

  return (
    <div
      className="min-h-screen bg-cream flex flex-col items-center justify-center px-6"
      onClick={skip}
    >
      <div className="text-center mb-10">
        {/* Line 0 */}
        <div className="mb-6 h-12">
          <p className="text-forest font-semibold text-3xl tracking-[0.25em] uppercase">
            {LINES[0][0].slice(0, chars[0])}
            {cursor(0)}
          </p>
        </div>

        {/* Lines 1 + 2 */}
        <div className="mb-6 h-20">
          <p className="text-sage text-2xl tracking-[0.3em] uppercase leading-10">
            {LINES[1][0].slice(0, chars[1])}
            {cursor(1)}
            {chars[2] > 0 && (
              <>
                <br />
                {LINES[2][0].slice(0, chars[2])}
                {cursor(2)}
              </>
            )}
          </p>
        </div>

        {/* Line 3 — BRIAN & ALLISON */}
        <div className="min-h-[1.1em]">
          <h1
            className="text-forest font-bold uppercase tracking-[0.12em] leading-none"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "clamp(48px, 8vw, 96px)",
            }}
          >
            {chars[3] > 0 ? (
              <>
                {LINES[3][0].slice(0, chars[3])}
                {phase === 3 && (
                  <span
                    className="typewriter-cursor font-thin"
                    style={{ fontSize: "0.65em" }}
                  >
                    |
                  </span>
                )}
              </>
            ) : (
              " "
            )}
          </h1>
        </div>
      </div>

      {/*
        Card — three-layer structure:
        1. Zoom wrapper: handles fade-in on arrival + zoom-out on opening
        2. Perspective wrapper: establishes 3D perspective for children
        3. Flip inner: rotates 180° when going from code→name step
        4. Front face: code form (face 0, no rotation)
        5. Back face: name form (face 1, pre-rotated 180° so it shows correctly after flip)
      */}
      <div
        className={opening ? "card-zoom-opening" : ""}
        style={
          !opening
            ? { opacity: cardVisible ? 1 : 0, transition: "opacity 0.7s" }
            : {}
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Perspective container */}
        <div
          style={{
            perspective: "1200px",
            width: "min(28rem, calc(100vw - 3rem))",
          }}
        >
          {/* Flip inner — the element that physically rotates */}
          <div
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: step === "name" ? "rotateY(180deg)" : "rotateY(0deg)",
              position: "relative",
              // min-height must accommodate the taller of the two faces
              minHeight: "340px",
            }}
          >
            {/* ── FRONT FACE — Enter Your Code ──────────────────────── */}
            <div
              className="absolute inset-0 border border-gold bg-white"
              style={{ backfaceVisibility: "hidden" }}
            >
              <form
                onSubmit={handleCodeSubmit}
                className="px-8 py-10 flex flex-col h-full"
              >
                <h2 className="text-center text-sage text-xs tracking-[0.3em] uppercase mb-10">
                  Enter Your Invitation Code
                </h2>
                <label className="block text-forest text-xs tracking-widest uppercase mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    tabIndex={step === "code" ? undefined : -1}
                    className="w-full bg-[#3D5A45] rounded-full px-6 py-3 pr-12 text-white outline-none"
                  />
                  <button
                    type="button"
                    tabIndex={step === "code" ? undefined : -1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-0"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                <p className="text-sage text-xs mt-4">
                  Check your invitation for the code. Need help?{" "}
                  <a href="mailto:brianwang17@gmail.com" className="underline">
                    Contact us
                  </a>
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 w-full bg-forest text-white py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#1e3326] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Checking…" : "Continue"}
                </button>
              </form>
            </div>

            {/* ── BACK FACE — Enter Your Name ───────────────────────── */}
            {/* Pre-rotated 180° so it faces forward after the flip */}
            <div
              className="absolute inset-0 border border-gold bg-white"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <form
                onSubmit={handleNameSubmit}
                className="px-8 py-10 flex flex-col h-full"
              >
                <h2 className="text-center text-sage text-xs tracking-[0.3em] uppercase mb-1">
                  You're In
                </h2>
                <p className="text-center text-sage text-xs mb-10">
                  Enter your name as stated on the invitation
                </p>
                <label className="block text-forest text-sm tracking-wide mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  tabIndex={step === "name" ? undefined : -1}
                  className="w-full bg-[#3D5A45] rounded-full px-6 py-3 text-white outline-none"
                />
                <button
                  type="submit"
                  className="mt-8 w-full bg-forest text-white py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#1e3326] transition-colors cursor-pointer"
                >
                  Open Invitation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {!cardVisible && (
        <p className="mt-6 text-sage/40 text-xs tracking-widest select-none">
          click anywhere to skip
        </p>
      )}
    </div>
  );
}
