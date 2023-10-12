import { useDispatch } from "react-redux";
import { onPageChange } from "../redux/reducers";
import { useEffect } from "react";

const setTitle = (page, access) => {
   access === "admin" ? (document.title = `${page} | Admin`) : (document.title = `${page} | MAR STORE`);
};

const Settings = (name, access = "") => {
   const dispatch = useDispatch();

   useEffect(() => {
      setTitle(name, access);
      dispatch(onPageChange(name));
   }, []);
};

export const convertPrice = (price, discount = 0) => {
   let cost;
   if (discount) {
      cost = new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
      }).format(price - (discount / 100) * price);
   } else {
      cost = new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
      }).format(price);
   }

   cost = cost.split(",");
   cost.pop();
   return cost.join();
};

export default Settings;
