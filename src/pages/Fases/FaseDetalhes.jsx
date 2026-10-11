import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import PcImage from "../../assets/pc-image.png";

const fases = Array.from({ length: 8 }, (_, index) => ({
    numero: index + 1,
    nome: index === 0 ? "Desafio 1" : `Fase ${index + 1}`,
    status: index === 0 ? "Em andamento" : "Não iniciado",
    emAndamento: index === 0,
}));

export default function FaseDetalhes() {
    const { logout } = useAuth();

    return (
        <main className="min-h-screen bg-[url('/background.png')] p-0 font-mono text-[#6f7759] md:p-2">
            <div className="flex min-h-[calc(100vh-1rem)] gap-3 md:rounded-md">
                <Sidebar handleLogout={logout} />

                <section className="min-w-0 flex-1 rounded-2xl bg-[#f8f8f6] px-5 py-7 md:px-8 md:py-8">
                    <header className="border-b border-[#9aa77a] pb-2">
                        <h1 className="text-sm font-bold tracking-wide">
                            Nome da Fase - {"{Dificuldade}"}
                        </h1>
                    </header>

                    <div className="grid items-center gap-8 py-8 md:grid-cols-2 md:px-8">
                        <div className="flex justify-center">
                            <img
                                src={PcImage}
                                alt="Imagem de um computador antigo"
                                className="w-48 max-w-full object-contain"
                            />
                        </div>

                        <div>
                            <h2 className="mb-2 text-lg font-bold">Descrição</h2>
                            <p className="text-justify text-sm w-lg">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Aliquam mollis nunc at diam consequat, vitae ultricies justo
                                dignissim. Pellentesque eget urna commodo, maximus elit quis,
                                aliquet quam. Aenean lacinia semper ultrices. Maecenas dapibus
                                laoreet turpis, id rutrum nulla laoreet vitae.
                            </p>
                        </div>
                    </div>

                    <section aria-labelledby="fases-heading" className="mt-2 text-center">
                        <h2
                            id="fases-heading"
                            className="mb-14 text-xl font-bold md:text-2xl"
                        >
                            Vamos Começar!
                        </h2>

                        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
                            {fases.map((fase) => (
                                <Link to={`/fases/${fase.numero}/desafio/${fase.numero}`}
                                // <Link to={`/fases/${fases.uuid}/desafio/${desafio.uuid}`}
                                    key={fase.numero}
                                    className="relative flex min-h-42 flex-col rounded-2xl bg-white px-4 pb-3 pt-10 shadow-md"
                                >
                                    <span className="absolute left-2 top-2 flex size-8 items-center justify-center rounded-full bg-[#7c9546] text-sm font-bold text-white shadow">
                                        {fase.numero}
                                    </span>

                                    <h3 className="text-start text-xs font-bold mt-4">Desafio {fase.numero}</h3>
                                    <p
                                        className={`text-start text-[10px] ${
                                            fase.emAndamento ? "text-amber-500" : "text-red-500"
                                        }`}
                                    >
                                        {fase.status}
                                    </p>

                                    <button
                                        type="button"
                                        className="mt-auto self-end rounded-full bg-[#e85f54] px-2.5 py-1 text-[10px] font-bold text-white shadow hover:bg-[#d95147] focus:outline-none focus:ring-2 focus:ring-[#e85f54] focus:ring-offset-2"
                                    >
                                        Entrar <span aria-hidden="true">→</span>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </section>
                </section>
            </div>
        </main>
    );
}