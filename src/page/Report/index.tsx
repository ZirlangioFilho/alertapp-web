import { useEffect, useMemo, useState } from "react";
import FilterDate from "../../components/FilterDate";
import { BlockVictimReport } from "../../components/BlockVictimReport";
import { subscribeReports, type ReportItem } from "../../services/reportService";
import PopUp from "../../components/PopUp";
import FilterAddress from "../../components/FilterAddress";
import SearchReport from "../../components/SearchReport";
import FilterReport, { type ReportCategoryFilter } from "../../components/FilterReport";
import { useNavigate } from "react-router-dom";
import {
  matchesCombinedDateFilters,
  matchesTextTokens,
  parseSearchQuery,
} from "../../utils/reportFilters";
const ITEMS_PER_PAGE = 10;

function categoryMatches(filter: ReportCategoryFilter, item: ReportItem): boolean {
  if (filter === "todos") return true;
  if (filter === "Sos") return item.category === "Violência doméstica";
  if (filter === "abertos") return item.category === "Relato de problemas";
  return true;
}

export default function Report() {
  const [reportSearch, setReportSearch] = useState("");
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [filterName, setFilterName] = useState("");
  const [filterAddress, setFilterAddress] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ReportCategoryFilter>("todos");

  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeReports((reports) => {
      setReports(reports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const searchParsed = useMemo(() => parseSearchQuery(reportSearch), [reportSearch]);

  const filteredReports = useMemo(() => {
    const nameQ = filterName.trim().toLowerCase();
    const addrQ = filterAddress.trim().toLowerCase();

    return reports.filter((item) => {
      if (!categoryMatches(categoryFilter, item)) return false;
      if (!matchesCombinedDateFilters(item, searchParsed, day, month, year)) return false;
      if (nameQ && !item.name?.toLowerCase().includes(nameQ)) return false;
      if (addrQ && !item.address?.toLowerCase().includes(addrQ)) return false;
      if (!matchesTextTokens(item, searchParsed.textTokens)) return false;
      return true;
    });
  }, [reports, categoryFilter, searchParsed, day, month, year, filterName, filterAddress]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const paginatedReports = useMemo(() => {
    const start = safePage * ITEMS_PER_PAGE;
    return filteredReports.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredReports, safePage]);

  useEffect(() => {
    setPage(0);
  }, [categoryFilter, searchParsed, day, month, year, filterName, filterAddress, reportSearch]);

  const openPopUp = (report: ReportItem) => {
    setSelectedReportId(report.id);
  };

  const closePopUp = () => {
    setSelectedReportId(null);
  };

  function handleToHome() {
    navigate("/home");
  }

  const clearFilters = () => {
    setReportSearch("");
    setDay(null);
    setMonth(null);
    setYear(null);
    setFilterName("");
    setFilterAddress("");
    setCategoryFilter("todos");
  };

  const selectedReport = useMemo(
    () => reports.find((item) => item.id === selectedReportId) ?? null,
    [reports, selectedReportId]
  );

  const hasActiveFilters =
    reportSearch.trim() !== "" ||
    day != null ||
    month != null ||
    year != null ||
    filterName.trim() !== "" ||
    filterAddress.trim() !== "" ||
    categoryFilter !== "todos";

  return (
    <section className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#eef1f6]">
      <SearchReport
        report={reportSearch}
        reportChange={setReportSearch}
        placeholder="Buscar por palavras no relato (ex: agressão)"
      />

      <div className="flex shrink-0 px-4 md:px-8 pb-3 pt-2 items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={handleToHome}
          className="border-none text-white bg-[#1e4ecb] py-2.5 px-5 rounded-xl font-semibold cursor-pointer text-sm shadow-sm hover:bg-[#1a45b8] transition-colors"
        >
          ← Voltar à tela inicial
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-center gap-5 lg:gap-8 px-4 pb-8 md:px-8 flex-1 min-h-0 overflow-hidden">
        <aside className="flex flex-col gap-2 shrink-0 w-full lg:w-[300px] bg-white border border-[#dce1ea] rounded-2xl p-5 h-fit shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[#0f172a] font-bold text-lg">Filtros</h3>
            </div>
          </div>
          <div className="h-px bg-linear-to-r from-transparent via-[#e2e8f0] to-transparent w-full" />

          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold mb-2">
              Tipo de ocorrência
            </p>
            <FilterReport value={categoryFilter} onChange={setCategoryFilter} />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold mb-2">
              Período (data do registro)
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-2 items-center w-full">
              <FilterDate data="Dia" value={day} setValue={setDay} />
              <FilterDate data="Mês" value={month} setValue={setMonth} />
              <FilterDate data="Ano" value={year} setValue={setYear} />
            </div>
          </div>

          <FilterAddress data="Nome" value={filterName} onChange={setFilterName} />
          <FilterAddress data="Endereço" value={filterAddress} onChange={setFilterAddress} />

          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="w-full rounded-xl bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] py-2.5 text-sm font-semibold hover:bg-[#e8eef5] disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
          >
            Limpar filtros
          </button>
        </aside>

        <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden min-h-0 flex-1 rounded-2xl bg-white/60 border border-[#e2e8f0] p-4 md:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 className="text-[#0f172a] font-bold text-lg md:text-xl">Relatório de ocorrências</h2>
            <span className="text-sm text-[#64748b] bg-[#f1f5f9] px-3 py-1 rounded-full">
              {loading ? "…" : `${filteredReports.length} resultado(s)`}
            </span>
          </div>

          {loading ? (
            <div className="py-16 text-center text-[#1b365d] font-semibold">Carregando...</div>
          ) : filteredReports.length === 0 ? (
            <div className="py-16 text-center rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafc]">
              <p className="text-[#334155] font-medium">Nenhum relato encontrado.</p>
              <p className="text-sm text-[#64748b] mt-2">
                Ajuste a busca ou os filtros laterais. Relatos antigos podem não ter data de registro
                — nesse caso os filtros por período não os exibem.
              </p>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {paginatedReports.map((item) => (
                  <li key={item.id}>
                    <BlockVictimReport
                      name={item.name}
                      category={item.category}
                      report={item.report}
                      address={item.address}
                      createdAt={item.createdAt}
                      concludedAt={item.concludedAt}
                      concludedByOfficerName={item.concludedByOfficerName}
                      onClick={() => openPopUp(item)}
                    />
                  </li>
                ))}
              </ul>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-[#e2e8f0]">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={safePage === 0}
                    className="px-4 py-2 rounded-xl font-semibold text-sm bg-[#1e4ecb] text-white hover:bg-[#1a45b8] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1e4ecb] transition-colors"
                  >
                    ← Anterior
                  </button>
                  <span className="text-sm text-[#64748b] font-medium">
                    Página {safePage + 1} de {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={safePage >= totalPages - 1}
                    className="px-4 py-2 rounded-xl font-semibold text-sm bg-[#1e4ecb] text-white hover:bg-[#1a45b8] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1e4ecb] transition-colors"
                  >
                    Próximo →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedReport && <PopUp report={selectedReport} onClose={closePopUp} />}
    </section>
  );
}
