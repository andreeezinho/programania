export default function Input({
  label,
  type = "text",
  placeholder,
  ...props
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-sm font-bold text-white">
        {label}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="w-full rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-md outline-none placeholder:text-gray-300"
      />
    </label>
  );
}