import React from 'react';
import bannerImage from '../../assets/megafone.png';

export default function Banner() {
  return (
    <div className="w-full bg-[#E66255] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm overflow-hidden">
     
      <div className="max-w-3xl space-y-6">
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-mono leading-tight">
          Procure <span className="font-bold">soluções</span> para os nossos <span className="font-bold">desafios</span> e se <span className="text-[#FACC15] font-bold">divirta</span> ao mesmo tempo<span className="text-[#FACC15]">!</span>
        </h1>

        <p className="text-white/90 text-sm sm:text-base font-mono">
          Com o <span className="text-[#FACC15] font-bold">Programania</span>, você aprender a <span className="font-bold">programar</span> de forma <span className="font-bold">prática</span>!
        </p>
      </div>

      
      <div className="shrink-0 self-end md:self-center">
        <img 
          src={bannerImage}
          alt="Megafone"
          className="w-32 sm:w-40 md:w-48 h-auto object-contain"
        />
      </div>
    </div>
  );
}