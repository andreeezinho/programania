
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Sidebar from "../../components/Layout/Sidebar";

import BlocoFor from "../../components/Blocos/BlocoFor";
import ForContinue from "../../components/Blocos/ForContinue";
import ForPare from "../../components/Blocos/ForPare";
import BlocoWhile from "../../components/Blocos/BlocoWhile";
import WhileContinue from "../../components/Blocos/WhileContinue";
import WhilePare from "../../components/Blocos/WhilePare";
import BlocoIf from "../../components/Blocos/BlocoIf";
import BlocoElse from "../../components/Blocos/BlocoElse";
import BlocoEsquerda from "../../components/Blocos/BlocoEsquerda";
import BlocoDireita from "../../components/Blocos/BlocoDireita";
import BlocoCima from "../../components/Blocos/BlocoCIma";
import BlocoBaixo from "../../components/Blocos/BlocoBaixo";

import LabirintoCard from "../../components/Desafio/LabirintoCard";

import {
    getBlocosFromDesafio,
    getDesafio
} from "../../services/Desafio/DesafioService";

const ComponentesBloco = {
    for: BlocoFor,
    forContinue: ForContinue,
    forPare: ForPare,
    while: BlocoWhile,
    whileContinue: WhileContinue,
    whilePare: WhilePare,
    if: BlocoIf,
    else: BlocoElse,
    esquerda: BlocoEsquerda,
    direita: BlocoDireita,
    cima: BlocoCima,
    baixo: BlocoBaixo,
};

function gerarRepresentacao({ tipo, valor, condicao }) {
    const expressao = ["esquerda", "direita", "cima", "baixo"].includes(condicao)
        ? `livre("${condicao}")`
        : "false";

    const linhas = {
        for: `for (let i = 0; i < ${Math.max(0, Number(valor) || 0)}; i++) {`,
        while: `while (${expressao}) {`,
        if: `if (${expressao}) {`,
        esquerda: "posicao += -1; // esquerda",
        direita: "posicao += 1; // direita",
        cima: "posicao += -7; // cima",
        baixo: "posicao += 7; // baixo",
        forContinue: "continue;",
        whileContinue: "continue;",
        forPare: "break;",
        whilePare: "break;",
    };

    return linhas[tipo] ?? "";
}

function BlocoArrastavel({ tipo, className = "w-full", children }) {
    return (
        <div
            draggable
            onDragStart={(event) => {
                const { dataTransfer, currentTarget } = event;

                dataTransfer.setData("application/x-bloco", tipo);
                dataTransfer.effectAllowed = "copy";

                const rect = currentTarget.getBoundingClientRect();
                const imagemArraste = currentTarget.cloneNode(true);

                Object.assign(imagemArraste.style, {
                    position: "fixed",
                    top: "0",
                    left: "-10000px",
                    width: `${rect.width}px`,
                    margin: "0",
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                    pointerEvents: "none",
                });

                document.body.appendChild(imagemArraste);

                dataTransfer.setDragImage(
                    imagemArraste,
                    event.clientX - rect.left,
                    event.clientY - rect.top
                );

                setTimeout(() => imagemArraste.remove(), 0);
            }}
            className={`cursor-grab ${className}`}
        >
            {children}
        </div>
    );
}

function gerarCodigo(blocos) {
    const linhas = [];
    const escopos = [];
    let indentacao = 0;

    function fecharEscopo() {
        escopos.pop();
        indentacao--;
        linhas.push(`${"    ".repeat(indentacao)}}`);
    }

    for (const bloco of blocos) {
        if (bloco.tipo === "else") {
            const indiceIf = escopos.lastIndexOf("if");

            if (indiceIf === -1) continue;

            while (escopos.length - 1 > indiceIf) {
                fecharEscopo();
            }

            fecharEscopo();
            linhas.push(`${"    ".repeat(indentacao)}} else {`);
            escopos.push("else");
            indentacao++;
            continue;
        }

        if (bloco.tipo === "forPare" || bloco.tipo === "whilePare") {
            const tipoLoop = bloco.tipo === "forPare" ? "for" : "while";
            let indiceLoop = -1;

            for (let i = escopos.length - 1; i >= 0; i--) {
                if (escopos[i] === tipoLoop) {
                    indiceLoop = i;
                    break;
                }
            }

            if (indiceLoop !== -1) {
                while (escopos.length > indiceLoop) {
                    fecharEscopo();
                }
            }

            continue;
        }

        const representacao = gerarRepresentacao(bloco);
        if (!representacao) continue;

        linhas.push(`${"    ".repeat(indentacao)}${representacao}`);

        if (["for", "while", "if"].includes(bloco.tipo)) {
            escopos.push(bloco.tipo);
            indentacao++;
        }
    }

    while (escopos.length > 0) {
        fecharEscopo();
    }

    return linhas.join("\n");
}

export default function Desafio() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { uuid, desafioUuid } = useParams();

    const [desafio, setDesafio] = useState(null);
    const [codigo, setCodigo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [blocos, setBlocos] = useState(null);

    // CARREGAMENTO DOS DADOS
    useEffect(() => {
        async function carregarDados() {
            setLoading(true);

            try {
                const [desafioResponse, blocosResponse] = await Promise.all([
                    getDesafio(desafioUuid),
                    getBlocosFromDesafio(desafioUuid)
                ]);

                setDesafio(desafioResponse);
                setBlocos(blocosResponse);

            } catch (error) {
                console.error("Erro ao carregar desafio:", error);

            } finally {
                setLoading(false);
            }
        }

        carregarDados();
    }, [desafioUuid]);

    function atualizarBloco(id, campo, valor) {
        setCodigo((blocos) =>
            blocos.map((bloco) =>
                bloco.id === id ? { ...bloco, [campo]: valor } : bloco
            )
        );
    }

    function adicionarBloco(event, destinoId = null) {
        event.preventDefault();
        event.stopPropagation();

        const idArrastado = event.dataTransfer.getData("application/x-bloco-id");

        if (idArrastado) {
            setCodigo((blocos) => {
                if (idArrastado === destinoId) return blocos;

                const origem = blocos.findIndex((bloco) => bloco.id === idArrastado);
                if (origem === -1) return blocos;

                const novosBlocos = [...blocos];
                const [blocoMovido] = novosBlocos.splice(origem, 1);

                const destino = destinoId
                    ? novosBlocos.findIndex((bloco) => bloco.id === destinoId)
                    : novosBlocos.length;

                novosBlocos.splice(
                    destino === -1 ? novosBlocos.length : destino,
                    0,
                    blocoMovido
                );

                return novosBlocos;
            });

            return;
        }

        const tipo = event.dataTransfer.getData("application/x-bloco");

        if (!ComponentesBloco[tipo]) return;

        const novoBloco = {
            id: `${Date.now()}-${Math.random()}`,
            tipo,
            ...(tipo === "for" ? { valor: "1" } : {}),
            ...(["while", "if"].includes(tipo)
                ? { condicao: "evento" }
                : {}),
        };

        setCodigo((blocos) => {
            if (!destinoId) return [...blocos, novoBloco];

            const destino = blocos.findIndex(
                (bloco) => bloco.id === destinoId
            );

            if (destino === -1) return [...blocos, novoBloco];

            const novosBlocos = [...blocos];
            novosBlocos.splice(destino, 0, novoBloco);

            return novosBlocos;
        });
    }

    return (
        <main className="min-h-screen bg-[url('/background.png')] p-0 font-mono text-[#6f7759] md:p-2">

            <div className="flex min-h-[calc(100vh-2rem)] md:rounded-md">

                <Sidebar handleLogout={logout} />

                <section className="flex min-w-0 flex-1 flex-col rounded-2xl bg-[#f8f8f6] px-6 py-7 md:px-12 md:py-8">

                    {/* CABEÇALHO */}
                    <header className="border-b border-[#9aa77a]">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="mb-1 flex cursor-pointer gap-x-2 rounded-lg p-1 text-sm font-bold tracking-wide hover:bg-[#ececec]"
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
                                <Skeleton width={150} height={16} />
                            ) : (
                                desafio?.nome
                            )}
                        </button>

                    </header>

                    <div className="flex min-h-0 w-full flex-1">

                        {/* COLUNA ESQUERDA */}
                        <div className="flex min-h-0 w-1/2 flex-col gap-y-10 p-8">

                            {/* O QUE FAZER */}
                            <div className="w-full rounded-lg bg-[#F3F3F3] p-3 pb-10 text-[#768E44] shadow-[0_5px_5px_rgba(0,0,0,0.25)]">

                                <h3 className="mb-5 text-start text-lg font-bold">
                                    O que fazer:
                                </h3>

                                {loading ? (
                                    <Skeleton
                                        count={3}
                                        height={12}
                                        className="mb-2"
                                    />
                                ) : (
                                    <p className="text-justify text-sm">
                                        {desafio?.descricao}
                                    </p>
                                )}

                            </div>

                            {/* BLOCOS DE CÓDIGO */}
                            <div className="flex min-h-0 w-full flex-1 flex-col rounded-lg bg-[#F3F3F3] p-3 shadow-[0_5px_5px_rgba(0,0,0,0.25)]">

                                <h3 className="mb-5 text-start text-lg font-bold text-[#768E44]">
                                    Blocos (Códigos):
                                </h3>

                                <div className="flex w-full flex-col gap-y-4">

                                    {loading ? (

                                        Array.from({ length: 5 }).map((_, index) => (
                                            <Skeleton
                                                key={index}
                                                height={55}
                                                borderRadius={8}
                                            />
                                        ))

                                    ) : (

                                        blocos?.map((bloco, index) => {

                                            if (bloco.bloco.tipo === "for") {
                                                return (
                                                    <BlocoArrastavel
                                                        key={index}
                                                        tipo="for"
                                                    >
                                                        <BlocoFor />
                                                    </BlocoArrastavel>
                                                );
                                            }

                                            if (bloco.bloco.tipo === "forPare") {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex gap-x-4"
                                                    >
                                                        <BlocoArrastavel
                                                            tipo="forContinue"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <ForContinue />
                                                        </BlocoArrastavel>

                                                        <BlocoArrastavel
                                                            tipo="forPare"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <ForPare />
                                                        </BlocoArrastavel>
                                                    </div>
                                                );
                                            }

                                            if (bloco.bloco.tipo === "while") {
                                                return (
                                                    <BlocoArrastavel
                                                        key={index}
                                                        tipo="while"
                                                    >
                                                        <BlocoWhile />
                                                    </BlocoArrastavel>
                                                );
                                            }

                                            if (bloco.bloco.tipo === "whilePare") {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex gap-x-4"
                                                    >
                                                        <BlocoArrastavel
                                                            tipo="whileContinue"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <WhileContinue />
                                                        </BlocoArrastavel>

                                                        <BlocoArrastavel
                                                            tipo="whilePare"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <WhilePare />
                                                        </BlocoArrastavel>
                                                    </div>
                                                );
                                            }

                                            if (bloco.bloco.tipo === "if") {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex gap-x-4"
                                                    >
                                                        <BlocoArrastavel
                                                            tipo="if"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <BlocoIf />
                                                        </BlocoArrastavel>

                                                        <BlocoArrastavel
                                                            tipo="else"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <BlocoElse />
                                                        </BlocoArrastavel>
                                                    </div>
                                                );
                                            }

                                            if (bloco.bloco.tipo === "esquerda") {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex gap-x-4"
                                                    >
                                                        <BlocoArrastavel
                                                            tipo="esquerda"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <BlocoEsquerda />
                                                        </BlocoArrastavel>

                                                        <BlocoArrastavel
                                                            tipo="direita"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <BlocoDireita />
                                                        </BlocoArrastavel>
                                                    </div>
                                                );
                                            }

                                            if (bloco.bloco.tipo === "cima") {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex gap-x-4"
                                                    >
                                                        <BlocoArrastavel
                                                            tipo="cima"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <BlocoCima />
                                                        </BlocoArrastavel>

                                                        <BlocoArrastavel
                                                            tipo="baixo"
                                                            className="min-w-0 flex-1"
                                                        >
                                                            <BlocoBaixo />
                                                        </BlocoArrastavel>
                                                    </div>
                                                );
                                            }

                                            return null;
                                        })

                                    )}

                                </div>
                            </div>

                        </div>

                        {/* COLUNA DIREITA */}
                        <div className="flex w-1/2 flex-col gap-y-8 p-8 pt-6">

                            {/* RESULTADO DO LABIRINTO */}
                            <div className="rounded-lg shadow-[0_5px_5px_rgba(0,0,0,0.25)]">

                                {loading ? (

                                    <div className="rounded-lg bg-[#F3F3F3] p-4">

                                        <Skeleton
                                            width={120}
                                            height={20}
                                            className="mb-6"
                                        />

                                        <Skeleton
                                            height={180}
                                            borderRadius={10}
                                        />

                                        <div className="mt-4 flex justify-between">
                                            <Skeleton
                                                circle
                                                width={35}
                                                height={35}
                                            />

                                            <Skeleton
                                                width={90}
                                                height={35}
                                            />
                                        </div>

                                    </div>

                                ) : (

                                    <LabirintoCard
                                        codigo={codigo}
                                        desafio={desafio}
                                        faseUuid={uuid}
                                    />

                                )}

                            </div>

                            {/* SEU CÓDIGO */}
                            <div className="flex h-full w-full flex-col rounded-lg bg-[#F3F3F3] p-3 shadow-[0_5px_5px_rgba(0,0,0,0.25)]">

                                <div className="flex shrink-0 items-center justify-between py-0">

                                    <h3 className="mb-5 py-0 text-start text-lg font-bold text-[#768E44]">
                                        Seu código:
                                    </h3>

                                    <button
                                        type="button"
                                        aria-label="Excluir todos os blocos"
                                        title="Excluir todos os blocos"
                                        onClick={() => setCodigo([])}
                                        disabled={loading}
                                        className="cursor-pointer rounded p-1 hover:bg-white/20 disabled:cursor-not-allowed"
                                    >
                                        <svg
                                            fill="#E36053"
                                            viewBox="0 0 24 24"
                                            className="h-8 w-8 transition-all hover:scale-110"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z" />
                                        </svg>
                                    </button>

                                </div>

                                <div
                                    onDragOver={(event) => event.preventDefault()}
                                    onDrop={adicionarBloco}
                                    className="flex w-full flex-1 flex-col gap-y-3"
                                >

                                    {loading ? (

                                        <div className="flex flex-col gap-y-4">
                                            <Skeleton height={50} />
                                            <Skeleton height={50} />
                                            <Skeleton height={50} />
                                        </div>

                                    ) : (

                                        codigo.map(({ id, tipo, valor, condicao }) => {

                                            const Bloco = ComponentesBloco[tipo];
                                            const campo = tipo === "for"
                                                ? "valor"
                                                : "condicao";

                                            return (
                                                <div
                                                    key={id}
                                                    className="relative min-w-0"
                                                >

                                                    <Bloco
                                                        value={
                                                            tipo === "for"
                                                                ? valor
                                                                : condicao
                                                        }
                                                        onChange={(event) =>
                                                            atualizarBloco(
                                                                id,
                                                                campo,
                                                                event.target.value
                                                            )
                                                        }
                                                    />

                                                    <button
                                                        type="button"
                                                        aria-label="Excluir bloco"
                                                        title="Excluir bloco"
                                                        onClick={() =>
                                                            setCodigo((blocos) =>
                                                                blocos.filter(
                                                                    (bloco) => bloco.id !== id
                                                                )
                                                            )
                                                        }
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 hover:bg-white/20"
                                                    >
                                                        <svg
                                                            fill="white"
                                                            viewBox="0 0 24 24"
                                                            className="h-8 w-8 transition-all hover:scale-110"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z" />
                                                        </svg>
                                                    </button>

                                                </div>
                                            );
                                        })

                                    )}

                                </div>

                                {!loading && codigo.length > 0 && (
                                    <pre className="mt-4 whitespace-pre-wrap text-xs text-[#6f7759]">
                                        {gerarCodigo(codigo)}
                                    </pre>
                                )}

                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}
