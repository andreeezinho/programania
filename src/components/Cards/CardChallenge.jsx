import { Link } from "react-router-dom";

export default function CardChallenge({
  uuid,
  number,
  ...props
}) {
  return (
    <Link
      to={`/challenges/${uuid}`}
      className="block w-[180px]"
      {...props}
    >
      <div className="relative h-[185px] rounded-xl bg-white p-3 shadow-md transition hover:shadow-lg">
        
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7C9445] text-lg font-bold text-white shadow-md">
          {number}
        </div>

        <h2 className="mt-2 text-lg font-bold text-[#7C9445]">
          Desafio {number}
        </h2>

        <p className="mt-2 text-xs font-semibold text-yellow-500">
          Em andamento
        </p>

        <div className="absolute bottom-2 right-2 rounded-full bg-[#F2635D] px-4 py-2 text-sm font-bold text-white shadow-md">
          Entrar →
        </div>

      </div>
    </Link>
  );
}