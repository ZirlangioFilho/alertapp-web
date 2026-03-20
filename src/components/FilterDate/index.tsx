type FilterDateProps = {
  data: string;
  value: number | null;
  setValue: (value: number | null) => void;
}

export default function FilterDate({ data, value, setValue }: FilterDateProps) {
  return (
    <div className="flex items-center justify-between gap-2 min-w-0 w-full sm:w-auto sm:min-w-[100px]">
      <p className="text-sm text-black shrink-0">{data}:</p>
      <input
        type="number"
        value={value ?? ''}
        className="p-1.5 rounded border border-dark-gray w-14 sm:w-12 min-w-0 text-sm"
        onChange={(e) => {
          const val = e.target.value;
          setValue(val ? parseInt(val, 10) : null);
        }}
      />
    </div>
  );
}
