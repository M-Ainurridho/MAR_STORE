import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isCollapse, setCollapse }) => {
   const navigate = useNavigate();
   const menu = useSelector((state) => state.userMenu.name);
   const { innerWidth } = window;
   const { data } = useSelector((state) => state.user);
   const [menus, setMenus] = useState([]);

   const fetchMenu = async () => {
      const {role} = data
      const res = await axios.get(`http://localhost:3000/user/menu/search?role=${role}`);
      setMenus(res.data.payload);
   };

   useEffect(() => {
      fetchMenu();
      innerWidth < 1024 && innerWidth >= 768 && setCollapse(!isCollapse);
   }, [menu]);

   return (
      <>
         {innerWidth < 768 ? (
            <>
               {isCollapse && (
                  <aside className={`bg-neutral-800 md:hidden block fixed left-0 top-0 bottom-0 w-3/5 sm:w-1/2 z-10 p-3`}>
                     <div className="flex justify-between items-center">
                        <p className="max-w-max cursor-pointer text-2xl font-bold" onClick={() => navigate("/")}>
                           <span className="text-green-500 tracking-wide">MAR</span>
                           <span className="tracking-wide text-white">STORE</span>
                        </p>
                        <i className="bx bx-x text-3xl text-white cursor-pointer" onClick={() => setCollapse(!isCollapse)}></i>
                     </div>

                     <div className="overflow-y-auto">
                        <SidebarMenuSM menus={menus} isCollapse={isCollapse} />
                     </div>
                  </aside>
               )}
            </>
         ) : (
            <aside className={`bg-neutral-800 hidden md:block fixed left-0 top-0 bottom-0 ${isCollapse ? "md:w-5%" : "md:w-1/4 lg:w-1/5 p-3"}`}>
               <p className="cursor-pointer text-2xl font-bold" onClick={() => navigate("/")}>
                  {isCollapse ? (
                     <img src={require(`../../../../assets/images/favicon/favicon.ico`)} alt="brand" className="w-full h-14 mb-1" />
                  ) : (
                     <>
                        <span className="text-green-500 tracking-wide">MAR</span>
                        <span className="tracking-wide text-white">STORE</span>
                     </>
                  )}
               </p>
               <div className="overflow-y-auto">
                  <SidebarMenuLG menus={menus} isCollapse={isCollapse} />
               </div>
            </aside>
         )}
      </>
   );
};

const SidebarMenuSM = ({ menus, isCollapse }) => {
   return (
      <>
         {menus.map((menu, i) => {
            const { name, submenu } = menu;
            return (
               <Fragment key={i}>
                  {isCollapse && (
                     <>
                        <p className="text-neutral-600 font-bold my-4 tracking-widest">{name}</p>
                        {submenu.map((sub, subKey) => {
                           return (
                              <Fragment key={subKey}>
                                 <Link to={sub.link} className="text-neutral-400 hover:text-white block font-bold my-2 tracking-wider">
                                    <i className={`bx-fw ${sub.icon}`}></i> {sub.name}
                                 </Link>
                              </Fragment>
                           );
                        })}
                     </>
                  )}
               </Fragment>
            );
         })}
      </>
   );
};

const SidebarMenuLG = ({ menus, isCollapse }) => {
   return (
      <>
         {menus.map((menu, i) => {
            const { name, submenu } = menu;
            return (
               <Fragment key={i}>
                  {isCollapse ? (
                     <>
                        {submenu.map((sub, subKey) => {
                           return (
                              <Fragment key={subKey}>
                                 <hr className="p-0" />
                                 <Link to={sub.link} className="text-neutral-400 hover:text-white block font-bold text-center my-2">
                                    <i className={`${sub.icon} md:text-2xl lg:text-4xl`} title={sub.name}></i>
                                 </Link>
                              </Fragment>
                           );
                        })}
                     </>
                  ) : (
                     <>
                        <p className="text-neutral-600 font-bold my-4 tracking-widest">{name}</p>
                        {submenu.map((sub, subKey) => {
                           return (
                              <Fragment key={subKey}>
                                 <Link to={sub.link} className="text-neutral-400 md:text-sm lg:text-base hover:text-white block font-bold my-2.5 tracking-wider">
                                    <i className={`bx-fw ${sub.icon}`}></i> {sub.name}
                                 </Link>
                              </Fragment>
                           );
                        })}
                     </>
                  )}
               </Fragment>
            );
         })}
      </>
   );
};

export default Sidebar;
