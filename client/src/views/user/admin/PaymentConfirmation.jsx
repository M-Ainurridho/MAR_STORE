import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Settings, { convertPrice } from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";
import axios from "axios";

const PaymentConfirmation = () => {
   Settings("Payments");

   const navigate = useNavigate();
   const [buyers, setBuyers] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/user/payments?status=2`);
         setBuyers(response.data.payload);
      } catch (err) {
         console.log("error: ", err);
      }
   };

   // console.log(payments);

   return (
      <section id="payments">
         <CrumbNTitle breadcrumbs={"Admin"}>
            <strong>Payment Confirmation</strong>
         </CrumbNTitle>

         <div className="p-6 text-lg">
            <div className="bg-white rounded-md border border-neutral-200">
               <div className="py-2 px-4 border-b border-b-neutral-200 items-center text-end">
                  <button className="inline-block bg-green-500 hover:bg-green-600 duration-100 text-white text-base font-semibold rounded-md px-4 py-0.5 cursor-pointer">Confirmed Payment</button>
               </div>

               <div className="p-4">
                  <table className="table-auto border grid w-full rounded-md overflow-x-auto">
                     <thead className="bg-neutral-100">
                        <tr className="grid grid-cols-4 grid-flow-row-dense">
                           <th className="p-2">Buyer</th>
                           <th className="p-2">Payment Code</th>
                           <th className="p-2">Status</th>
                           <th className="p-2">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {buyers.map(({ name, payments }, i) => {
                           return (
                              <Fragment key={i}>
                                 {payments.map(({ _id, paymentCode }) => {
                                    return (
                                       <tr key={_id} className="grid grid-cols-4 text-base border-t border-t-neutral-200">
                                          <td className="p-2 text-center border-r border-r-neutral-200 truncate">{name}</td>
                                          <td className="p-2 text-center truncate">{paymentCode.toUpperCase()}</td>
                                          <td className="p-2 text-center border-x border-x-neutral-200 truncate">
                                             <span className={`text-sm text-white bg-yellow-400 font-semibold px-3 py-1 rounded-md`}>Menunggu Konfirmasi Admin</span>
                                          </td>
                                          <td className="p-2 text-center font-medium flex gap-1 justify-center truncate">
                                             <i
                                                className="bx bxs-info-circle flex items-center px-1 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-md hover:shadow-green-300 duration-100 text-white cursor-pointer"
                                                onClick={() => navigate(`/admin/payment_confirmation/detail/${_id}`)}
                                             ></i>
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
   );
};

export default PaymentConfirmation;
