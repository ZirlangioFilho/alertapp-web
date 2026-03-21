import type { ReportItem } from "../services/reportService";

/** Interpreta a busca: DD/MM/AAAA, ou primeiro número 1–31 como dia, resto como palavras. */
export function parseSearchQuery(query: string): {
  day: number | null;
  month: number | null;
  year: number | null;
  textTokens: string[];
} {
  const q = query.trim();
  if (!q) return { day: null, month: null, year: null, textTokens: [] };

  const slash = q.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?\s*(.*)$/);
  if (slash) {
    const day = parseInt(slash[1], 10);
    const month = parseInt(slash[2], 10);
    const year = slash[3] ? parseInt(slash[3], 10) : null;
    const rest = (slash[4] || "").trim();
    return {
      day,
      month,
      year,
      textTokens: rest ? rest.split(/\s+/).filter(Boolean) : [],
    };
  }

  const tokens = q.split(/\s+/).filter(Boolean);
  let day: number | null = null;
  let start = 0;
  if (tokens.length >= 1 && /^\d{1,2}$/.test(tokens[0])) {
    const d = parseInt(tokens[0], 10);
    if (d >= 1 && d <= 31) {
      day = d;
      start = 1;
    }
  }
  return {
    day,
    month: null,
    year: null,
    textTokens: tokens.slice(start),
  };
}

/** Palavras devem aparecer no nome, relato ou endereço (parcial, sem acento opcional). */
export function matchesTextTokens(item: ReportItem, tokens: string[]): boolean {
  if (tokens.length === 0) return true;
  const hay = `${item.name} ${item.report} ${item.address}`.toLowerCase();
  return tokens.every((t) => hay.includes(t.toLowerCase()));
}

/** Filtro por data do documento (createdAt). */
export function matchesCreatedAtFilters(
  item: ReportItem,
  day: number | null,
  month: number | null,
  year: number | null
): boolean {
  const hasAny = day != null || month != null || year != null;
  if (!hasAny) return true;
  if (!item.createdAt) return false;
  const d = item.createdAt;
  if (day != null && d.getDate() !== day) return false;
  if (month != null && d.getMonth() + 1 !== month) return false;
  if (year != null && d.getFullYear() !== year) return false;
  return true;
}

/**
 * Data: cada filtro não-nulo (busca ou lateral) deve ser satisfeito ao mesmo tempo.
 * Ex.: busca "15 tratos" + mês 3 na lateral → dia 15 e mês 3 e texto "tratos".
 */
export function matchesCombinedDateFilters(
  item: ReportItem,
  searchParsed: ReturnType<typeof parseSearchQuery>,
  sidebarDay: number | null,
  sidebarMonth: number | null,
  sidebarYear: number | null
): boolean {
  const hasAny =
    searchParsed.day != null ||
    searchParsed.month != null ||
    searchParsed.year != null ||
    sidebarDay != null ||
    sidebarMonth != null ||
    sidebarYear != null;

  if (!hasAny) return true;
  if (!item.createdAt) return false;

  const d = item.createdAt;
  const checks: boolean[] = [];
  if (searchParsed.day != null) checks.push(d.getDate() === searchParsed.day);
  if (searchParsed.month != null) checks.push(d.getMonth() + 1 === searchParsed.month);
  if (searchParsed.year != null) checks.push(d.getFullYear() === searchParsed.year);
  if (sidebarDay != null) checks.push(d.getDate() === sidebarDay);
  if (sidebarMonth != null) checks.push(d.getMonth() + 1 === sidebarMonth);
  if (sidebarYear != null) checks.push(d.getFullYear() === sidebarYear);
  return checks.every(Boolean);
}
