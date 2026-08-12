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
      className="block"
      {...props}
    >
      <div className="flex overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
        <img
          src={image}
          alt={name}
          className="h-40 w-40 object-cover"
        />

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Fácil
            </span>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              {name}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {amount} desafios
            </p>
          </div>

          <div className="mt-4 border-t pt-3">
            <span className="font-medium text-blue-600">
              Detalhes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}