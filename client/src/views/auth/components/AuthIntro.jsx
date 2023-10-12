const AuthIntro = ({ children }) => {
   return (
      <>
         <div className="bg-emerald-500 hidden md:basis-1/3 md:flex flex-col items-center justify-center text-white md:px-8 lg:px-16">{children}</div>
      </>
   );
};

export default AuthIntro;
