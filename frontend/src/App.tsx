import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import idl from "./idl/backend.json";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import { useCallback, useEffect, useState } from "react";
import { Keypair } from "@solana/web3.js";

const COUNTER_KEY = "counter_keypair";

function getOrCreateCounterKeypair(): Keypair {
  const stored = localStorage.getItem(COUNTER_KEY);
  if (stored) {
    return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(stored)));
  }
  const kp = Keypair.generate();
  localStorage.setItem(COUNTER_KEY, JSON.stringify(Array.from(kp.secretKey)));
  return kp;
}

export default function App() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [counterKeypair] = useState(() => getOrCreateCounterKeypair());

  const getProgram = useCallback(() => {
    if (!wallet) return null;
    const provider = new AnchorProvider(connection, wallet);
    return new Program(idl, provider);
  }, [connection, wallet]);

  const fetchCount = useCallback(async () => {
    const program = getProgram();
    if (!program) return;
    try {
      const account = await (program.account as any).counter.fetch(
        counterKeypair.publicKey,
      );
      setCount(Number(account.count));
    } catch {
      setCount(null);
    }
  }, [getProgram, counterKeypair]);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  const logError = (label: string, err: unknown) => {
    const e = err as any;
    console.error(`${label}:`, e?.message ?? String(e));
    if (e?.logs?.length) console.error("Transaction logs:", e.logs);
  };

  const handleInitialize = async () => {
    const program = getProgram();
    if (!program || !wallet) return;
    setLoading(true);
    try {
      await program.methods
        .initialize()
        .accounts({
          user: wallet.publicKey,
          counter: counterKeypair.publicKey,
        })
        .signers([counterKeypair])
        .rpc();
      await fetchCount();
    } catch (err) {
      logError("Initialize failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async () => {
    const program = getProgram();
    if (!program || !wallet) return;
    setLoading(true);
    try {
      await program.methods
        .increment(new BN(1))
        .accounts({
          user: wallet.publicKey,
          counter: counterKeypair.publicKey,
        })
        .rpc();
      await fetchCount();
    } catch (err) {
      logError("Increment failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrement = async () => {
    const program = getProgram();
    if (!program || !wallet) return;
    setLoading(true);
    try {
      await program.methods
        .decrement(new BN(1))
        .accounts({
          user: wallet.publicKey,
          counter: counterKeypair.publicKey,
        })
        .rpc();
      await fetchCount();
    } catch (err) {
      logError("Decrement failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!wallet)
    return (
      <main className="flex min-h-svh flex-col items-center justify-center px-4">
        <WalletMultiButton className="mb-4" />
        <p>Please connect your wallet</p>
      </main>
    );

  const initialized = count !== null;

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4">
      {/* pill label */}
      <WalletMultiButton className="mb-4"></WalletMultiButton>
      <span className="neo-pill mb-6">Anchor Counter</span>

      {/* the number */}
      <div
        className="neo-surface counter-box flex items-center justify-center"
        aria-live="polite"
      >
        <span className="counter-value select-none">
          {initialized ? count : "--"}
        </span>
      </div>

      {/* tagline */}
      <p className="mt-5 max-w-[36ch] text-center font-mono text-sm font-bold uppercase leading-relaxed tracking-wide opacity-80">
        On-chain counter built with Anchor on Solana.
      </p>

      {/* buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          className="neo-btn neo-btn--init"
          disabled={initialized || loading}
          onClick={handleInitialize}
        >
          {loading && !initialized ? "Initializing..." : "Initialize"}
        </button>
        <button
          className="neo-btn neo-btn--dec"
          disabled={!initialized || loading || count === 0}
          onClick={handleDecrement}
        >
          &minus;
        </button>
        <button
          className="neo-btn neo-btn--inc"
          disabled={!initialized || loading}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </main>
  );
}
