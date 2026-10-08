export const BANDS = [1, 3, 5, 7] as const;

export type Band = (typeof BANDS)[number];

export type Draft = {
  id: string;
  name: string;
  symbol: string;
  underlying: string;
  band: Band;
  cap: number;
  filedAt: number;
};

export type ReferenceRow = {
  name: string;
  symbol: string;
  band: Band;
  price: string;
  tvl: string;
  cap: string;
};

/** Public LongX figures as of 8 Oct 2026. Not this desk. */
export const REFERENCE: ReferenceRow[] = [
  {
    name: "OPENAI 1x Long",
    symbol: "OPENAIx1L",
    band: 1,
    price: "$1.05",
    tvl: "$650k",
    cap: "$650k full",
  },
  {
    name: "ANTHROPIC 1x Long",
    symbol: "ANTHROPICx1L",
    band: 1,
    price: "$0.95",
    tvl: "$782k",
    cap: "$780k full",
  },
  {
    name: "NVDA 3x Long",
    symbol: "NVDAx3L",
    band: 3,
    price: "$1.22",
    tvl: "$401k",
    cap: "$560k · 72%",
  },
];

export const CAPS = [100_000, 250_000, 500_000] as const;

const KEY = "paxband.drafts.v1";

export function suggestSymbol(underlying: string, band: Band): string {
  const stem = underlying.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
  if (!stem) return "";
  return `${stem}x${band}L`;
}

export function loadDrafts(): Draft[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Draft[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row) => row && typeof row.symbol === "string" && typeof row.filedAt === "number");
  } catch {
    return [];
  }
}

export function saveDrafts(rows: Draft[]) {
  localStorage.setItem(KEY, JSON.stringify(rows));
}

export function mentionsPaxg(value: string): boolean {
  return /paxg|paxos|gold/i.test(value);
}
