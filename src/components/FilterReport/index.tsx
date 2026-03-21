export type ReportCategoryFilter = "todos" | "Sos" | "abertos";

type FilterReportProps = {
  value: ReportCategoryFilter;
  onChange: (value: ReportCategoryFilter) => void;
};

const options: { id: ReportCategoryFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "Sos", label: "Sos violência" },
  { id: "abertos", label: "Relatos" },
];

export default function FilterReport({ value, onChange }: FilterReportProps) {
  return (
    <div className="flex flex-col gap-2 mt-1">
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className="flex flex-row-reverse items-center bg-transparent border-none text-left justify-end sm:justify-start gap-2 sm:gap-3 w-full"
        >
          <div className="flex w-5 h-5 rounded-full border-2 border-[#7f8794] items-center justify-center shrink-0">
            {value === id && <div className="w-2.5 h-2.5 rounded-full bg-[#1e4ecb]" />}
          </div>
          <p className="text-sm text-[#2d3340] cursor-pointer">{label}</p>
        </button>
      ))}
    </div>
  );
}
