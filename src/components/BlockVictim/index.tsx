import { useState, useEffect } from "react";
import { type ButtonType } from "../../constants/buttons";

type BlockVictimProps = {
  onClick: () => void;
  name: string;
  category: ButtonType;
  report: string;
  address: string;
};

export const BlockVictim = ({ onClick, name, report, address }: BlockVictimProps) => {
  const [check, setCheck] = useState(false);

  const getKey = () => `visto-${name}-${report}-${address}`;

  useEffect(() => {
    const stored = localStorage.getItem(getKey());
    if (stored) setCheck(JSON.parse(stored));
  }, [name, report, address]);

  const switchCheck = () => {
    const newCheck = !check;
    setCheck(newCheck);
    localStorage.setItem(getKey(), JSON.stringify(newCheck));
  };

  return (
    <div
      className={`w-full max-w-[95%] flex flex-col md:flex-row border-none py-2 px-3 items-stretch md:items-center rounded-lg gap-3 md:gap-3 md:text-left text-center
        relative px-6 py-3 rounded-md
before:content-[''] 
before:absolute 
before:left-0 
before:top-0 
before:h-full 
before:w-1.5 
before:bg-primary 
before:rounded-l-md
        ${check ? "bg-primary" : "bg-gray"
        } shadow-[0_5px_10px_var(--color-dark-gray)] min-w-0`}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full md:w-[90%] border-none flex flex-col md:flex-row gap-1 md:gap-3 cursor-pointer bg-transparent text-left md:text-left min-w-0"
      >
        <p className="text-sm md:text-base w-full max-w-full md:max-w-[300px] text-black truncate min-w-0">
          {name}
        </p>
        <p className="text-sm md:text-base w-full max-w-full md:max-w-[300px] text-black truncate min-w-0">
          {report}
        </p>
        <p className="text-sm md:text-base w-full max-w-full md:max-w-[300px] text-black truncate min-w-0">
          {address}
        </p>
      </button>
      <button
        type="button"
        onClick={switchCheck}
        className="border-none bg-primary py-2 px-4 text-white rounded-xl font-bold text-sm md:text-base shrink-0 self-center md:self-auto"
      >
        {check ? "Não visto" : "Visto"}
      </button>
    </div>
  );
};
