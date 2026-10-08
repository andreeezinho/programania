import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/Layout/Sidebar";
import Banner from "../../components/Banners/BannerHome";
import InputSearch from "../../components/Inputs/InputSearch";
import CardPhase from "../../components/Cards/CardPhase";

const phases = Array.from({ length: 9 }, (_, index) => ({
  uuid: index + 1,
  name: `Nome da Fase ${index + 1}`,
  amount: 0,
  image: "",
}));

export default function Fases() {
  const { logout } = useAuth();
  const [search, setSearch] = useState("");

  const filteredPhases = phases.filter((phase) =>
    phase.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[url('/background.png')] p-0 font-mono text-[#6f7759] md:p-2">
      <div className="flex min-h-[calc(100vh-2rem)] md:rounded-md">
        <Sidebar handleLogout={logout} />
        <section className="min-w-0 flex-1 px-6 py-7 md:px-12 md:py-8 bg-[#f8f8f6] rounded-2xl">
          <header className="mb-8 border-b border-[#b9bbaa] pb-2 text-sm font-bold">
            <h1>Fases</h1>
          </header>

          <Banner />

          <div className="my-5 h-px w-full bg-[#a6b583]" />

          <div className="mb-7 flex justify-center">
            <InputSearch
              type="search"
              name="search"
              placeholder="Procure por uma fase..."
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <h2 className="mb-4 text-sm font-bold tracking-wide text-[#718548]">
            Fases Disponíveis
          </h2>

          {filteredPhases.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPhases.map((phase) => (
                <CardPhase
                  key={phase.uuid}
                  uuid={phase.uuid}
                  name={phase.name}
                  amount={phase.amount}
                  image={phase.image}
                />
              ))}
            </div>
          ) : (
            <p role="status" className="mt-10 text-center text-sm text-[#77796f]">
              Nenhuma fase encontrada.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
