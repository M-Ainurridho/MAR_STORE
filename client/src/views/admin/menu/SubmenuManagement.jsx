import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Settings from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";
import axios from "axios";

const SubmenuManagement = () => {
   Settings("Menu Management", "admin");

   const [menus, setMenus] = useState([]);
   const [popup, setPopup] = useState(false);
   const [submenu, setSubmenu] = useState("");
   const [icon, setIcon] = useState("");
   const [link, setLink] = useState("");
   const [menuId, setMenuId] = useState("");
   const [userAccess, setUserAccess] = useState([]);
   const [alert, setAlert] = useState(false);
   const [reqMethod, setReqMethod] = useState("GET");

   useEffect(() => {
      fetchMenu();
   }, [popup]);

   const fetchMenu = async () => {
      try {
         const res = await axios.get("http://localhost:3000/user/menu");
         setMenus(res.data.payload);
      } catch (err) {
         console.log("error: ", err);
      }
   };

   const onSubmit = async (e) => {
      e.preventDefault();

      if(reqMethod === "GET") {
         try {
            const response = await axios.post("http://localhost:3000/user/addsubmenu", { submenu, menuId, icon, link })
            console.log(response)
         } catch (err) {
            console.log("error: ", err)
         }
      }
      setPopup(!popup)
   };

   const handleDelete = async (menuId, _id) => {
      const payload = { _id };

      // try {
      //    const res = await axios.delete("http://localhost:3000/user/deletemenu", { data: payload });
      //    localStorage.setItem("success-delete-menu", res.data.message);
      //    dispatch(deleteMenu());
      // } catch (err) {
      //    console.log("error: ", err);
      // } finally {
      //    setAlert(!alert);
      // }
   };

   return (
      <>
         <section id="submenu-management">
            <CrumbNTitle menu={"Menu"}>
               <strong>Submenu Management</strong>
            </CrumbNTitle>
            <div className="p-6 text-lg">
               <div className="edit-profile bg-white rounded-md border border-neutral-200">
                  <div className="py-2 px-4 border-b border-b-neutral-200 flex justify-between">
                     <p>
                        <i class="bx-fw bx bxs-folder text-base -translate-y-1.5"></i>
                        <strong>All Submenu</strong>
                     </p>
                     <button className="bg-green-500 hover:bg-green-600 duration-100 text-white text-base font-semibold rounded-md px-4" onClick={() => setPopup(!popup)}>Add New</button>
                  </div>
                  <div className="p-4">
                     <table className="table-auto border grid rounded-md overflow-auto">
                        <thead className="bg-neutral-100">
                           <tr className="grid grid-cols-5">
                              <th className="p-2">Submenu</th>
                              <th className="p-2">Menu</th>
                              <th className="p-2">Icon</th>
                              <th className="p-2">Link</th>
                              <th className="p-2">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {menus.map((menu) => {
                              const { submenu } = menu;
                              return (
                                 <Fragment key={menu._id}>
                                    {submenu.map(({ _id, name, icon, link }, i) => {
                                       return (
                                          <tr key={i} className="grid grid-cols-5 text-base border-t border-t-neutral-200">
                                             <td className="p-2 text-center truncate">{name}</td>
                                             <td className="p-2 text-center border-x border-x-neutral-200 truncate">{menu.name}</td>
                                             <td className="p-2 text-center border-x border-x-neutral-200 truncate">{icon}</td>
                                             <td className="p-2 text-center border-x border-x-neutral-200 truncate">{link}</td>
                                             <td className="p-2 text-center font-medium flex flex-col md:flex-row gap-1 justify-center truncate">
                                                <Link className="py-0 px-1 md:px-3 rounded-md bg-green-500 hover:bg-green-600 duration-100 text-white">edit</Link>
                                                <Link className="py-0 px-1 md:px-3 rounded-md bg-red-500 hover:bg-red-600 duration-100 text-white" onClick={() => handleDelete(menu._id, _id)}>delete</Link>
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 </Fragment>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </section>

         {popup && (
            <div id="popup" className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/50 z-20 flex justify-center items-center">
               <div className="popup-wraper w-96 p-4 bg-white shadow-lg shadow-neutral-500 rounded-md">
                  <div className=" flex justify-between items-center border-b border-b-neutral-200 text-lg">
                     <p>
                        <i className="bx-fw bx bxs-folder"></i>
                        <strong>Add New Submenu</strong>
                     </p>
                     <i className="bx bx-x text-2xl cursor-pointer" onClick={() => setPopup(!popup)}></i>
                  </div>
                  <form onSubmit={onSubmit}>
                     <div className="my-2">
                        <input
                           type="text"
                           className="block w-full py-1.5 px-3 border border-neutral-400 rounded-md text-sm focus:border-green-300 focus:outline-none focus:ring focus:ring-2 focus:ring-green-300"
                           placeholder="Submenu"
                           value={submenu}
                           onChange={(e) => setSubmenu(e.target.value)}
                           required
                        />
                     </div>
                     <select className="w-full py-1.5 px-3 border border-neutral-400 rounded-md text-sm focus:border-green-300 focus:outline-none focus:ring focus:ring-2 focus:ring-green-300" onChange={(e) => setMenuId(e.target.value)} required>
                        <option selected>--- Select Menu Option ---</option>
                        {menus.map(({_id, name}) => {
                           return (
                              <option key={_id} value={_id}>{name}</option>
                           )
                        })}
                     </select>
                     <div className="my-2">
                        <input
                           type="text"
                           className="block w-full py-1.5 px-3 border border-neutral-400 rounded-md text-sm focus:border-green-300 focus:outline-none focus:ring focus:ring-2 focus:ring-green-300"
                           placeholder="Icon"
                           value={icon}
                           onChange={(e) => setIcon(e.target.value)}
                           required
                        />
                     </div>
                     <div className="my-2">
                        <input
                           type="text"
                           className="block w-full py-1.5 px-3 border border-neutral-400 rounded-md text-sm focus:border-green-300 focus:outline-none focus:ring focus:ring-2 focus:ring-green-300"
                           placeholder="Link"
                           value={link}
                           onChange={(e) => setLink(e.target.value)}
                           required
                        />
                     </div>
                     
                     <div className="my-2 mb-0">
                        <button type="submit" className="block w-full bg-green-500 hover:bg-green-600 duration-100 font-semibold py-1 rounded-md text-white">
                           Add
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </>
   );
};

export default SubmenuManagement;
