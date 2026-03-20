import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { BlockVictim } from "../../components/BlockVictim";
import type { ButtonType } from "../../constants/buttons";
import { subscribeReports, type ReportItem } from "../../services/reportService";
import PopUp from "../../components/PopUp";

export const Home = () => {
  const [active, setActive] = useState<ButtonType>("Violência doméstica");
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeReports((reports) => {
      setReports(reports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredReports = reports.filter((report) => report.category === active);

  const openPopUp = (report: ReportItem) => {
    setSelectedReport(report);
  };

  const closePopUp = () => {
    setSelectedReport(null);
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      <Menu active={active} setActive={setActive} />
      <div className="flex flex-1 flex-col items-center gap-4 overflow-y-auto overflow-x-hidden min-h-0 p-4 bg-gray w-full md:w-[80%]">
        {loading ? (
          <div className="py-8">Carregando...</div>
        ) : (
          filteredReports.map((item) => (
            <BlockVictim
              onClick={() => openPopUp(item)}
              key={item.id}
              name={item.name}
              category={item.category}
              report={item.report}
              address={item.address}
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
