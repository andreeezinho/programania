import catImage from '../../assets/image 6.png';
import canImage from '../../assets/image 7.png';
import ExecuteButton from '../Buttons/ExecuteButton';

const TOTAL_CELLS = 28;
const START_CELL = 0;
const FINISH_CELL = TOTAL_CELLS - 1;

/**
 * Exibe o tabuleiro 7 x 4 do desafio, com o gato como início e a lata como destino.
 */
export default function LabirintoCard({ onExecute, executeDisabled = false }) {
  return (
    <section
      className="flex w-full flex-col rounded-[24px] bg-[#f8f8f6] p-3 sm:p-5"
      aria-label="Resultado do labirinto"
    >
      <h2 className="font-['Intel_One_Mono',monospace] text-[20px] font-bold text-[#768E44]">
        Resultado
      </h2>

      <div className="flex flex-1 items-center justify-center px-2 py-6 sm:px-8">
        <div className="grid w-full grid-cols-7 gap-2">
          {Array.from({ length: TOTAL_CELLS }, (_, index) => {
            const isStart = index === START_CELL;
            const isFinish = index === FINISH_CELL;

            return (
              <div
                key={index}
                className={`aspect-square min-w-0 rounded-[8px] bg-[#D9D9D9] ${
                  isFinish ? 'flex items-center justify-center bg-[#768E44]' : ''
                }`}
                style={isFinish ? { backgroundColor: '#768E44' } : undefined}
              >
                {isStart && (
                  <img
                    src={catImage}
                    alt="Gato na posição inicial"
                    className="h-full w-full object-contain p-[14%]"
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

      <div className="flex justify-end">
        <ExecuteButton onClick={onExecute} disabled={executeDisabled} />
      </div>
    </section>
  );
}
