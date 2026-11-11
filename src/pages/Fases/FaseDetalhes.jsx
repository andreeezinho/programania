
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Sidebar from "../../components/Layout/Sidebar";
import PcImage from "../../assets/pc-image.png";
import { getDesafiosFromFase } from "../../services/Desafio/DesafioService";
import { getFaseByUuid } from "../../services/Fase/FaseService";

export default function FaseDetalhes() {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [loading, setLoading] = useState(true);
    const [fase, setFase] = useState(null);
    const [desafios, setDesafios] = useState([]);

    useEffect(() => {
        let ativo = true;

        const carregarDados = async () => {
            setLoading(true);

            try {
                const [faseResponse, desafiosResponse] = await Promise.all([
                    getFaseByUuid(uuid),
                    getDesafiosFromFase(uuid)
                ]);

                if (ativo) {
                    setFase(faseResponse);
                    setDesafios(desafiosResponse?.content || []);
                }
            } catch (error) {
                console.error("Erro ao carregar os dados da fase:", error);
            } finally {
                if (ativo) {
                    setLoading(false);
                }
            }
        };

        carregarDados();

        return () => {
            ativo = false;
        };
    }, [uuid]);

    return (
        <main className="min-h-screen bg-[url('/background.png')] p-0 font-mono text-[#6f7759] md:p-2">
            <div className="flex min-h-[calc(100vh-1rem)] gap-3 md:rounded-md">
                <Sidebar handleLogout={logout} />

                <section className="min-w-0 flex-1 rounded-2xl bg-[#f8f8f6] px-5 py-7 md:px-8 md:py-8">
                    <header className="border-b border-[#9aa77a]">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex gap-x-2 p-1 mb-1 rounded-lg cursor-pointer text-sm font-bold tracking-wide hover:bg-[#ececec]"
                        >
                            <svg
                                fill="#6f7759"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 52 52"
                                className="w-4"
                            >
                                <path d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z" />
                            </svg>

                            {loading ? (
                                <Skeleton width={130} />
                            ) : (
                                `${fase?.nome || ""} - ${fase?.numero || ""}`
                            )}
                        </button>
                    </header>

                    <div className="flex justify-center items-center gap-8 gap-x-24 py-8 md:px-8">
                        <div className="flex mx-auto items-center gap-x-8">
                            <div className="flex justify-center">
                                <img
                                    src={PcImage}
                                    alt="Imagem de um computador antigo"
                                    className="w-48 max-w-full object-contain"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h2 className="mb-2 text-lg font-bold">
                                    Descrição
                                </h2>

                                {loading ? (
                                    <div className="w-full max-w-3xl space-y-2">
                                        <Skeleton count={3} height={12} />
                                    </div>
                                ) : (
                                    <p className="w-full max-w-3xl text-justify text-sm">
                                        {fase?.descricao}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <section
                        aria-labelledby="fases-heading"
                        className="mt-2 text-center"
                    >
                        <h2
                            id="fases-heading"
                            className="mb-14 text-xl font-bold md:text-2xl"
                        >
                            Vamos Começar!
                        </h2>

                        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">

                            {loading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex min-h-42 flex-col rounded-2xl bg-white px-4 pb-3 pt-10 shadow-md"
                                    >
                                        <Skeleton circle width={32} height={32} />

                                        <div className="mt-4">
                                            <Skeleton width="65%" height={12} />
                                        </div>

                                        <div className="mt-2">
                                            <Skeleton width="85%" height={10} />
                                        </div>

                                        <div className="mt-auto flex justify-end">
                                            <Skeleton width={65} height={25} borderRadius={20} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                desafios.map((desafio) => (
                                    <Link
                                        to={`/fases/${uuid}/desafio/${desafio.uuid}`}
                                        key={desafio.uuid}
                                        className="relative flex min-h-42 flex-col rounded-2xl bg-white px-4 pb-3 pt-10 shadow-md"
                                    >
                                        <span className="absolute left-2 top-2 flex size-8 items-center justify-center rounded-full bg-[#7c9546] text-sm font-bold text-white shadow">
                                            {desafio.numero}
                                        </span>

                                        <h3 className="mt-4 text-start text-xs font-bold">
                                            Desafio {desafio.numero}
                                        </h3>

                                        <p className="mt-2 text-start text-[10px] text-amber-500">
                                            {desafio.nome}
                                        </p>

                                        <button
                                            type="button"
                                            className="mt-auto self-end rounded-full bg-[#e85f54] px-2.5 py-1 text-[10px] font-bold text-white shadow hover:bg-[#d95147] focus:outline-none focus:ring-2 focus:ring-[#e85f54] focus:ring-offset-2"
                                        >
                                            Entrar <span aria-hidden="true">→</span>
                                        </button>
                                    </Link>
                                ))
                            )}

                        </div>
                    </section>
                </section>
            </div>
        </main>
    );
}
