import { useDispatch } from "react-redux";
import { onPageChange } from "../redux/reducers";
import { useEffect } from "react";

export const capitalize = (text) => {
   const firstWord = text.slice(0, 1).toUpperCase();
   const slices = text.slice(1);
   return firstWord + slices;
};

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

export const convertPrice = (price, discount = 0, quantity = 1) => {
   let cost;
   if (discount) {
      cost = new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
      }).format(price * quantity - ((discount / 100) * (price * quantity)));
   } else {
      cost = new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
      }).format(price * quantity);
   }

   cost = cost.split(",");
   cost.pop();
   return cost.join();
};

export const randomCode = (maks) => {
   const data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F","G", "H", "I",  "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

   let result = "";
   for (let i = 0; i < maks; i++) {
      const rand = Math.floor(Math.random()*data.length)
      const code = data[rand]
      result += code
   }

   return `#${result}`
}

export default Settings;
