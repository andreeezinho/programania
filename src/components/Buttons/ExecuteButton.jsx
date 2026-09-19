import vectorIcon from '../../assets/Vector.png';

/** Botão reutilizável para iniciar a execução de um desafio. */
export default function ExecuteButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[36px] w-[120px] items-center justify-center gap-2 rounded-[18px] bg-[#E36053] font-['Intel_One_Mono',monospace] text-[14px] font-bold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      Executar
      <img src={vectorIcon} alt="" className="h-[15px] w-[14px]" />
    </button>
  );
}
