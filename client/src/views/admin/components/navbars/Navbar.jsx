import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isCollapse, setCollapse }) => {
   const [dropdown, setDropdown] = useState(false);
   return (
      <>
         <nav className={`bg-white fixed top-0 right-0 h-screen-10 w-full ${isCollapse ? "md:w-95%" : "md:w-3/4 lg:w-4/5"} flex justify-between items-center px-4 shadow z-10`}>
            <div className="left">
               <i className="bx bx-menu text-2xl cursor-pointer" onClick={() => setCollapse(!isCollapse)}></i>
            </div>
            <div className="flex items-center gap-x-2">
               <p className="text-sm">Muhammad Ainurridho</p>
               <div className="relative pb-2.5 pl-2" onMouseEnter={() => setDropdown(!dropdown)} onMouseLeave={() => setDropdown(!dropdown)}>
                  <img src={require(`../../../../assets/images/avatars/profile.png`)} alt="profile" className="w-10 rounded-full object-cover object-center shadow-lg mt-2" />
                  <div className="bullet absolute right-0 bottom-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  {dropdown && (
                     <div className="dropdown bg-white absolute top-14 right-0 border border-neutral-100 shadow-xl w-48 py-3 rounded-md">
                        <p className="font-semibold px-3">Muhammad Ainurridho</p>
                        <Link to="/user" className="text-sm px-3 hover:text-green-500 duration-100 inline-block -translate-y-1.5">
                           view my profile
                        </Link>
                        <hr className="border-neutral-200 mb-2" />

                        <Link className="block px-3 py-1 font-semibold hover:bg-green-100 hover:text-green-500 duration-100">
                           <i class="bx bx-fw bxs-cog"></i>Settings
                        </Link>
                        <Link to="/auth/signout" className="block px-3 py-1 font-semibold hover:bg-green-100 hover:text-green-500 duration-100">
                           <i class="bx bx-fw bx-power-off"></i>Logout
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         </nav>
      </>
   );
};

export default Navbar;
