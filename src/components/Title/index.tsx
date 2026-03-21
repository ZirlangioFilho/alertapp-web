import Icon from '../../assets/shield-title.svg'

type TitleProp = {
  title: string;
}

export default function Title({ title }: TitleProp) {
  return (
    <div className="flex flex-row items-center justify-center md:justify-start w-full flex-wrap">
      <img src={Icon} alt="" className="mr-[-16px] w-8 md:w-9 shrink-0" />
      <h1 className="text-[#1a2234] text-lg md:text-[22px] font-semibold cursor-default">
        {title}
      </h1>
    </div>
  );
}
