import { memo, useState } from "react";
import BtnAddCart from "../../buttons/BtnAddCart";
import BtnWishlist from "../../buttons/BtnWishlist";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../../../../utils/settings";

const CardProduct = ({ _id, name, brand, images, price, stock, discount }) => {
   const navigate = useNavigate();

   return (
      <div className="card overflow-hidden cursor-pointer" title={name}>
         <div className="card-header relative">
            <img src={require(`../../../../../assets/images/products/${images[0]}`)} alt={name} className="product-img h-52 w-full object-cover rounded-md" />
            <BtnWishlist size="2xl" position="absolute top-1 right-2" />
            {discount ? <div className="dicount bg-rose-600 absolute top-2.5 left-2 w-9 font-semibold text-xs text-white py-0.5 rounded-sm text-center">{discount}%</div> : null}
         </div>
         <div className="card-body py-2 flex justify-between items-center">
            <div className="w-5/6" onClick={() => navigate(`/shop/detail/${_id}`)}>
               <div className="product-name truncate">
                  <span>{name}</span>
               </div>
               <div className="product-price font-semibold">
                  {discount ? (
                     <>
                        <span>{convertPrice(price, discount)}</span>
                        <del className="text-xs text-neutral-500 -translate-y-1 font-light inline-block ms-1">{convertPrice(price)}</del>
                     </>
                  ) : (
                     <span>{convertPrice(price)}</span>
                  )}
               </div>
            </div>
            <BtnAddCart _id={_id} name={name} brand={brand} images={images} price={price} stock={stock} discount={discount} />
         </div>
      </div>
   );
};

export default memo(CardProduct);
