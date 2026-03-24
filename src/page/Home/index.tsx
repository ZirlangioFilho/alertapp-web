import { useEffect, useMemo, useState } from "react";
import { Menu } from "../../components/Menu";
import { BlockVictim } from "../../components/BlockVictim";
import type { ButtonType } from "../../constants/buttons";
import {
  subscribeReports,
  concludeReport,
  type ReportItem,
} from "../../services/reportService";
import PopUp from "../../components/PopUp";
import { useOfficerDisplayName } from "../../hooks/useOfficerDisplayName";
import {
  matchesCreatedAtFilters,
  matchesTextTokens,
  parseSearchQuery,
} from "../../utils/reportFilters";

export const Home = () => {
  const [active, setActive] = useState<ButtonType>("Violência doméstica");
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [seenViolenciaIds, setSeenViolenciaIds] = useState<Set<string>>(new Set());
  const [seenRelatoIds, setSeenRelatoIds] = useState<Set<string>>(new Set());

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const officerName = useOfficerDisplayName();

  const searchParsed = useMemo(() => parseSearchQuery(searchQuery), [searchQuery]);

  useEffect(() => {
    const unsubscribe = subscribeReports((reports) => {
      setReports(reports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (active === "Violência doméstica") {
      const ids = reports
        .filter((r) => r.category === "Violência doméstica")
        .map((r) => r.id);
      if (ids.length === 0) return;
      setSeenViolenciaIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.add(id));
        return next;
      });
      return;
    }
    const ids = reports
      .filter((r) => r.category === "Relato de problemas")
      .map((r) => r.id);
    if (ids.length === 0) return;
    setSeenRelatoIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  }, [active, reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      if (item.category !== active) return false;
      /** Na home só aparecem ocorrências ainda não concluídas (concluídas vão ao relatório com data). */
      if (item.concludedAt) return false;
      if (!matchesCreatedAtFilters(item, searchParsed.day, searchParsed.month, searchParsed.year)) {
        return false;
      }
      if (!matchesTextTokens(item, searchParsed.textTokens)) return false;
      return true;
    });
  }, [reports, active, searchParsed]);

  const { unreadViolencia, unreadRelato } = useMemo(() => {
    const violencia = reports.filter(
      (r) =>
        r.category === "Violência doméstica" &&
        !r.concludedAt &&
        !seenViolenciaIds.has(r.id)
    ).length;
    const relato = reports.filter(
      (r) =>
        r.category === "Relato de problemas" &&
        !r.concludedAt &&
        !seenRelatoIds.has(r.id)
    ).length;
    return {
      unreadViolencia: active === "Relato de problemas" ? violencia : 0,
      unreadRelato: active === "Violência doméstica" ? relato : 0,
    };
  }, [reports, active, seenRelatoIds, seenViolenciaIds]);

  const openPopUp = (report: ReportItem) => {
    setSelectedReportId(report.id);
  };

  const closePopUp = () => {
    setSelectedReportId(null);
  };

  const handleConcludeReport = async (id: string) => {
    // Otimista: remove imediatamente da Home.
    setReports((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              concludedAt: new Date(),
              concludedByOfficerName: officerName || "Policial",
            }
          : item
      )
    );
    try {
      await concludeReport(id, officerName);
    } catch (e) {
      // Reverte em caso de erro.
      setReports((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, concludedAt: null, concludedByOfficerName: null }
            : item
        )
      );
      console.error(e);
      window.alert(
        "Não foi possível marcar como concluído. Verifique sua conexão e as regras do Firestore (update em data/{id})."
      );
    }
  };

  const selectedReport = useMemo(
    () => reports.find((item) => item.id === selectedReportId) ?? null,
    [reports, selectedReportId]
  );

  return (
    <section className="flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-[#eef1f6] md:flex-row">
      <Menu
        active={active}
        setActive={setActive}
        officerName={officerName}
        unreadViolencia={unreadViolencia}
        unreadRelato={unreadRelato}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-4 overflow-y-auto overflow-x-hidden p-4 md:p-8">
        <div className="w-full max-w-[1080px] flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center bg-white rounded-xl border border-[#d7dce5] px-3 w-full shadow-sm flex-1 min-w-0">
              <span className="text-[#7e8aa0] mr-2 shrink-0">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar: palavras (ex: socorro)"
                className="flex-1 min-w-0 py-3 px-0 text-sm md:text-base bg-transparent outline-none"
              />
            </div>
          </div>
          <p className="text-xs text-[#64748b] px-1">
            Busca no <strong>texto do relato</strong>, <strong>nome</strong> e <strong>endereço</strong>. Número
            inicial 1–31 filtra pelo <strong>dia do mês</strong> (relatos com data de registro).
          </p>
        </div>
        {loading ? (
          <div className="py-8 text-[#1b365d] font-semibold">Carregando...</div>
        ) : filteredReports.length === 0 ? (
          <div className="py-12 px-4 text-center max-w-lg rounded-2xl border border-dashed border-[#cbd5e1] bg-white/80">
            <p className="text-[#334155] font-medium">Nenhum relato encontrado com os filtros atuais.</p>
            <p className="text-sm text-[#64748b] mt-2">
              Tente outras palavras na busca ou confira a aba de categoria no menu. Relatos sem data de
              registro não entram em filtros por dia.
            </p>
          </div>
        ) : (
          filteredReports.map((item) => (
            <BlockVictim
              id={item.id}
              onClick={() => openPopUp(item)}
              onConclude={handleConcludeReport}
              key={item.id}
              name={item.name}
              category={item.category}
              report={item.report}
              address={item.address}
              latitude={item.latitude}
              longitude={item.longitude}
              locationUpdatesActive={item.locationUpdatesActive}
              locationStoppedAt={item.locationStoppedAt}
              createdAt={item.createdAt}
            />
          ))
        )}
      </div>

      {selectedReport && (
        <PopUp report={selectedReport} onClose={closePopUp} />
      )}
    </section>
  );
}
