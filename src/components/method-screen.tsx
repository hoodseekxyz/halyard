import { Shell } from "@/components/shell";

const STEPS = [
  {
    n: "01",
    title: "Someone deposits the quote",
    body: "On the desks that actually run, that quote is USDG. The deposit mints a share of a vault. The share is the token.",
  },
  {
    n: "02",
    title: "The position lives somewhere else",
    body: "LongX does not hold the stock token. A vault owns a margin account on Lighter. An executor rebalances toward 1×, 3×, or whatever band was set.",
  },
  {
    n: "03",
    title: "The price is a proof, not a guess",
    body: "Net asset value is read from a posted state root. There is no oracle feed and no reporter you trust because they said so.",
  },
  {
    n: "04",
    title: "A pool is only the exit",
    body: "Uniswap is where the token trades. It is not what makes it 5×. If mint and redeem are closed, the pool price can drift away from the vault.",
  },
];

export function MethodScreen() {
  return (
    <Shell>
      <p className="text-sm tracking-widest text-gold uppercase">Method</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl leading-none">Why this desk does not deploy.</h1>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2">
        {STEPS.map((step) => (
          <li key={step.n} className="card">
            <p className="text-sm text-gold">{step.n}</p>
            <h2 className="mt-2 font-display text-2xl leading-tight">{step.title}</h2>
            <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
      <section className="card mt-4">
        <h2 className="font-display text-2xl">What would have to be true</h2>
        <ul className="mt-3 grid gap-2 text-sm leading-relaxed">
          <li>The execution venue already lists that underlying as a perp.</li>
          <li>A vault can prove the account, and withdrawals cannot be redirected.</li>
          <li>The band, the cap, and the rebalance range are fixed in the contract.</li>
          <li>The token name is not the asset. PAXGx5L is not PAXG.</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          None of that is switched on here. Filing a draft does not call a factory. When a venue lists the book, this page is the place the band would open. Until then the cleat stays on.
        </p>
      </section>
    </Shell>
  );
}
