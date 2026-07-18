const SocialProofStats = () => {
  return (
    <section className="text-center py-20">
      <h3 className="uppercase font-extrabold text-sm text-secondary tracking-widest">
        Miles de usuarios ya confian en fintrack
      </h3>
      <div className="flex mt-12 justify-around">
        <div className="flex flex-col gap-2">
          <span className="font-extrabold text-4xl">50k+</span>
          <span className="text-secondary">Usuarios Activos</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-extrabold text-4xl">4.9/5</span>
          <span className="text-secondary">Valuracion App Store</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-extrabold text-4xl">€2M+</span>
          <span className="text-secondary">Ahorros Optimizados</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-extrabold text-4xl">100%</span>
          <span className="text-secondary">Privacidad Garantizada</span>
        </div>
      </div>
    </section>
  );
};

export default SocialProofStats;
