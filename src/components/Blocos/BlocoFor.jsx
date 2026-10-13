export default function BlocoFor({ value = "1", onChange }) {
    return (
        <div className="w-full px-2 py-4 flex gap-x-2 bg-[#F18432] rounded-lg shadow-md cursor-pointer hover:shadow-xl font-bold px-4 items-center">
            <p className="text-md text-white mr-2">A cada</p>
            <input
                type="number"
                min="0"
                value={value}
                onChange={onChange}
                className="w-[50px] text-white border border-white bg-[#DE782C] shadow-md rounded-md focus:outline-none px-1"
            />
            <p className="text-md text-white mr-2">vezes, repita:</p>
        </div>
    );
}