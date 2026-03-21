type FilterAddressProps = {
  data: string;
  value: string;
  onChange: (value: string) => void;
};

export default function FilterAddress({ data, value, onChange }: FilterAddressProps) {
  return (
    <div className="flex flex-col items-stretch w-full min-w-0">
      <p className="text-xs text-[#6f7787] uppercase">{data}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 py-2 px-3 rounded-lg border border-[#d7dce5] w-full min-w-0 text-sm bg-[#f7f9fc] outline-none"
      />
    </div>
  );
}
