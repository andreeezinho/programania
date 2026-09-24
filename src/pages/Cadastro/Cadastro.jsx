import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import cadastroImage from "../../assets/cadastro-image.png";
import PasswordInput from "../../components/Inputs/PasswordInput";
import ButtonGoogle from "../../components/Buttons/ButtonGoogle";

export default function Cadastro() {
  return (
    <main className="flex min-h-[100dvh] w-full font-intel-one-mono bg-[url('/background.png')] bg-cover bg-center">

      {/* LADO ESQUERDO */}
      <section className="flex w-1/2 flex-col items-center justify-center px-10">

          <h1 className="mb-18 text-5xl font-bold tracking-wide text-[#78943B]">
            PROGRAMANIA!
          </h1>

          <img
            src={cadastroImage}
            alt="Lâmpada representando programação e criatividade"
            className="w-md object-contain -rotate-7"
          />

      </section>

      {/* LADO DIREITO */}
      <section className="flex w-1/2 items-center justify-center bg-[#7C9445] px-10">
        <div className="w-full max-w-[310px]">

          <h2 className="mb-14 text-center text-5xl font-bold tracking-wider text-white">
            Cadastro
          </h2>

          <p className="mb-7 text-center text-[12px] text-white">
            Já possui conta?{" "}
            <a
              href="/login"
              className="font-bold text-[#F2635D] hover:underline"
            >
              Entre
            </a>
          </p>

          <form className="flex flex-col gap-4">

            <Input
              label="Nome"
              type="text"
              placeholder="Insira o seu nome"
              name="name"
              text_color="white"
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="Insira o seu e-mail"
              name="email"
              text_color="white"
            />

            <PasswordInput
              label="Senha"
              placeholder="Insira a sua senha"
              name="password"
            />

            <PasswordInput
              label="Senha"
              placeholder="Confirmar a sua senha"
              name="confirmPassword"
            />

            <div className="mt-4 flex justify-center">
              <Button
                type="submit"
                text="Confirmar"
                className="rounded-xl bg-[#F2635D] px-10 py-2 text-sm font-bold text-white shadow-md cursor-pointer transition hover:bg-[#e55a50]"
              />
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white" />

              <span className="text-xs font-bold text-white">
                Ou
              </span>

              <div className="h-px flex-1 bg-white" />
            </div>

            <div className="flex justify-center">
              <ButtonGoogle />
            </div>

          </form>
        </div>
      </section>

    </main>
  );
}