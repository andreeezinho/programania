import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/Layout/Sidebar";
import Banner from "../../components/Banners/BannerHome";
import InputSearch from "../../components/Inputs/InputSearch";
import CardPhase from "../../components/Cards/CardPhase";
import { getFase } from "../../services/Fase/FaseService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SKELETON_ITEMS = Array.from({ length: 6 });

function CardPhaseSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-md border border-[#deded8] bg-white p-2 shadow-[0_3px_4px_rgba(0,0,0,0.18)]">
      <div className="flex min-h-[130px]">
        <div className="w-[82px] shrink-0">
          <Skeleton height="100%" borderRadius={4} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-4 py-3">
          <Skeleton width="35%" height={8} />
          <Skeleton width="70%" height={12} className="mt-2" />
          <Skeleton width="50%" height={8} className="mt-2" />

          <div className="mt-auto border-t border-[#d9dacd] pt-2">
            <Skeleton width={64} height={16} borderRadius={999} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Fases() {
  const { logout } = useAuth();
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
          <header className="mb-8 border-b border-[#b9bbaa] pb-2 text-sm font-bold">
            <h1>Fases Disponíveis</h1>
          </header>

          <div className="mb-20 flex justify-center">
            <InputSearch
              type="text"
              name="nome"
              value={params.nome}
              placeholder="Procure por uma fase..."
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
            {loading
              ? SKELETON_ITEMS.map((_, index) => <CardPhaseSkeleton key={index} />)
              : fases?.map((fase) => (
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
