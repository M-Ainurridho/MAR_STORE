import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearCategoryMenu } from "../../../redux/reducers";
import Settings from "../../../utils/settings";
import BreadCrumbs from "../components/shop/BreadCrumbs";
import Sidebar from "../components/shop/Sidebar";
import Products from "../components/shop/products/Products";

const Shop = () => {
   Settings("Shop");
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(clearCategoryMenu());
   }, []);

   return (
      <>
         <BreadCrumbs />
         <div className="px-4 md:px-8 lg:px-16 md:flex md:gap-x-3 lg:gap-x-6">
            <Sidebar />
            <Products />
         </div>
      </>
   );
};

export default Shop;
