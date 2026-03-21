type FilterDateProps = {
  data: string;
  value: number | null;
  setValue: (value: number | null) => void;
}

export default function FilterDate({ data, value, setValue }: FilterDateProps) {
  return (
    <div className="flex items-center justify-between gap-2 min-w-0 w-full">
      <p className="text-xs text-[#6f7787] uppercase shrink-0">{data}</p>
      <input
        type="number"
        value={value ?? ''}
        className="p-2 rounded-lg border border-[#d7dce5] w-16 min-w-0 text-sm bg-[#f7f9fc] outline-none"
        onChange={(e) => {
          const val = e.target.value;
          setValue(val ? parseInt(val, 10) : null);
        }}
      />
    </div>
  );
}
