import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BtnSignIn from "../buttons/BtnSignIn";
import InputSearch from "../forms/search";
import axios from "axios";

const Navbar = () => {
   const navigate = useNavigate();

   const pages = useSelector((state) => state.pages);
   const { authentication, data } = useSelector((state) => state.user);
   const { cart } = useSelector((state) => state.shop);

   const [dropdown, setDropdown] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [carts, setCarts] = useState([]);

   const userRole = () => {
      data.role === "member" ? navigate("/member") : navigate("/admin");
   };

   const fetchCartsCount = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/user/cart/${data._id}`);
         setCarts(response.data.payload);
      } catch (err) {
         console.log("error:", err);
      }
   };

   useEffect(() => {
      authentication && fetchCartsCount();
   }, [cart]);

   return (
      <>
         <nav className="navbar h-screen-13 fixed top-0 left-0 right-0 bg-white flex justify-between items-center gap-x-2 md:px-8 lg:px-16 shadow z-50">
            {/* Smartphone */}
            {!isOpen ? (
               <div className="btn-collapse md:hidden h-full w-16 flex justify-center items-center" onClick={() => setIsOpen(!isOpen)}>
                  <i className="bx bx-menu text-3xl cursor-pointer"></i>
               </div>
            ) : (
               <>
                  <div className="btn-collapse md:hidden bg-green-500 h-full w-16 flex justify-center items-center" onClick={() => setIsOpen(!isOpen)}>
                     <i className="bx bx-x text-4xl text-white cursor-pointer"></i>
                  </div>

                  <div className="navbar-collapse md:hidden bg-green-500 fixed left-0 right-10 bottom-0 top-screen-13 z-10">
                     <div className="navbar-nav ">
                        {pages.allPages.map((page, i) => {
                           if (pages.currentPage === page) {
                              return (
                                 <Link key={i} to={pages.links[i]} className="block mx-2  font-bold hover:text-green-500">
                                    {page}
                                 </Link>
                              );
                           } else {
                              return (
                                 <Link key={i} to={pages.links[i]} className="block mx-2 hover:text-green-500 duration-200">
                                    {page}
                                 </Link>
                              );
                           }
                        })}
                     </div>
                  </div>
               </>
            )}

            {/* Screen >= 768px */}
            <div className="navbar-start hidden md:block">
               <div className="brand font-bold text-2xl">
                  <p>
                     <span className="text-green-500 tracking-wide">MAR</span>
                     <span className="tracking-wide">STORE</span>
                  </p>
               </div>
            </div>

            <div className="navbar-middle hidden md:block">
               <div className="navbar-nav">
                  {pages.allPages.map((page, i) => {
                     if (pages.currentPage === page) {
                        return (
                           <Link key={i} to={pages.links[i]} className="mx-2 font-bold">
                              {page}
                           </Link>
                        );
                     } else {
                        return (
                           <Link key={i} to={pages.links[i]} className="mx-2 hover:text-green-500 duration-100">
                              {page}
                           </Link>
                        );
                     }
                  })}
               </div>
            </div>

            <div className="navbar-end flex items-center basis-full md:basis-80">
               <InputSearch size={"full"} />

               <div className="shopping-cart ms-3 relative cursor-pointer" onClick={() => navigate("/shop/cart")}>
                  <i className="bx bx-cart text-2xl"></i>
                  {authentication && (
                     <span className="absolute top-0 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 text-center leading-4 font-bold" style={{ fontSize: "10px" }}>
                        {carts.length > 100 ? "99+" : carts.length}
                     </span>
                  )}
               </div>
               {authentication ? (
                  <>
                     <div className="user-img relative pb-2 mt-2 mx-3 md:me-0" onMouseOver={() => setDropdown(true)} onMouseOut={() => setDropdown(false)}>
                        <img src={require(`../../../../assets/images/avatars/${data.image}`)} alt="" className="w-16 md:w-20 rounded-full object-cover shadow-lg" />
                        {dropdown && (
                           <div className="absolute top-12 md:left-0 right-0 md:right-auto border border-neutral-200 p-2 pl-4 md:pl-2 md:pr-4 rounded-md bg-white translate-y-2">
                              <p className="text-sm cursor-pointer hover:text-green-500 duration-100" onClick={userRole}>
                                 Dashboard
                              </p>
                           </div>
                        )}
                     </div>
                  </>
               ) : (
                  <BtnSignIn />
               )}
            </div>
         </nav>
      </>
   );
};

export default Navbar;
