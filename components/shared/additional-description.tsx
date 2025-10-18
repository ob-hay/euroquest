interface AdditionalDescriptionProps {
  title: string;
  additional_description: string;
}
export default function AdditionalDescription({
  additional_description,
  title,
}: AdditionalDescriptionProps) {
  return (
    <section className="md:mx-auto w-full md:w-[90%] md:pb-12 pb-10">
      <div className="bg-[#f8fafc] p-8 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="overview-content">
          <h2 className="text-[28px] text-[#2d3748] mb-5 border-l-4 border-[#3e5ec0] pl-3 font-semibold">
            {title}
          </h2>
          <div className="overview-text">
            <div
              className="text-[#4a5568] text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: additional_description,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
