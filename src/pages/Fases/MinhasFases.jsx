import { useRef, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import InputSearch from "../../components/Inputs/InputSearch";
import CardPhase from "../../components/Cards/CardPhase";
import { useAuth } from "../../hooks/useAuth";

const phases = [
  {
    uuid: "fase-1",
    name: "Nome da Fase",
    amount: 3,
    difficulty: "Fácil",
    status: "Completo",
  },
  {
    uuid: "fase-2",
    name: "Nome da Fase",
    amount: 3,
    difficulty: "Difícil",
    status: "Completo",
  },
  {
    uuid: "fase-3",
    name: "Nome da Fase",
    amount: 3,
    difficulty: "Fácil",
    status: "Completo",
  },
  {
    uuid: "fase-4",
    name: "Nome da Fase",
    amount: 3,
    difficulty: "Fácil",
    status: "Completo",
  },
  {
    uuid: "fase-5",
    name: "Nome da Fase",
    amount: 3,
    difficulty: "Médio",
    status: "Completo",
  },
];

export default function MinhasFases() {
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedPhase, setSelectedPhase] = useState(null);
  const detailsRef = useRef(null);
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const query = normalize(search);
  const filteredPhases = phases.filter((phase) =>
    normalize(phase.name).includes(query) || normalize(phase.difficulty).includes(query)
  );
  return (
    <main className="min-h-screen bg-[url('/background.png')] p-0 font-intel-one-mono text-[#6f7759] md:p-2">
      <div className="flex min-h-[calc(100vh-1rem)] flex-col gap-4 md:flex-row md:gap-0 md:rounded-md [&>aside]:max-md:w-auto! [&>aside]:max-md:min-h-0! [&>aside]:max-md:mx-2! [&>aside]:md:shrink-0">
        <Sidebar handleLogout={logout} />

        <section className="min-w-0 flex-1 rounded-2xl bg-[#f8f8f6] px-6 py-7 md:px-12 md:py-8">
          <header className="mb-8 border-b border-[#b9bbaa] pb-2 text-sm font-bold">
            <h1>Minhas Fases</h1>
          </header>

          <label className="mb-8 flex justify-center"><span className="sr-only">Buscar fases por nome ou dificuldade</span>
            <InputSearch
                type="search"
                placeholder="Procure por uma fase"
                name="search"
                onChange={(event) => setSearch(event.target.value)}
                />
          </label>

          {filteredPhases.length > 0 ? (
            <div className="grid max-w-[900px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-8">
                {filteredPhases.map((phase) => (
                <CardPhase
                    key={phase.uuid}
                    uuid={phase.uuid}
                    name={phase.name}
                    amount={phase.amount}
                    difficulty={phase.difficulty}
                    status={phase.status}
                    onDetails={() => {
                      setSelectedPhase(phase);
                      detailsRef.current.showModal();
                    }}
                />
                ))}
            </div>
            ) : (
            <p role="status" className="mt-10 text-center text-sm text-[#77796f]">
                Nenhuma fase encontrada.
            </p>
            )}
          <dialog ref={detailsRef} aria-labelledby="phase-details-title" className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-[#f8f8f6] p-6 text-[#45483d] shadow-xl backdrop:bg-black/40">
            <h2 id="phase-details-title" className="mb-4 text-lg font-bold">{selectedPhase?.name}</h2>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <dt>Dificuldade</dt><dd>{selectedPhase?.difficulty}</dd>
              <dt>Desafios</dt><dd>{selectedPhase?.amount}</dd>
              <dt>Status</dt><dd>{selectedPhase?.status}</dd>
            </dl>
            <form method="dialog" className="mt-6">
              <button autoFocus className="rounded-full bg-[#78933f] px-5 py-2 text-sm font-bold text-white cursor-pointer">Fechar</button>
            </form>
          </dialog>
        </section>
      </div>
    </main>
  );
}
