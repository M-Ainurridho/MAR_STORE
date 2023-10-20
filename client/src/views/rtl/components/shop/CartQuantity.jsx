import { useEffect, useState } from "react";

const CartQuantity = ({ _id, qty, update }) => {
   let [quantity, setQuantity] = useState(0);

   const increase = () => {
      setQuantity(++quantity);
      update(_id, quantity);
   };

   const decrement = () => {
      setQuantity(quantity <= 1 ? 1 : --quantity);
      update(_id, quantity);
   };

   useEffect(() => {
      setQuantity(qty);
   }, []);

   return (
      <div className="cart-quantity flex flex-col items-center">
         <div className="cart-button">
            <button className="bg-green-500 hover:bg-green-600 px-2.5 py-1 rounded-l-md border border-green-500 hover:border-green-600 text-white" onClick={decrement}>
               -
            </button>
            <span className="cart-quantity inline-block w-24 py-1 text-center border border-neutral-200 bg-neutral-100">{quantity}</span>
            <button className="bg-green-500 hover:bg-green-600 px-2.5 py-1 rounded-r-md border border-green-500 hover:border-green-600 text-white" onClick={increase}>
               +
            </button>
         </div>
         <p className="delete-cart my-1 text-neutral-600 hover:text-red-500 duration-100 cursor-pointer inline-block">
            <i className="bx bxs-trash-alt translate-y-0.5"></i> remove
         </p>
      </div>
   );
};

export default CartQuantity;
