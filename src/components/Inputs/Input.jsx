export default function Input({
  label,
  type = "text",
  placeholder,
  as = "input",
  text_color = "[#687b3e]",
  ...props
}) {
  const Field = as;

  return (
    <label className="flex w-full flex-col gap-2">
      <span className={`text-xs font-bold tracking-wide text-${text_color}`}>
        {label}
      </span>

      <Field
        {...(as === "input" ? { type } : {})}
        placeholder={placeholder}
        {...props}
        className="min-h-11 w-full rounded-xl border-0 border-b-2 border-[#d6d5cc] bg-white px-4 py-3 text-sm text-[#59604c] shadow-[0_3px_3px_rgba(52,59,37,0.22)] outline-none transition placeholder:text-[#d3d4cf] focus:border-[#adadaa]"
      />
    </label>
  );
}