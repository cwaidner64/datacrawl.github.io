function GlowDot({ className = "" }) {
  return (
    <div
      className={`absolute w-[30px] h-[30px] pointer-events-none z-0 rounded-full bg-[#717070] ${className}`}
      style={{
        boxShadow: "0 0 170.99px 55.57px rgba(255,255,255,0.4)",
        opacity: 1,
      }}
    />
  );
}

export default function FeatureCard({
  icon,
  name,
  description,
  glowClass = "",
  glow,
}) {
  return (
    <div className="relative w-full max-w-[28rem] md:max-w-none md:w-100 aspect-[5/3] flex items-center justify-center">
      {glow && <GlowDot className={glowClass} />}

      <div className="bg-[linear-gradient(62deg,_#161616_38%,_#111111_58%,_#111111_87%,_#1D1D1D_100%)] z-10 rounded-xl shadow-lg flex flex-col items-center justify-center border-2 border-[#191919] w-full h-full">

        <div className="w-full h-full p-6 sm:p-8 md:p-14 gap-4 sm:gap-6 md:gap-8 flex flex-col justify-center">
          <div className="text-[#A4A4A4] flex flex-row items-center gap-4 sm:gap-6 ">
            {icon}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-[500] font-inria whitespace-normal md:whitespace-nowrap text-[#A4A4A4]">
              {name}
            </h1>
          </div>
          <p className="text-[#808080] text-sm sm:text-base font-[Heebo]">{description}</p>
        </div>
      </div>
    </div>
  );
}
