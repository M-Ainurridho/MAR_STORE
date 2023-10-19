import { useHref, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Settings, { convertPrice } from "../../../utils/settings";
import CartQuantity from "../components/shop/CartQuantity";
import axios from "axios";
import { alertOff, alertOn } from "../../../redux/reducers";

const Cart = () => {
   Settings("Cart");

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { authentication, data } = useSelector((state) => state.user);
   const [carts, setCarts] = useState([]);

   const fetchCarts = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/user/cart/${data._id}`);
         setCarts(response.data.payload);
      } catch (err) {
         console.log("error: ", err);
      }
   };

   const updateQuantity = async (_id, quantity) => {
      try {
         const response = await axios.patch(`http://localhost:3000/user/cart/${_id}`, { user_id: data._id, quantity });
         response.status === 200 && fetchCarts();
      } catch (err) {
         console.log("error: ", err);
      }
   };

   useEffect(() => {
      if (!authentication) {
         dispatch(alertOn());
         navigate("/");
      }

      fetchCarts();
   }, []);

   return (
      <>
         <section id="cart" className="px-16 my-5 flex gap-x-3">
            <div className="cart-left basis-3/5">
               <h1 className="text-2xl font-bold mb-3">Cart</h1>
               {carts.map(({ _id, name, image, price, quantity, discount }) => {
                  return (
                     <div key={_id} className="cart-items flex border-t py-3">
                        <div className="relative">
                           <img src={require(`../../../assets/images/products/${image[0]}`)} alt="" className="w-44 h-36 object-cover rounded-md" />
                           {discount ? <div className="dicount bg-rose-600 absolute top-2.5 left-2 w-9 font-semibold text-xs text-white py-0.5 rounded-sm text-center">{discount}%</div> : null}
                        </div>
                        <div className="cart-body w-full flex items-center justify-between ml-3">
                           <h3 className="cart-name text-lg font-medium">{name}</h3>
                           <CartQuantity _id={_id} qty={quantity} update={(_id, quantity) => updateQuantity(_id, quantity)} />

                           <div className="cart-price font-semibold text-lg">
                              {discount ? (
                                 <>
                                    <p>{convertPrice(price, discount, quantity)}</p>
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
