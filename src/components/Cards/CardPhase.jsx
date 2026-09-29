
import { Link } from "react-router-dom";

export default function CardPhase({
  uuid,
  name,
  amount,
  image,
  ...props
}) {
  return (
    <Link
      to={`/phases/${uuid}`}
      className="block min-w-0"
      {...props}
    >
      <div className="flex h-[112px] gap-3 overflow-hidden rounded-md bg-white p-2 shadow-md transition hover:shadow-lg">

        {/* Imagem */}
        <div className="h-full w-[34%] shrink-0 bg-[#F4F4F4]">
          {image && (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Informações */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="text-[10px] font-medium text-gray-600">
            Fácil
          </span>

          <h2 className="mt-1 line-clamp-2 text-xs font-bold text-gray-800">
            {name}
          </h2>

          <p className="mt-1 text-[10px] text-gray-600">
            {amount} desafios
          </p>

          <div className="mt-2 border-t border-[#B5C38C] pt-2">
            <span className="inline-block rounded-full bg-[#82964A] px-3 py-1 text-[10px] font-bold text-white">
              Detalhes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
