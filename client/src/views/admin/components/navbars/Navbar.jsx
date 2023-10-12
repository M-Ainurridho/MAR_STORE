const Navbar = ({ isCollapse, setCollapse }) => {
   return (
      <>
         <nav className={`bg-white fixed top-0 right-0 h-screen-10 w-full ${isCollapse ? "md:w-95%" : "md:w-3/4 lg:w-4/5"} flex justify-between items-center px-4 shadow`}>
            <div className="left">
               <i className="bx bx-menu text-2xl cursor-pointer" onClick={() => setCollapse(!isCollapse)}></i>
            </div>
            <div className="flex items-center gap-x-2">
               <p className="text-sm">Muhammad Ainurridho</p>
               <div className="relative">
                  <img src={require(`../../../../assets/images/avatars/profile.png`)} alt="profile" className="w-10 rounded-full object-cover object-center shadow-lg" />
                  <div className="bullet absolute right-1 bottom-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default Navbar;
