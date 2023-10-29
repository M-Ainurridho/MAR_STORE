import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Settings, { convertPrice } from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";
import axios from "axios";

const Dashboard = () => {
   Settings("Payments");

   const navigate = useNavigate();

   const { _id } = useSelector((state) => state.user.data);
   const [payments, setPayments] = useState([]);
   const [total, setTotal] = useState(null);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/user/payments/${_id}`);
         setPayments(response.data.payload);
      } catch (err) {
         console.log("error: ", err);
      }
   };

   return (
      <section id="payments">
         <CrumbNTitle breadcrumbs={"Member"}>
            <strong>Payments</strong>
         </CrumbNTitle>

         <div className="p-6 text-lg">
            <div className="bg-white rounded-md border border-neutral-200">
               <div className="py-2 px-4 border-b border-b-neutral-200">
                  <p className="">
                     <i className="bx-fw bx bxs-purchase-tag text-base -translate-y-1.5"></i>
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
                        {payments.map(({ _id, paymentCode, paymentStatus, items }) => {
                           return (
                              <tr key={_id} className="grid grid-cols-4 text-base border-t border-t-neutral-200">
                                 <td className="p-2 text-center border-r border-r-neutral-200 truncate">{paymentCode.toUpperCase()}</td>
                                 <td className="p-2 text-center truncate">{convertPrice(items.reduce((total, { price, quantity, discount }) => total + (price * quantity - (discount / 100) * (price * quantity)), 0))}</td>
                                 <td className="p-2 text-center border-x border-x-neutral-200 truncate">
                                    <span className={`text-sm text-white ${paymentStatus === 1 ? "bg-neutral-400" : paymentStatus === 2 ? "bg-yellow-400" : "bg-green-500"} font-semibold px-3 py-1 rounded-md`}>
                                       {paymentStatus === 1 ? "Menunggu Pembayaran" : paymentStatus === 2 ? "Menunggu Konfirmasi Admin" : "Sudah Melakukan Pembayaran"}
                                    </span>
                                 </td>
                                 <td className="p-2 text-center font-medium flex gap-1 justify-center truncate">
                                    <i
                                       className="bx bxs-info-circle flex items-center px-1 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-md hover:shadow-green-300 duration-100 text-white cursor-pointer"
                                       onClick={() => navigate(`/member/payments/detail/${_id}`)}
                                    ></i>
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
   );
};

export default Dashboard;
