import { useEffect, useState, useMemo } from "react";
import FilterDate from "../../components/FilterDate";
import { BlockVictimReport } from "../../components/BlockVictimReport";
import { subscribeReports, type ReportItem } from "../../services/reportService";
import PopUp from "../../components/PopUp";
import FilterAddress from "../../components/FilterAddress";
import SearchReport from "../../components/SearchReport";
import FilterReport from "../../components/FilterReport";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const [report, setReport] = useState('');
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeReports((reports) => {
      setReports(reports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openPopUp = (report: ReportItem) => {
    setSelectedReport(report);
  };

  const closePopUp = () => {
    setSelectedReport(null);
  };

  function handleToHome() {
    navigate("/home");
  }

  const filteredReports = useMemo(() => {
    const q = report.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter((item) =>
      item.report?.toLowerCase().includes(q)
    );
  }, [reports, report]);

  return (
    <section className="w-full min-h-screen flex flex-col overflow-x-hidden [scrollbar-color:var(--color-dark-gray)_var(--color-white)]">
      <SearchReport report={report} reportChange={setReport} />

      <div className="flex flex-shrink-0 p-2.5 md:p-4">
        <button
          type="button"
          onClick={handleToHome}
          className="border-none text-white bg-primary py-2 px-4 rounded-lg font-bold cursor-pointer text-sm md:text-base"
        >
          Voltar a tela inicial
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-center gap-4 lg:gap-16 p-4 flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col items-stretch md:items-start gap-3 flex-shrink-0">
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            <FilterDate data="Dia" value={day} setValue={setDay} />
            <FilterDate data="Mês" value={month} setValue={setMonth} />
            <FilterDate data="Ano" value={year} setValue={setYear} />
          </div>
          <FilterAddress data="Nome" />
          <FilterAddress data="Endereço" />
          <FilterReport />
        </div>

        <div className="flex flex-col items-center gap-2 overflow-y-auto overflow-x-hidden min-h-0 flex-1">
          {loading ? (
            <div className="py-8">Carregando...</div>
          ) : filteredReports.length === 0 ? (
            report.trim() ? (
              <div className="text-center py-4">{`Nenhum relato encontrado para "${report.trim()}"`}</div>
            ) : (
              <div className="text-center py-4">Nenhum relato encontrado.</div>
            )
          ) : (
            filteredReports.map((item) => (
              <BlockVictimReport
                key={item.id}
                name={item.name}
                category={item.category}
                report={item.report}
                address={item.address}
                onClick={() => openPopUp(item)}
              />
            ))
          )}
        </div>
      </div>

      {selectedReport && (
        <PopUp report={selectedReport} onClose={closePopUp} />
      )}
    </section>
  );
}
