import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertPrice } from "../../../../utils/settings";
import axios from "axios";

const PaymentDetailComp = ({ children }) => {
   // const navigate = useNavigate();
   const { _id } = useParams();

   const [detail, setDetail] = useState({});
   const [items, setItems] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/user/payments/detail/${_id}`);
         setDetail(response.data.payload);
         setItems(response.data.payload.items);
      } catch (err) {
         console.log("error: ", err);
      }
   };

   return (
      <div className="p-6 text-lg flex flex-col md:flex-row gap-5">
         <div className="basis-3/5">
            <div className="bg-white rounded-md border border-neutral-200 ">
               <div className="py-2 px-4 border-b border-b-neutral-200">
                  <strong>Details</strong>
               </div>

               <div className="detail-body p-4 py-2">
                  <div className="text-base mb-1">
                     <strong>Payment Code :</strong> {detail.paymentCode}
                  </div>
                  <div className="text-base mb-1">
                     <strong>Payment Status :</strong>
                     <span className={`text-sm text-white ${detail.paymentStatus === 1 ? "bg-neutral-400" : detail.paymentStatus === 2 ? "bg-yellow-400" : "bg-green-500"} font-semibold px-3 py-1 rounded-md ml-1`}>
                        {detail.paymentStatus === 1 ? "Menunggu Pembayaran" : detail.paymentStatus === 2 ? "Menunggu Konfirmasi Admin" : "Sudah Melakukan Pembayaran"}
                     </span>
                  </div>
                  <div className="text-base mb-1">
                     <strong>Orders :</strong>
                     <ul className="list-disc ml-5">
                        {items.map((item) => {
                           return (
                              <li key={item._id}>
                                 {item.name} / {convertPrice(item.price, item.discount, item.quantity)} / {item.quantity} item(s) / discount {item.discount}%
                              </li>
                           );
                        })}
                     </ul>
                  </div>
                  <div className="text-base mb-1">
                     <strong>Total Payment :</strong>
                     <span className="ml-1">{convertPrice(items.reduce((total, { price, quantity, discount }) => total + (price * quantity - (discount / 100) * (price * quantity)), 0))}</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="basis-2/5">
            <div className="bg-white rounded-md border border-neutral-200">
               <div className="py-2 px-4 border-b border-b-neutral-200">
                  <strong>Proof of Payment</strong>
               </div>

               <div className="img-evidence p-4 pb-0 overflow-hidden">
                  {detail.receipt !== undefined && <img src={require(`../../../../assets/images/proof_of_payment/${detail.receipt}`)} alt="evidence" className="rounded-md shadow-md" />}
               </div>

               {children}
            </div>
         </div>
      </div>
   );
};

export default PaymentDetailComp;
