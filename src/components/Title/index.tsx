import Icon from '../../assets/shield-title.svg'

type TitleProp = {
  title: string;
}

export default function Title({ title }: TitleProp) {
  return (
    <div className="flex flex-row items-center justify-center md:justify-start w-full flex-wrap">
      <img src={Icon} alt="" className="mr-[-20px] w-8 md:w-10 shrink-0" />
      <h1 className="text-black text-lg md:text-[22px] font-bold cursor-default first-letter:text-white">
        {title}
      </h1>
    </div>
  );
}
