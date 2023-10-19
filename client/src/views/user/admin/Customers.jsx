import { useEffect, useState } from "react";
import Settings, { capitalize } from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";
import axios from "axios";

const Customers = () => {
   Settings("Customers");

   const [users, setUsers] = useState([]);

   const fetchUsers = async () => {
      try {
         const response = await axios.get("http://localhost:3000/user");
         setUsers(response.data.payload);
      } catch (err) {
         console.log("error: ", err);
      }
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   return (
      <section id="customers">
         <CrumbNTitle breadcrumbs={"Admin"}>
            <strong>Customers</strong>
         </CrumbNTitle>
         <div className="p-6 text-lg">
            <div className="edit-profile bg-white rounded-md border border-neutral-200">
               <div className="py-2 px-4 border-b border-b-neutral-200 flex justify-between">
                  <p className="">
                     <i className="bx-fw bx bxs-user text-base -translate-y-1.5"></i>
                     <strong>All Users</strong>
                  </p>
               </div>

               <div className="p-4">
                  <table className="table-auto border grid w-full rounded-md overflow-x-auto">
                     <thead className="bg-neutral-100">
                        <tr className="grid grid-cols-4">
                           <th className="p-2">Name</th>
                           <th className="p-2">Email</th>
                           <th className="p-2">Role</th>
                           <th className="p-2">Created</th>
                        </tr>
                     </thead>
                     <tbody>
                        {users.map(({ _id, name, email, role, created }) => {
                           return (
                              <tr key={_id} className="grid grid-cols-4 text-base border-t border-t-neutral-200">
                                 <td className="p-2 text-center truncate">{name}</td>
                                 <td className="p-2 text-center truncate">{email}</td>
                                 <td className="p-2 text-center truncate">{capitalize(role)}</td>
                                 <td className="p-2 text-center truncate">{created}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Customers;
