import googleIcon from "../../assets/google.svg";

const ButtonGoogle = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 bg-white rounded-xl px-4 py-2 shadow-md cursor-pointer"
    >
      <img
        src={googleIcon}
        alt="Google"
        className="w-5 h-5"
      />

      <span className="text-[#7C9445] text-sm">
        Continue com o Google
      </span>
    </button>
  );
};

export default ButtonGoogle;
