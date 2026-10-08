import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { type Draft, REFERENCE, loadDrafts, saveDrafts } from "@/data/bands";

export function BookScreen() {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  function remove(id: string) {
    const next = drafts.filter((row) => row.id !== id);
    setDrafts(next);
    saveDrafts(next);
  }

  return (
    <Shell>
      <p className="text-sm tracking-widest text-gold uppercase">The book</p>
      <h1 className="mt-2 max-w-xl font-display text-5xl leading-none text-ink sm:text-6xl">
        Hoist a band. The rope is still on the cleat.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        A 1×, 3×, 5× or 7× token is a claim on a perp account, not a name you type.
        Halyard files the request. It does not deploy it.
      </p>
      <div className="mt-6">
        <Link to="/raise" className="action">
          File a draft
        </Link>
      </div>

      <section className="mt-12">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl">Filed here</h2>
          <span className="text-sm text-muted">{drafts.length === 0 ? "Empty" : `${drafts.length} on this browser`}</span>
        </div>
        {drafts.length === 0 ? (
          <p className="card text-muted">No draft yet. Raise one. It stays on this browser and never becomes a contract.</p>
        ) : (
          <ul className="grid gap-3">
            {drafts.map((row) => (
              <li key={row.id} className="card flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl leading-none">{row.symbol}</p>
                  <p className="mt-1 text-sm text-muted">
                    {row.name} · {row.band}× · cap ${row.cap.toLocaleString("en-US")} · {row.underlying}
                  </p>
                </div>
                <button type="button" className="quiet" onClick={() => remove(row.id)}>
                  Pull
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">The shape, elsewhere</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          These three are live on LongX, not here. Figures are public as of 8 Oct 2026. They are a perp wrapper on Lighter, quoted in USDG. Copying the ticker does not copy the position.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="text-xs tracking-widest text-muted uppercase">
              <tr>
                <th className="py-2 pr-3 font-medium">Token</th>
                <th className="py-2 pr-3 font-medium">Band</th>
                <th className="py-2 pr-3 font-medium">Price</th>
                <th className="py-2 pr-3 font-medium">TVL</th>
                <th className="py-2 font-medium">Cap</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE.map((row) => (
                <tr key={row.symbol} className="border-t border-ink/15">
                  <td className="py-3 pr-3">
                    <span className="block font-medium text-ink">{row.symbol}</span>
                    <span className="text-muted">{row.name}</span>
                  </td>
                  <td className="py-3 pr-3">{row.band}×</td>
                  <td className="py-3 pr-3">{row.price}</td>
                  <td className="py-3 pr-3">{row.tvl}</td>
                  <td className="py-3">{row.cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Shell>
  );
}
