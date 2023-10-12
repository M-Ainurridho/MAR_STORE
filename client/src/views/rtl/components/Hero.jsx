import BtnShopNow from "./buttons/BtnShopNow";

const Hero = () => {
   return (
      <>
         <div className="hero w-full h-screen-87 bg-cover bg-center flex flex-col justify-center items-center">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-semibold text-center z-10 mb-10">Level up your home with our collections</h1>
            <BtnShopNow />
         </div>
      </>
   );
};

export default Hero;
