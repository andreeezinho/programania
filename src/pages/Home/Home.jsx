
import { useState, useContext, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/Layout/Sidebar";
import Banner from "../../components/Banners/BannerHome";
import InputSearch from "../../components/Inputs/InputSearch";
import CardPhase from "../../components/Cards/CardPhase";
import { getFase } from "../../services/Fase/FaseService";

export default function Home() {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [fases, setFases] = useState(null);
  const [params, setParams] = useState({
    nome: ""
  });

  const list = async (params) => {
    const response = await getFase(params);
    setFases(response);
    setLoading(false);
  }

  useEffect(() => {
    list();
  }, []);

  const handleChange = (e) => {
      setParams({
          ...params,
          [e.target.name]: e.target.value,
      })

      if(params?.nome.length >= 3){
          list(params);
      }else{
          list();
      }
  }

  console.log(fases);

  return (
    <main className="min-h-screen bg-[url('/background.png')] p-0 font-mono text-[#6f7759] md:p-2">
      <div className="flex min-h-[calc(100vh-2rem)] md:rounded-md">

        <Sidebar handleLogout={logout} />

        <section className="min-w-0 flex-1 px-6 py-7 md:px-12 md:py-8 bg-[#f8f8f6] rounded-2xl">

          <Banner />

          <div className="my-5 h-px w-full bg-[#a6b583]" />

          <div className="mb-7 flex justify-center">
            <InputSearch
              type="text"
              name="nome"
              value={params.nome}
              placeholder="Procure por uma fase..."
              onChange={handleChange}
            />
          </div>

          <h2 className="mb-4 text-sm font-bold tracking-wide text-[#718548]">
            Fases Disponíveis
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
            {fases?.map((fase) => (
              <CardPhase
                key={fase.uuid}
                uuid={fase.uuid}
                name={fase.nome}
                amount={fase.numero}
              />
            ))}
          </div>

        </section>
      </div>
    </main>
  );
}
