/**
 * Texto relativo em português a partir da data de criação do relato.
 * Prioriza minutos quando < 1 h; depois horas e dias.
 */
export function formatRelativeTimePtBR(date: Date | null | undefined): string {
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "—";
  }
  const diff = Date.now() - date.getTime();
  if (diff < 0) return "Agora";

  const minutesTotal = Math.floor(diff / 60_000);
  if (minutesTotal < 1) return "Há menos de 1 minuto";
  if (minutesTotal === 1) return "Há 1 minuto";
  if (minutesTotal < 60) return `Há ${minutesTotal} minutos`;

  const hoursTotal = Math.floor(minutesTotal / 60);
  if (hoursTotal < 24) {
    return hoursTotal === 1 ? "Há 1 hora" : `Há ${hoursTotal} horas`;
  }

  const daysTotal = Math.floor(hoursTotal / 24);
  return daysTotal === 1 ? "Há 1 dia" : `Há ${daysTotal} dias`;
}
