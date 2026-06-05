export default function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4">
      {/* pill label */}
      <span className="neo-pill mb-6">Anchor Counter</span>

      {/* the number */}
      <div
        className="neo-surface counter-box flex items-center justify-center"
        aria-live="polite"
      >
        <span className="counter-value select-none">--</span>
      </div>

      {/* tagline */}
      <p className="mt-5 max-w-[36ch] text-center font-mono text-sm font-bold uppercase leading-relaxed tracking-wide opacity-80">
        On-chain counter built with Anchor on Solana.
      </p>

      {/* buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button className="neo-btn neo-btn--init" disabled>
          Initialize
        </button>
        <button className="neo-btn neo-btn--dec" disabled>
          &minus;
        </button>
        <button className="neo-btn neo-btn--inc" disabled>
          +
        </button>
      </div>
    </main>
  );
}
