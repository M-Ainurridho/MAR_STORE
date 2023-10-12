import { Link } from "react-router-dom";

const BtnShopNow = () => {
   return (
      <Link to="/shop" className="relative px-3 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 duration-200 flex items-center">
         <span className="font-medium">Shop now</span> <i className="bx bx-right-arrow-alt mt-0.5"></i>
      </Link>
   );
};

export default BtnShopNow;
