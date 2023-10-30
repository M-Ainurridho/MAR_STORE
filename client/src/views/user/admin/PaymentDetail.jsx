import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Settings, { convertPrice } from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";
import axios from "axios";
import PaymentDetailComp from "../components/payments/PaymentDetailComp";

const A_PaymentDetail = () => {
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
         <CrumbNTitle breadcrumbs={"Admin / Payment Confirmation"}>
            <strong>Detail Payment</strong>
         </CrumbNTitle>

         <PaymentDetailComp>
            <div className="p-4 flex gap-x-3">
               <button className="w-full bg-red-500 hover:bg-red-600 duration-100 rounded-md text-white text-center text-base py-1 font-semibold">Reject</button>
               <button className="w-full bg-green-500 hover:bg-green-600 duration-100 rounded-md text-white text-center text-base py-1 font-semibold">Confirm</button>
            </div>
         </PaymentDetailComp>
      </section>
   );
};

export default A_PaymentDetail;
