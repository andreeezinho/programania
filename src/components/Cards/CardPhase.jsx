import { Link } from "react-router-dom";

export default function CardPhase({
  uuid,
  name,
  amount,
  image,
  onDetails,
  difficulty = "Fácil",
  status = "Completo",
  ...props
}) {
  const Container = onDetails ? 'button' : Link;
  return (
    <Container
      {...(onDetails ? { type: "button", onClick: onDetails } : { to: `/phases/${uuid}` })}
      className="block w-full max-w-[260px] text-left cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#78933f]"
      {...props}
    >
      <div className="flex min-h-[130px] overflow-hidden rounded-md border border-[#deded8] bg-white shadow-[0_3px_4px_rgba(0,0,0,0.18)] transition hover:shadow-md">
        <div className="w-[82px] shrink-0 bg-[#f2f2ef]">
          {image && (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-4 py-3">
          <span className="text-[10px] text-[#6f7759]">
            {difficulty}
          </span>

          <h2 className="mt-1 truncate text-xs font-bold text-[#45483d]">
            {name}
          </h2>

          <p className="mt-1 text-[9px] text-[#77796f]">
            {amount} desafios
          </p>

          <div className="mt-1 flex items-center gap-1 text-[9px] text-[#f2635d]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f2635d]" />
            {status}
          </div>

          <div className="mt-auto border-t border-[#d9dacd] pt-2">
            <span className="inline-block rounded-full bg-[#78933f] px-3 py-1 text-[8px] font-bold text-white">
              Detalhes
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
