import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Settings, { convertPrice } from "../utils/settings";
import CartQuantity from "../components/shop/Cart/CartQuantity";
import axios from "axios";

const Cart = () => {
   Settings("Cart");

   const navigate = useNavigate();
   const { authentication, data } = useSelector((state) => state.user);

   const [carts, setCarts] = useState([]);

   const fetchCartData = async () => {
      try {
         const res = await axios.get(`http://localhost:3000/user/cart/${data._id}`);
         setCarts(res.data.payload);
      } catch (err) {
         console.log("error: ", err);
      }
   };

   const onQuantityChange = (_id, qty) => {
      const updateQuantity = carts.map((cart) => {
         if (cart._id === _id) {
            cart.quantity = qty;
         }
         return cart;
      });

      setCarts(updateQuantity);
   };

   const updateAfterRemove = () => {
      fetchCartData();
   };

   useEffect(() => {
      if (!authentication) {
         navigate("/auth/signin");
      } else {
         fetchCartData();
      }

      // const subtotalPrice = carts.reduce((total, value) => total + value.price * value.quantity, 0);
      // setSubtotal(subtotalPrice);
      // const totalPrice = carts.reduce((total, value) => total + value.price * 2 - (value.discount / 100) * value.price * 2, 0);
      // // console.log(convertPrice(totalPrice));
   }, []);

   return (
      <>
         <section id="cart" className="px-16 my-5 flex gap-x-3">
            <div className="cart-left basis-3/5 border">
               <h1 className="text-2xl font-bold mb-3">Cart</h1>
               {carts.map(({ _id, name, image, price, quantity, discount }) => {
                  return (
                     <div key={_id} className="cart-items flex border-t py-3">
                        <div className="relative">
                           <img src={require(`../assets/images/products/${image[0]}`)} alt="" className="w-44 h-36 object-cover rounded-md" />
                           {discount ? <div className="dicount bg-rose-600 absolute top-2.5 left-2 w-9 font-semibold text-xs text-white py-0.5 rounded-sm text-center">{discount}%</div> : null}
                        </div>
                        <div className="cart-body w-full flex items-center justify-between ml-3">
                           <h3 className="cart-name text-lg font-medium">{name}</h3>
                           <CartQuantity _id={_id} quantity={quantity} quantityChange={(_id, qty) => onQuantityChange(_id, qty)} update={() => updateAfterRemove()} />

                           <div className="cart-price font-semibold text-lg">
                              {discount ? (
                                 <>
                                    <p>{convertPrice(price, discount)}</p>
                                    <del className="font-light text-base">{convertPrice(price)}</del>
                                 </>
                              ) : (
                                 <p>{convertPrice(price)}</p>
                              )}
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </section>
      </>
   );
};

export default Cart;

/* <div className="cart-right basis-2/5 border p-2 px-4">
   <h4 className="font-medium mb-1">Delivery</h4>
   <div className="expedisi flex gap-x-1 border border-neutral-200 bg-neutral-100 w-52 rounded-md p-0.5 my-2">
      <button className="bg-white basis-1/2 text-sm font-bold py-1 rounded-md shadow">Free</button>
      <button className="basis-1/2 text-sm font-bold py-1 rounded-md">Express: $99.9</button>
   </div>
   <p className="text-sm text-neutral-400">Delivery date: {new Date().toLocaleDateString()}</p>
   <div className="subtotal border-t border-b border-dashed py-2 mt-2">
      <ul>
         <li className="font-semibold text-lg my-1 flex justify-between">
            <span>Subtotal</span> <span>{convertPrice(subtotal)}</span>
         </li>
         <li className=" my-1 flex justify-between">
            <span>Discount</span> <span>{convertPrice(0)}</span>
         </li>
         <li className=" my-1 flex justify-between">
            <span>Delivery</span> <span>{convertPrice(0)}</span>
         </li>
      </ul>
   </div>
</div>; */
