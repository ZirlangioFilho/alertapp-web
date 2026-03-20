import { useState } from "react";

export default function FilterReport() {
  const [selected, setSelected] = useState("todos");

  const options = [
    { id: "todos", label: "Todos" },
    { id: "Sos", label: "Sos violência" },
    { id: "abertos", label: "Relatos" },
  ] as const;

  return (
    <div className="flex flex-col gap-1">
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => setSelected(id)}
          className="flex flex-row-reverse items-center bg-transparent border-none text-left justify-end sm:justify-center gap-2 sm:gap-3 w-full sm:w-auto"
        >
          <div className="flex w-5 h-5 rounded-full border-2 border-[#333] items-center justify-center shrink-0">
            {selected === id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <p className="text-sm text-black cursor-pointer">{label}</p>
        </button>
      ))}
    </div>
  );
}
