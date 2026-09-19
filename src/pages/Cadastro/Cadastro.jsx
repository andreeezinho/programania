import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import cadastroImage from "../../assets/cadastro-image.png";

export default function Cadastro() {
  return (
    <main className="flex min-h-[100dvh] w-full">

      {/* LADO ESQUERDO */}
      <section className="relative flex w-1/2 items-center justify-center overflow-hidden bg-[#F4F4EF]">
        <div className="relative h-[520px] w-[520px]">

          <h1 className="absolute left-1/2 top-[55px] z-10 -translate-x-1/2 whitespace-nowrap text-3xl font-bold tracking-wide text-[#78943B]">
            PROGRAMANIA!
          </h1>

          <img
            src={cadastroImage}
            alt="Lâmpada representando programação e criatividade"
            className="absolute left-1/2 top-[65px] w-[460px] -translate-x-1/2 object-contain"
          />

        </div>
      </section>

      {/* LADO DIREITO */}
      <section className="flex w-1/2 items-center justify-center bg-[#7C9445] px-10">
        <div className="w-full max-w-[310px]">

          <h2 className="mb-4 text-center text-3xl font-bold tracking-wider text-white">
            Cadastro
          </h2>

          <p className="mb-7 text-center text-[10px] text-white">
            Já possui conta?{" "}
            <a
              href="/login"
              className="font-bold text-[#F2635D]"
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
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="Insira o seu e-mail"
              name="email"
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Insira a sua senha"
              name="password"
            />

            <Input
              label="Confirme sua Senha"
              type="password"
              placeholder="Insira a sua senha"
              name="confirmPassword"
            />

            <div className="mt-4 flex justify-center">
              <Button
                type="submit"
                text="Entrar"
                className="rounded-xl bg-[#F2635D] px-10 py-2 text-sm font-bold text-white shadow-md"
              />
            </div>

          </form>
        </div>
      </section>

    </main>
  );
}