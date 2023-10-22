import Settings from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";

const Dashboard = () => {
   Settings("Payments");

   return (
      <section id="dashboard">
         <CrumbNTitle breadcrumbs={"Member"}>
            <strong>Payments</strong>
         </CrumbNTitle>

         <div className="p-6 text-lg">
            <div className="bg-white rounded-md border border-neutral-200">
               <div className="py-2 px-4 border-b border-b-neutral-200">
                  <p className="">
                     <i className="bx-fw bx bxs-folder text-base -translate-y-1.5"></i>
                     <strong>All Purchases</strong>
                  </p>
               </div>

               <div className="p-4">
                  <table className="table-auto border grid w-full rounded-md overflow-x-auto">
                     <thead className="bg-neutral-100">
                        <tr className="grid grid-cols-4 grid-flow-row-dense">
                           <th className="p-2">Code</th>
                           <th className="p-2">Must Pay</th>
                           <th className="p-2">Status</th>
                           <th className="p-2">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className="grid grid-cols-4 text-base border-t border-t-neutral-200">
                           <td className="p-2 text-center border-r border-r-neutral-200 truncate">#KODSDIHADAS</td>
                           <td className="p-2 text-center truncate">RP 191.000.000</td>
                           <td className="p-2 text-center border-x border-x-neutral-200 truncate">
                              <span className="text-sm bg-yellow-400 font-semibold px-3 py-1 rounded-md">Menunggu Konfirmasi Pembayaran</span>
                           </td>
                           <td className="p-2 text-center font-medium flex gap-1 justify-center truncate">
                              <i className="bx bxs-info-circle flex items-center px-1 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-md hover:shadow-green-300 duration-100 text-white cursor-pointer"></i>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Dashboard;
