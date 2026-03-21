function Pill({ show = false }) {
  if (show) {
    return (
      <div className="flex items-center bg-blue-600/20 border border-blue-600 py-1 px-4 rounded-full mb-2">
        <img src={`${import.meta.env.BASE_URL}landing/Sparkles.svg`} className="mr-2 h-5" />
        <p className="text-blue-400 text-xs font-bold">Popular</p>
      </div>
    );
  }
}

function FeatureItem({ feature }) {
  if (feature != undefined) {
    return (
      <li className="flex items-center text-gray-300">
        <img src={`${import.meta.env.BASE_URL}landing/Done.svg`} className="h-5 mr-3" />
        {feature}
      </li>
    );
  }
}

export default function PricingCard({
  plan,
  isPopular,
  description,
  cost,
  pages,
  feature2,
  feature3,
  feature4,
  feature5,
  onAction,
  actionLabel,
}) {
  // Card color logic
  let cardBg = "bg-[#181818] border border-gray-800";
  let textColor = "text-white";
  let priceColor = "text-blue-400";
  let border = "";
  let scale = "";

  if (isPopular) {
    cardBg = "bg-[#232323] border-2 border-blue-600";
    scale = "md:scale-105 shadow-2xl";
  }

  return (
    <div
      className={`rounded-xl shadow-lg p-6 sm:p-8 flex-1 flex flex-col items-center ${cardBg} ${scale} font-[Heebo] w-full max-w-[23rem]`}
    >
      <Pill show={isPopular} />
      <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${textColor}`}>{plan}</h2>
      <p className="text-gray-400 mb-4 text-center text-sm sm:text-base">{description}</p>
      <div className={`text-3xl sm:text-4xl font-bold mb-6 ${priceColor}`}>
        {cost ? (
          <>
            ${cost}
            <span className="text-lg text-gray-400 font-normal">/mo</span>
          </>
        ) : (
          "Contact Us"
        )}
      </div>
      <ul className="text-gray-300 mb-8 space-y-2 text-center w-full text-sm sm:text-base">
        <FeatureItem feature={`${pages} rate data transfer`} />
        <FeatureItem feature={feature2} />
        <FeatureItem feature={feature3} />
        <FeatureItem feature={feature4} />
        <FeatureItem feature={feature5} />
      </ul>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition w-full mt-auto"
        onClick={onAction}
      >
        {actionLabel || (cost ? "Get Started" : "Contact Sales")}
      </button>
      
    </div>
  );
}