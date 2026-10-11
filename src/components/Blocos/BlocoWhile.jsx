export default function BlocoWhile(){
    return(
        <div className="w-full px-2 py-4 flex gap-x-2 bg-[#00AFBC] rounded-lg shadow-md cursor-pointer hover:shadow-xl font-bold px-4 items-center">
            <p className="text-md text-white mr-2">A cada</p>
            <select className="text-white border border-white bg-[#028C96] shadow-md rounded-md focus:outline-none p-1 cursor-pointer">
                <option value="" selected>Algo acontecer</option>
                <option value="teste">Teste</option>
            </select>
            <p className="text-md text-white mr-2">, repita:</p>
        </div>
    );
}