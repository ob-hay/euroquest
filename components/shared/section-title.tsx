interface SectionTitleProps {
  title: string;
  highlight: string;
  description?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  highlight,
  description,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`${className}`}>
      <h2 className="text-2xl md:text-4xl font-bold flex flex-row items-start md:items-center gap-1 md:gap-2">
        <span className="text-black">{title}</span>
        <div className="relative inline-block">
          <span className="text-[#3E5EC0] relative">{highlight}</span>
          <img
            src="/assets/images/line.svg"
            alt=""
            className="absolute -bottom-2 left-0 w-full h-auto"
          />
        </div>
      </h2>
      <p className="text-[#7C7B7B] mt-2 md:text-base text-sm">{description}</p>
    </div>
  );
}
