import { useRef, useState, useEffect } from "react";
import catImage from "../../assets/image 6.png";
import canImage from "../../assets/image 7.png";
import ExecuteButton from "../Buttons/ExecuteButton";
import RestartButton from "../Buttons/RestartButton";

const TOTAL_CELLS = 28;
const COLUMNS = 7;
const STEP_DELAY_MS = 1000;
const MAX_WHILE_ITERATIONS = 100;

function criarArvore(blocos) {
  const raiz = [];
  const escopos = [];

  function filhosAtuais() {
    const escopo = escopos.at(-1);
    if (!escopo) return raiz;

    return escopo.ramo === "alternativo"
      ? escopo.no.alternativo
      : escopo.no.filhos;
  }

  for (const bloco of blocos) {
    if (bloco.tipo === "else") {
      const indiceIf = escopos.map(({ no }) => no.tipo).lastIndexOf("if");
      if (indiceIf === -1) continue;

      escopos.length = indiceIf + 1;
      escopos[indiceIf] = {
        no: escopos[indiceIf].no,
        ramo: "alternativo",
      };
      escopos[indiceIf].no.alternativo ??= [];
      continue;
    }

    if (bloco.tipo === "forPare" || bloco.tipo === "whilePare") {
      const tipoLoop = bloco.tipo === "forPare" ? "for" : "while";

      for (let i = escopos.length - 1; i >= 0; i--) {
        if (escopos[i].no.tipo === tipoLoop) {
          escopos.length = i;
          break;
        }
      }

      continue;
    }

    const no = { ...bloco, filhos: [], alternativo: null };
    filhosAtuais().push(no);

    if (["for", "while", "if"].includes(bloco.tipo)) {
      escopos.push({ no, ramo: "principal" });
    }
  }

  return raiz;
}

function condicaoVerdadeira(condicao) {
  return condicao === "evento";
}

function aguardar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function LabirintoCard({
  codigo = [],
  onExecute,
  executeDisabled = false,
  className = "",
  style,
  boardClassName = "",
  boardStyle,
  desafio
}) {
  const START_CELL = desafio?.startCell;
  const FINISH_CELL = desafio?.finishCell;
  const [posicao, setPosicao] = useState(START_CELL);
  const [executando, setExecutando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const posicaoAtual = useRef(START_CELL);

  useEffect(() => {
    if (START_CELL == null) return;

    const inicio = Number(START_CELL);
    setPosicao(inicio);
    posicaoAtual.current = inicio;
  }, [START_CELL]);

  async function executarBlocos() {
    if (executando || executeDisabled) return;

    setExecutando(true);
    setMensagem("");
    posicaoAtual.current = START_CELL;
    setPosicao(START_CELL);

    const arvore = criarArvore(codigo);

    async function executarLista(lista, dentroDeLoop = false) {
      for (const bloco of lista) {
        if (bloco.tipo === "for" || bloco.tipo === "while") {
          const repeticoes =
            bloco.tipo === "for"
              ? Math.min(100, Math.max(0, Number(bloco.valor) || 0))
              : MAX_WHILE_ITERATIONS;

          for (let i = 0; i < repeticoes; i++) {
            if (
              bloco.tipo === "while" &&
              !condicaoVerdadeira(bloco.condicao)
            ) {
              break;
            }

            const resultado = await executarLista(bloco.filhos, true);
            if (resultado === "break") break;
          }
          continue;
        }

        if (bloco.tipo === "if") {
          const ramo = condicaoVerdadeira(bloco.condicao)
            ? bloco.filhos
            : bloco.alternativo ?? [];

          const resultado = await executarLista(ramo, dentroDeLoop);
          if (resultado) return resultado;
          continue;
        }

        if (bloco.tipo === "forPare" || bloco.tipo === "whilePare") {
          if (dentroDeLoop) return "break";
          continue;
        }

        if (bloco.tipo === "forContinue" || bloco.tipo === "whileContinue") {
          if (dentroDeLoop) return "continue";
          continue;
        }

        const coluna = posicaoAtual.current % COLUMNS;
        let proximaPosicao = posicaoAtual.current;

        switch (bloco.tipo) {
          case "esquerda":
            if (coluna > 0) proximaPosicao--;
            break;
          case "direita":
            if (coluna < COLUMNS - 1) proximaPosicao++;
            break;
          case "cima":
            if (posicaoAtual.current >= COLUMNS) proximaPosicao -= COLUMNS;
            break;
          case "baixo":
            if (posicaoAtual.current < TOTAL_CELLS - COLUMNS) {
              proximaPosicao += COLUMNS;
            }
            break;
          default:
            continue;
        }

        posicaoAtual.current = proximaPosicao;
        setPosicao(proximaPosicao);
        await aguardar(STEP_DELAY_MS);

        if (proximaPosicao === FINISH_CELL) {
          setMensagem("O gato chegou ao destino!");
          return;
        }
      }
    }

    try {
      await executarLista(arvore);
      onExecute?.(codigo);
    } finally {
      setExecutando(false);
    }
  }

  return (
    <section
      className={`box-border flex h-fit w-full min-w-0 flex-col gap-2 gap-y-4 rounded-[24px] bg-[#f8f8f6] p-3 ${className}`}
      style={style}
      aria-label="Resultado do labirinto"
    >
      <h2 className="font-['Intel_One_Mono',monospace] text-[18px] font-bold text-[#768E44]">
        Resultado
      </h2>

      <div className="w-full min-w-0">
        <div
          className={`mx-auto grid w-full max-w-[320px] grid-cols-7 gap-1 ${boardClassName}`}
          style={{ maxWidth: 320, ...boardStyle }}
        >
          {Array.from({ length: TOTAL_CELLS }, (_, index) => {
            const isFinish = index === FINISH_CELL;

            return (
              <div
                key={index}
                className={`relative aspect-square min-w-0 rounded-[8px] ${
                  isFinish
                    ? "flex items-center justify-center bg-[#768E44]"
                    : "bg-[#D9D9D9]"
                }`}
              >
                {posicao === index && (
                  <img
                    src={catImage}
                    alt="Gato"
                    className="absolute inset-0 h-full w-full object-contain p-[14%] transition-all duration-200"
                  />
                )}
                {isFinish && (
                  <img
                    src={canImage}
                    alt="Lata de comida no destino"
                    className="h-[44%] w-[44%] object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {mensagem && (
        <p role="status" className="text-center text-sm font-bold text-[#768E44]">
          {mensagem}
        </p>
      )}

      <div className="flex justify-between">
        <RestartButton
          onClick={() => {setPosicao(START_CELL)}}
          disabled={executeDisabled || executando}
        />
        <ExecuteButton
          onClick={executarBlocos}
          disabled={executeDisabled || executando}
        />
      </div>
    </section>
  );
}