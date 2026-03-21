import { useEffect, useMemo, useState } from "react";
import { formatRelativeTimePtBR } from "../utils/relativeTime";

/**
 * Recalcula o rótulo de tempo a cada minuto para “Há X minutos” acompanhar o relógio.
 */
export function useRelativeTimeLabel(createdAt: Date | null | undefined): string {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => formatRelativeTimePtBR(createdAt), [createdAt, tick]);
}
