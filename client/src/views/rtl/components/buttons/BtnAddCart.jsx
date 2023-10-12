import { useSelector } from "react-redux";
import { useState } from "react";
import Alert from "../../../../components/alerts/Alert";
import axios from "axios";

const BtnAddCart = ({ _id, name, brand, image, price, stock, discount }) => {
   const { authentication, data } = useSelector((state) => state.user);

   const [isLogin, setIsLogin] = useState(null);
   const [existCart, setExistCart] = useState(false);

   const onHandleCart = async () => {
      if (!authentication) {
         setIsLogin(false);
      } else {
         try {
            const cart = await axios.post("http://localhost:3000/user/addcart", { user_id: data._id, _id, name, brand, image, price, quantity: 1, discount });
         } catch {
            setExistCart(true);
         }
      }
   };

   return (
      <>
         <div className="cart w-8 h-8 bg-neutral-800 hover:bg-neutral-900 rounded-md overflow-hidden">
            <i className="bx bx-cart text-lg text-white w-full h-full text-center leading-8 cursor-pointer" onClick={onHandleCart}></i>

            {existCart && <Alert message="Product is already in the cart!" color="bg-red-500" show={(cond) => setExistCart(cond)} />}

            {isLogin === false && <Alert message="Please signin before you add cart" color="bg-red-500" show={(cond) => setIsLogin(cond)} />}
         </div>
      </>
   );
};

export default BtnAddCart;
