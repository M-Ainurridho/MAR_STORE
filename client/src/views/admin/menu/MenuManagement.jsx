import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMenu, newMenu, updateMenu } from "../../../redux/reducers";
import Settings from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";
import axios from "axios";

const MenuManagement = () => {
   Settings("Menu Management", "admin");

   const dispatch = useDispatch();
   const [menus, setMenus] = useState([]);
   const [popup, setPopup] = useState(false);
   const [menu, setMenu] = useState("");
   const [menuId, setMenuId] = useState("");
   const [userAccess, setUserAccess] = useState([]);
   const [alert, setAlert] = useState(false);
   const [reqMethod, setReqMethod] = useState("GET");
   const acc = ["admin", "leader", "member"];

   useEffect(() => {
      if (popup === false) {
         if (alert) {
            setTimeout(() => {
               localStorage.removeItem("success-add-menu");
               localStorage.removeItem("success-delete-menu");
               localStorage.removeItem("success-update-menu");
               setAlert(false);
               setReqMethod("GET")
            }, 3000);
         }
         fetchMenu();
      } else {
         if (userAccess.length > 0) {
            const checkbox = Array.from(document.querySelectorAll(".checkbox-user-access"));
            checkbox.forEach((chk) => {
               userAccess.forEach((ua) => ua === chk.value && chk.setAttribute("checked", ""));
            });
         }
      }
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

      if (reqMethod === "GET") {
         setMenuId("");
         try {
            const res = await axios.post("http://localhost:3000/user/addmenu", { menu, userAccess });
            localStorage.setItem("success-add-menu", res.data.message);
            dispatch(newMenu(res.data.payload.name));
         } catch (err) {
            console.log("error: ", err);
         }
      } else if (reqMethod === "UPDATE") {
         try {
            const res = await axios.patch(`http://localhost:3000/user/update/${menuId}`, { menu, userAccess });
            localStorage.setItem("success-update-menu", res.data.message);
            dispatch(updateMenu(res.data.payload));
         } catch (err) {
            console.log("error: ", err);
         }
      }
      setPopup(!popup);
      setAlert(!alert);
      setMenu("");
      setUserAccess("");
   };

   const handleEdit = async (_id) => {
      try {
         const res = await axios.get(`http://localhost:3000/user/menu/search?_id=${_id}`);
         const { name, user_access } = res.data.payload;
         setMenu(name);
         setUserAccess(user_access);
         setMenuId(_id);
      } catch (err) {
         console.log("error: ", err);
      } finally {
         setPopup(!popup);
         setReqMethod("UPDATE");
      }
   };

   const handleDelete = async (_id) => {
      try {
         setPopup(null);
         const res = await axios.delete("http://localhost:3000/user/deletemenu", { data: { _id } });
         localStorage.setItem("success-delete-menu", res.data.message);
         dispatch(deleteMenu());
      } catch (err) {
         console.log("error: ", err);
      } finally {
         setAlert(!alert);
         setPopup(false);
         setReqMethod("DELETE");
      }
   };

   const handleCheckbox = (e) => {
      if (!e.target.checked) {
         const filtered = userAccess.filter((ua) => ua !== e.target.value);
         setUserAccess(filtered);
      } else {
         setUserAccess((value) => [...value, e.target.value]);
      }
   };

   return (
      <>
         <section id="menu-management">
            <CrumbNTitle menu="Menu">
               <strong>Menu Management</strong>
            </CrumbNTitle>

            {alert && (
               <div className="p-4 pb-0">
                  <div className="alert bg-green-500 p-3 mt-1 text-white rounded-md font-semibold">
                     {reqMethod === "GET" ? localStorage.getItem("success-add-menu") : reqMethod === "UPDATE" ? localStorage.getItem("success-update-menu") : localStorage.getItem("success-delete-menu")}
                  </div>
               </div>
            )}

            <div className="p-6 text-lg">
               <div className="edit-profile bg-white rounded-md border border-neutral-200">
                  <div className="py-2 px-4 border-b border-b-neutral-200 flex justify-between">
                     <p className="">
                        <i className="bx-fw bx bxs-folder text-base -translate-y-1.5"></i>
                        <strong>All Menu</strong>
                     </p>
                     <button className="bg-green-500 hover:bg-green-600 duration-100 text-white text-base font-semibold rounded-md px-4 cursor-pointer" onClick={() => setPopup(!popup)}>
                        Add New
                     </button>
                  </div>

                  <div className="p-4">
                     <table className="table-auto border grid w-full rounded-md overflow-x-auto">
                        <thead className="bg-neutral-100">
                           <tr className="grid grid-cols-3">
                              <th className="p-2">Menu</th>
                              <th className="p-2">User Access</th>
                              <th className="p-2">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {menus.map((menu) => {
                              const { user_access } = menu;
                              return (
                                 <tr key={menu._id} className="grid grid-cols-3 text-base border-t border-t-neutral-200">
                                    <td className="p-2 text-center truncate">{menu.name}</td>
                                    <td className="p-2 text-center border-x border-x-neutral-200 truncate">
                                       {user_access.map((user) => {
                                          return <>{user}, </>;
                                       })}
                                    </td>
                                    <td className="p-2 text-center font-medium flex gap-x-2 justify-center">
                                       <Link className="px-3 rounded-md bg-green-500 hover:bg-green-600 duration-100 text-white" onClick={() => handleEdit(menu._id)}>
                                          edit
                                       </Link>
                                       <Link className="px-3 rounded-md bg-red-500 hover:bg-red-600 duration-100 text-white" onClick={() => handleDelete(menu._id)}>
                                          delete
                                       </Link>
                                    </td>
                                 </tr>
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
                        <strong>Add New Menu</strong>
                     </p>
                     <i
                        className="bx bx-x text-2xl cursor-pointer"
                        onClick={() => {
                           setMenu("");
                           setPopup(!popup);
                           setUserAccess([]);
                           setReqMethod("GET");
                        }}
                     ></i>
                  </div>
                  <form onSubmit={onSubmit}>
                     <div className="my-2">
                        <input
                           type="text"
                           id="new-menu"
                           className="block w-full py-1.5 px-3 border border-neutral-400 rounded-md text-sm focus:border-green-300 focus:outline-none focus:ring focus:ring-2 focus:ring-green-300"
                           placeholder="Menu"
                           value={menu}
                           onChange={(e) => setMenu(e.target.value)}
                           required
                        />
                     </div>
                     <div className="my-2">
                        <span>User Access?</span>
                        {acc.map((a) => {
                           return (
                              <label className="mx-2">
                                 <input type="checkbox" className="checkbox-user-access border rounded-lg translate-y-0.5 p-5 inline-block hover:ring-1 hover:ring-green-500 hover:rounded-md" value={a} onClick={handleCheckbox} />
                                 <span className="ms-1 inline-block">{a}</span>
                              </label>
                           );
                        })}
                     </div>
                     <div className="my-2 mb-0">
                        <button type="submit" className="block w-full bg-green-500 hover:bg-green-600 duration-100 font-semibold py-1 rounded-md text-white">
                           {reqMethod === "GET" ? "Add" : "Update"}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </>
   );
};

export default MenuManagement;
