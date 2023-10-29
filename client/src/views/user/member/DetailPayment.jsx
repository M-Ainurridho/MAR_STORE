import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Settings, { convertPrice } from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";
import Img from "../../../assets/images/products/laptop1.jpg"
import axios from "axios";

const DetailPayment = () => {
   Settings("Detail Payment");

   const { _id } = useParams();
   const [detail, setDetail] = useState({})
   const [items, setItems] = useState([])
   const [receipt, setReceipt] = useState(null)

   useEffect(() => {
      fetchData()
   }, []);

   const fetchData = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/user/payments/detail/${_id}`)
         setDetail(response.data.payload)
         setItems(response.data.payload.items)
      } catch (err) {
         console.log("error: ", err)
      }
   }

   const onSubmit = (e) => {
      e.preventDefault()

      console.log(receipt)
   }

   return (
      <section id="detail-payments">
         <CrumbNTitle breadcrumbs={"Member / Payments"}>
            <strong>Detail Payment</strong>
         </CrumbNTitle>

         <div className="p-6 text-lg flex gap-5">

            <div className="basis-3/5">
               <div className="bg-white rounded-md border border-neutral-200 ">
                  <div className="py-2 px-4 border-b border-b-neutral-200">
                     <strong>Detail Payments</strong>
                  </div>

                  <div className="detail-body p-4 py-2">
                     <p className="text-base mb-1">
                        <strong>Payment Code :</strong> {detail.paymentCode.toUpperCase()}
                     </p>
                     <p className="text-base mb-1">
                        <strong>Payment Status :</strong>
                        <span className={`text-sm text-white ${detail.paymentStatus === 1 ? "bg-neutral-400" : detail.paymentStatus === 2 ? "bg-yellow-400" : "bg-green-500"} font-semibold px-3 py-1 rounded-md ml-1`}>{detail.paymentStatus === 1 ? "Menunggu Pembayaran" : detail.paymentStatus === 2 ? "Menunggu Konfirmasi" : "Sudah Melakukan Pembayaran"}</span>
                     </p>
                     <p className="text-base mb-1">
                        <strong>Orders :</strong> 
                        <ul className="list-disc ml-5">
                           {items.map(item => {
                              return (
                                 <li key={item._id}>
                                    {item.name} / 
                                    {convertPrice(item.price, item.discount, item.quantity)} / 
                                    {item.quantity} item(s) / discount {item.discount}%
                                 </li>
                              )
                           })}
                        </ul>
                     </p>
                     <p className="text-base mb-1">
                        <strong>Total Payment :</strong> 
                        <span className="ml-1">{convertPrice(items.reduce((total, { price, quantity, discount }) => total + (price * quantity - (discount / 100) * (price * quantity)), 0))}</span>
                     </p>
                  </div>
               </div>
            </div>

            <div className="basis-2/5">
               <div className="bg-white rounded-md border border-neutral-200">
                  <div className="py-2 px-4 border-b border-b-neutral-200">
                     <strong>Proof of Payment*</strong>
                  </div>

                  <div className="img-evidence p-4 pb-0 overflow-hidden">
                     <img src={Img} alt="evidence" className="rounded-md shadow-md" />
                  </div>

                  <form onSubmit={onSubmit}>
                     <div className="proof-of-payment p-4">
                        <label className="block">
                           <span className="sr-only">Choose profile photo</span>
                           <input
                              type="file"
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:rounded-md"
                              onChange={(e) => setReceipt(e.target.files[0])}
                              />
                        </label>
                        <p className="text-red-500 text-xs mt-1">Max size: 2mb</p>
                     </div>
                     <div className="p-4 pt-0">
                        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 duration-100 text-white text-base font-semibold px-4 py-2 rounded-md">
                           Upload
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default DetailPayment;
