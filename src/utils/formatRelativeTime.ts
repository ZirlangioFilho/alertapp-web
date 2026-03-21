/**
 * Tempo decorrido em português a partir de `from` até `now`.
 * Ex.: "Há 3 minutos", "Há 2 horas", "Há 5 dias".
 */
export function formatRelativeTimePtBR(
  from: Date | null | undefined,
  now: Date = new Date()
): string {
  if (!from || !(from instanceof Date) || Number.isNaN(from.getTime())) {
    return "—";
  }
  const diffMs = now.getTime() - from.getTime();
  if (diffMs < 0) return "Agora";

  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const days = Math.floor(hr / 24);

  if (sec < 60) return "Há menos de 1 minuto";
  if (min < 60) {
    return `Há ${min} minuto${min !== 1 ? "s" : ""}`;
  }
  if (hr < 24) {
    return `Há ${hr} hora${hr !== 1 ? "s" : ""}`;
  }
  if (days < 7) {
    return `Há ${days} dia${days !== 1 ? "s" : ""}`;
  }
  return from.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
