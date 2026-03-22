import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { ButtonType } from "../constants/buttons";
import type { Unsubscribe } from "firebase/firestore";

export type ReportItem = {
  id: string;
  name: string;
  category: ButtonType;
  report: string;
  address: string;
  /** Data de criação do relato (para filtros por dia/mês/ano) */
  createdAt?: Date | null;
  latitude?: number | null;
  longitude?: number | null;
  /** true = usuário ainda está enviando localização; false ou undefined = parou ou nunca enviou em tempo real */
  locationUpdatesActive?: boolean;
  /** Preenchido quando o usuário para o envio de localização (para notificar o policial) */
  locationStoppedAt?: Date | null;
  /** Quando o policial marcou a ocorrência como concluída no painel (home). */
  concludedAt?: Date | null;
  /** Nome do policial logado que concluiu (campo `concludedByOfficerName` no Firestore). */
  concludedByOfficerName?: string | null;
};

function parseTimestamp(v: unknown): Date | null {
  if (!v || typeof v !== "object") return null;
  const o = v as { seconds?: number; toDate?: () => Date };
  if (typeof o.toDate === "function") return o.toDate();
  if (typeof o.seconds === "number") return new Date(o.seconds * 1000);
  return null;
}

export function subscribeReports(
  callback: (reports: ReportItem[]) => void
): Unsubscribe {
  const unsubscribe = onSnapshot(collection(db, "data"), (querySnapshot) => {
    const reports: ReportItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      reports.push({
        id: docSnap.id,
        name: data.name,
        category: data.category,
        report: data.report,
        address: data.address,
        createdAt: parseTimestamp(data.createdAt),
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        locationUpdatesActive: data.locationUpdatesActive === true,
        locationStoppedAt: parseTimestamp(data.locationStoppedAt),
        concludedAt: parseTimestamp(data.concludedAt),
        concludedByOfficerName:
          typeof data.concludedByOfficerName === "string"
            ? data.concludedByOfficerName.trim() || null
            : null,
      });
    });
    reports.sort((a, b) => {
      const ta = a.createdAt?.getTime() ?? 0;
      const tb = b.createdAt?.getTime() ?? 0;
      return tb - ta;
    });
    callback(reports);
  });

  return unsubscribe;
}

/** Marca o relato como concluído (data/hora + nome do policial no Firestore). Requer regras que permitam update por policial. */
export async function concludeReport(
  reportId: string,
  officerDisplayName: string
): Promise<void> {
  const name = officerDisplayName.trim() || "Policial";
  await updateDoc(doc(db, "data", reportId), {
    concludedAt: serverTimestamp(),
    concludedByOfficerName: name,
  });
}
