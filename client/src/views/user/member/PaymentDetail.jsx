import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Settings, { convertPrice } from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";
import axios from "axios";
import PaymentDetailComp from "../components/payments/PaymentDetailComp";

const M_PaymentDetail = () => {
   Settings("Detail Payment");

   const navigate = useNavigate();
   const { _id } = useParams();

   const [detail, setDetail] = useState({});
   const [items, setItems] = useState([]);
   const [receipt, setReceipt] = useState(null);
   const [error, setError] = useState("");

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

   const onSubmit = async (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append("upload_proof", receipt);

      try {
         const response = await axios.patch(`http://localhost:3000/user/payments/${detail._id}`, data, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });

         response.status === 200 && navigate("/member/payments");
      } catch (err) {
         setError(err.response.data.message);
      }
   };

   return (
      <section id="detail-payments">
         <CrumbNTitle breadcrumbs={"Member / Payments"}>
            <strong>Detail Payment</strong>
         </CrumbNTitle>

         <PaymentDetailComp>
            <form onSubmit={onSubmit}>
               <div className="proof-of-payment p-4">
                  <label className="block">
                     <span className="sr-only">Choose profile photo</span>
                     <input
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:rounded-md"
                        onChange={(e) => setReceipt(e.target.files[0])}
                        required
                     />
                  </label>
                  <p className="text-red-500 text-xs mt-1">Max size*: 2mb || Extension: (jpg, jpeg, png)</p>
                  {error && (
                     <p className="text-red-500 text-base mt-1 flex items-center">
                        <i className="bx bxs-info-circle mr-1"></i> <span className="text-sm">{error}</span>
                     </p>
                  )}
               </div>
               <div className="p-4 pt-0">
                  <button type="submit" className="w-full bg-green-500 hover:bg-green-600 duration-100 text-white text-base font-semibold px-4 py-2 rounded-md">
                     Upload
                  </button>
               </div>
            </form>
         </PaymentDetailComp>
      </section>
   );
};

export default M_PaymentDetail;
