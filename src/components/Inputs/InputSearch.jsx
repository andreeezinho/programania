export default function InputSearch({
    type,
    placeholder,
    name,
    onChange
}) {
    return (
        <div className="flex h-11 w-full max-w-[446px] items-center rounded-[14px] bg-white px-[14px] shadow-[0_3px_3px_rgba(0,0,0,0.25)]">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                className="w-full bg-transparent font-mono text-sm text-[#555] outline-none placeholder:font-bold placeholder:text-[#D9D9D9]"
            />

            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 shrink-0 text-[#F2635D]"
            >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
            </svg>
        </div>
    );
}
