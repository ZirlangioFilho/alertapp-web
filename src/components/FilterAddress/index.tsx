type FilterDateProps = {
  data: string;
}

export default function FilterAddress({ data }: FilterDateProps) {
  return (
    <div className="flex flex-col items-stretch w-full min-w-0">
      <p className="text-sm text-black">{data}:</p>
      <input
        type="text"
        className="mt-0.5 py-1.5 px-2 rounded-lg border border-dark-gray w-full min-w-0 text-sm md:text-base"
      />
    </div>
  );
}
