import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import ButtonGoogle from "../../components/Buttons/ButtonGoogle";
import loginImage from "../../assets/login-image.png";
import PasswordInput from "../../components/Inputs/PasswordInput";

export default function Login() {
  const navigate = useNavigate();
  const {login, googleLogin} = useAuth();
  const {search} = useLocation();
  const params = new URLSearchParams(search);
  const hasSentCode = useRef(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try{
      const response = await login(formData);

      if(response){
        navigate("/");
      }else{
        console.log("Login failed: " + response.error);
      }
    }catch(error){
      console.error("Error during login: ", error);
    }
  }

  useEffect(() => {
      const code = params.get('token');
      if (!code) return;
      if (hasSentCode.current) return;

      hasSentCode.current = true;
      console.log(code);
      const authGoogle = async () => {
        try {
          const response = await googleLogin(code);

          if(response){
            navigate("/");
          }else{
            console.log("Google login failed: " + response.error);
          }
        }catch (error) {
          console.error("Error during Google login: ", error);
        }
      }

      authGoogle();
  }, [search]);

  const sendToGoogleAuth = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      })
  }

  console.log(formData);

  return (
    <main className="flex min-h-[100dvh] w-full bg-[url('/background.png')] bg-cover bg-center font-intel-one-mono">
      <section className="flex w-1/2 flex-col items-center justify-center px-10">
        <h1 className="mb-7 text-5xl font-bold tracking-wide text-[#78943B]">
          PROGRAMANIA!
        </h1>

        <img
          src={loginImage}
          alt="Mãos digitando em um teclado"
          className="w-2xl object-contain"
        />

        <p className="mt-8 text-center text-md font-medium tracking-wide text-[#78943B]">
          Plataforma de Incentivo na Introdução à Programação para Crianças
        </p>
      </section>

      <section className="flex w-1/2 items-center justify-center bg-[#7C9445] px-10">
        <div className="w-full max-w-[310px]">
          <h2 className="mb-14 text-center text-5xl font-bold tracking-wider text-white">
            Login
          </h2>

          <p className="mb-7 text-center text-[12px] text-white">
            Não possui login?{" "}
            <a
              href="/cadastro"
              className="font-bold text-[#F2635D] hover:underline"
            >
              Cadastre-se
            </a>
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="Insira o seu e-mail"
              name="email"
              onChange={handleChange}
              text_color="white"
            />

            <PasswordInput
              label="Senha"
              placeholder="Insira a sua senha"
              name="password"
              onChange={handleChange}
              text_color="white"
            />

            <a
              href="#"
              className="-mt-2 text-[10px] text-white underline hover:no-underline"
            >
              Esqueceu sua senha?
            </a>

            <div className="mt-1 flex justify-center">
              <Button
                type="submit"
                text="Entrar"
                className="rounded-xl bg-[#F2635D] px-10 py-2 text-sm font-bold text-white shadow-md cursor-pointer transition hover:bg-[#e55a50]"
              />
            </div>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white" />

            <span className="text-xs font-bold text-white">
              Ou
            </span>

            <div className="h-px flex-1 bg-white" />
          </div>

          <div className="flex justify-center">
            <ButtonGoogle onClick={sendToGoogleAuth} />
          </div>
        </div>
      </section>
    </main>
  );
}