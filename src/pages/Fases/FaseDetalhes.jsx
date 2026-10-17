import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import PcImage from "../../assets/pc-image.png";
import { getDesafiosFromFase } from "../../services/Desafio/DesafioService";
import { getFaseByUuid } from "../../services/Fase/FaseService";

export default function FaseDetalhes() {
    const {uuid} = useParams();
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [fase, setFase] = useState(null);
    const [desafios, setDesafios] = useState(null);

    const getFase = async () => {
        const response = await getFaseByUuid(uuid);
        setFase(response);
    }

    const list = async () => {
        const response = await getDesafiosFromFase(uuid);
        setDesafios(response.content);
        setLoading(false);
    }

    useEffect(() => {
        getFase();
        list();
    }, []);

    console.log(desafios);
    return (
        <main className="min-h-screen bg-[url('/background.png')] p-0 font-mono text-[#6f7759] md:p-2">
            <div className="flex min-h-[calc(100vh-1rem)] gap-3 md:rounded-md">
                <Sidebar handleLogout={logout} />

                <section className="min-w-0 flex-1 rounded-2xl bg-[#f8f8f6] px-5 py-7 md:px-8 md:py-8">
                    <header className="border-b border-[#9aa77a] pb-2">
                        <h1 className="text-sm font-bold tracking-wide">
                            {fase?.nome} - {fase?.numero}
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
                                {fase?.descricao}
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
                            {desafios?.map((desafio) => (
                                <Link to={`/fases/${uuid}/desafio/${desafio.uuid}`}
                                    key={desafio.uuid}
                                    className="relative flex min-h-42 flex-col rounded-2xl bg-white px-4 pb-3 pt-10 shadow-md"
                                >
                                    <span className="absolute left-2 top-2 flex size-8 items-center justify-center rounded-full bg-[#7c9546] text-sm font-bold text-white shadow">
                                        {desafio.numero}
                                    </span>

                                    <h3 className="text-start text-xs font-bold mt-4">Desafio {desafio.numero}</h3>
                                    <p
                                        className={`text-start text-[10px] text-amber-500 mt-2`}
                                    >
                                        {desafio.nome}
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