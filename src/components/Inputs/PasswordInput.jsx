import { useState } from "react";

export default function PasswordInput({
  label,
  type = "password",
  placeholder,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((currentValue) => !currentValue);
  }

  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-sm font-bold text-white">
        {label}
      </span>

      <div className="flex w-full items-center rounded-xl bg-white px-4 py-3 shadow-md">
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          {...props}
          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-300"
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="ml-3 flex shrink-0 items-center justify-center text-gray-500"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M3 3l18 18" />
              <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
              <path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9.5 4.6 10 8a9.8 9.8 0 0 1-2.1 4.2" />
              <path d="M6.2 6.2C3.7 7.7 2.3 10.1 2 12c.5 3.4 4.5 8 10 8 1.4 0 2.7-.3 3.8-.8" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </label>
  );
}