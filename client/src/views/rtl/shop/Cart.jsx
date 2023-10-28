import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { alertOn } from "../../../redux/reducers";
import Settings, { convertPrice } from "../../../utils/settings";
import CartQuantity from "../components/shop/CartQuantity";
import axios from "axios";
import LoadingPage from "../../../components/loadings/LoadingPage";

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
      console.log(_id);
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
      } else {
         fetchCarts();
      }
   }, []);

   return (
      <>
         <section id="cart" className="px-16 my-5 grid grid-cols-3 gap-x-4">
            <div className="cart-left self-start col-span-2 px-3 py-2 border border-neutral-200 rounded-md shadow">
               <h3 className="text-2xl font-bold mb-2">Cart</h3>
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

            <div className="checkout self-start p-3 font-medium border border-neutral-200 rounded-md shadow-md">
               <h3 className="font-semibold mb-2">Delivery</h3>
               <div className="ongkir bg-neutral-100 border border-neutral-300 inline-block rounded-md py-1 px-0.5 mb-2">
                  <span className="ongkir1 bg-white px-2 py-1 rounded-md font-bold shadow-md">Free</span>
                  <span className="ongkir2 px-2 py-1 font-bold">JNE: Rp. 9000</span>
               </div>
               <div className="text-sm text-neutral-500 mb-2">Delivery date: {new Date().toLocaleDateString()}</div>
               <div className="border-y border-neutral-300 border-dotted py-3">
                  <div className="flex justify-between font-semibold text-lg my-1">
                     <h5>Subtotal</h5>
                     <p>{convertPrice(carts.reduce((total, { price, quantity }) => total + price * quantity, 0))}</p>
                  </div>
                  <div className="flex justify-between text-neutral-500 text-sm my-1">
                     <h5>Discount</h5>
                     <p>{convertPrice(carts.reduce((total, { price, quantity, discount }) => total + (discount / 100) * (price * quantity), 0))}</p>
                  </div>
                  <div className="flex justify-between text-neutral-500 text-sm my-1">
                     <h5>Delivery</h5>
                     <p>Rp 0,00-</p>
                  </div>
               </div>
               <div className=" py-3">
                  <div className="flex justify-between font-semibold text-lg my-1">
                     <h5>Total</h5>
                     <p>{convertPrice(carts.reduce((total, { price, quantity, discount }) => total + (price * quantity - (discount / 100) * (price * quantity)), 0))}</p>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 duration-100 text-white w-full px-2 py-1 rounded-md font-semibold" onClick={() => navigate("/cart/checkout")}>
                     Checkout
                  </button>
               </div>
            </div>
         </section>
      </>
   );
};

export default Cart;
