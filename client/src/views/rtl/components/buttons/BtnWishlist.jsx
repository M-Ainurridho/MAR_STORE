import { useState } from "react";

const BtnWishlist = ({ size, position = "" }) => {
   const [wishlist, setWishlist] = useState(false);

   return (
      <>{wishlist ? <i className={`bx bxs-heart text-${size} ${position} text-rose-600`} onClick={() => setWishlist(!wishlist)}></i> : <i className={`bx bx-heart text-${size} ${position} `} onClick={() => setWishlist(!wishlist)}></i>}</>
   );
};

export default BtnWishlist;
