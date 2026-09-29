
import bannerImage from "../../assets/megafone.png";

export default function Banner() {
  return (
    <div className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-2xl bg-[#E66255] px-6 py-5 shadow-sm md:px-8">

      {/* Textos */}
      <div className="min-w-0 flex-1 space-y-3">
        <h1 className="font-mono text-base leading-relaxed text-white md:text-lg lg:text-xl">
          Procure{" "}
          <span className="font-bold">soluções</span>
          {" "}para os nossos{" "}
          <span className="font-bold">desafios</span>
          <br />
          e se{" "}
          <span className="font-bold text-[#FACC15]">
            divirta
          </span>
          {" "}ao mesmo tempo!
        </h1>

        <p className="font-mono text-[10px] text-white md:text-xs">
          Com o{" "}
          <span className="font-bold text-[#FACC15]">
            Programania
          </span>
          , você aprenderá a{" "}
          <span className="font-bold">programar</span>
          {" "}de forma{" "}
          <span className="font-bold">prática</span>!
        </p>
      </div>

      {/* Megafone */}
      <img
  src={bannerImage}
  alt="Megafone"
  className="h-auto w-24 shrink-0 object-contain sm:w-28 md:w-36"
/>

    </div>
  );
}
