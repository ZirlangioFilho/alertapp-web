type ButtonProps = {
  text: string;
  onPress: () => void;
}

export default function ButtonConfirm({ text, onPress }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex items-center justify-center w-full min-w-0 max-w-[280px] rounded-xl border-none bg-blue-500 cursor-pointer py-2.5 px-4"
    >
      <span className="text-white text-sm font-bold">{text}</span>
    </button>
  );
}
