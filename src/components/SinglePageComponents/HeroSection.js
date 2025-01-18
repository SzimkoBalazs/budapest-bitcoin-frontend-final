const HeroSection = () => {
  return (
    <section className=" w-full bg-black text-white">
      {/* Háttér */}

      {/* Belső tartalom */}
      <div className="relative max-w-[1440px] mx-auto px-[40px] py-[80px]">
        <h1 className="text-[56px] font-exo font-bold tracking-[2px]">
          Bitcoin Budapest
        </h1>
        <p className="mt-[10px] text-[20px] font-exo font-medium">
          The pure Bitcoin conference. No noise, just Bitcoin.
        </p>
        <button className="mt-[20px] px-[16px] py-[8px] bg-yellow-500 text-black rounded-[10px]">
          Get your pass
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
