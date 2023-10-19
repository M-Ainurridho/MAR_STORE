import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CartQuantity = ({ _id, quantity, quantityChange, update }) => {
   const user = useSelector((state) => state.user.data);
   let [qty, setQty] = useState(1);

   const increase = () => {
      setQty(++qty);
      quantityChange(_id, qty);
   };

   const decrement = () => {
      setQty(qty < 2 && qty === 1 ? quantity : --qty);

      quantityChange(_id, qty);
   };

   const deleteOrder = async () => {
      const payload = {
         user_id: user._id,
         _id,
      };
      await axios.delete("http://localhost:3000/user/cart", { data: payload });
      update();
   };

   useEffect(() => {
      setQty(quantity);
   }, []);

   return (
      <div className="cart-quantity flex flex-col items-center">
         <div className="cart-button">
            <button className="bg-green-500 hover:bg-green-600 px-2.5 py-1 rounded-l-md border border-green-500 hover:border-green-600 text-white" onClick={decrement}>
               -
            </button>
            <span className="cart-quantity inline-block w-24 py-1 text-center border border-neutral-200 bg-neutral-100">{qty}</span>
            <button className="bg-green-500 hover:bg-green-600 px-2.5 py-1 rounded-r-md border border-green-500 hover:border-green-600 text-white" onClick={increase}>
               +
            </button>
         </div>
         <p className="delete-cart my-1 text-neutral-600 hover:text-red-500 duration-200 cursor-pointer bg-red-300 inline-block" onClick={deleteOrder}>
            <i className="bx bxs-trash-alt mx-0.5"></i> remove
         </p>
      </div>
   );
};

export default CartQuantity;
