import { Link } from "react-router-dom";
import catImage from "../../assets/cat.png";
import foodImage from "../../assets/food.png";

export default function FinishCardModal({ uuid, onBack }) {
  return (
    <div className="relative w-[541px] h-[406px] rounded-[28px] bg-white shadow-lg">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute right-[36px] top-[34px] text-[22px] font-bold text-[#617832]"
      >
        X
      </button>

      <div className="absolute left-[36px] top-[78px]">
        <p className="text-[15px] leading-[22px] tracking-[0.03em] text-[#617832]">
          Parabéns, você conseguiu fazer o{" "}
          <strong className="font-bold">gatinho</strong>
          <br />
          encontrar sua comida!
        </p>

        <p className="mt-[22px] text-[15px] tracking-[0.03em] text-[#617832]">
          <strong className="font-bold">Continue</strong>{" "}
          para a próxima fase
        </p>
      </div>

      <div className="absolute left-1/2 top-[190px] -translate-x-1/2">
  <div className="relative h-[82px] w-[86px]">
    <img
      src={catImage}
      alt="Gatinho"
      className="absolute left-0 top-0 h-[82px] w-[82px] object-contain"
    />

    <img
      src={foodImage}
      alt="Pote de comida"
      className="absolute bottom-[1px] right-[2px] h-[40px] w-[40px] object-contain"
    />
  </div>
</div>

      <div className="absolute bottom-[22px] left-[27px] right-[27px] flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-[140px] rounded-[17px] bg-[#A6A6A6] py-[11px] text-[15px] font-bold text-white shadow-md"
        >
          Voltar
        </button>

        <Link
          to={`/fase/${uuid}`}
          className="w-[140px] rounded-[17px] bg-[#78943B] py-[11px] text-center text-[15px] font-bold text-white shadow-md"
        >
          Continuar
        </Link>
      </div>
    </div>
  );
}