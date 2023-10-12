import { Link } from "react-router-dom";
import Xiaomi from "../assets/images/brands/xiaomi.png";
import Samsung from "../assets/images/brands/samsung.png";
import Asus from "../assets/images/brands/asus.png";
import Apple from "../assets/images/brands/apple.png";
import Acer from "../assets/images/brands/acer.png";
import Vivo from "../assets/images/brands/vivo.png";
import Lenovo from "../assets/images/brands/lenovo.png";

const Brands = () => {
   return (
      <>
         <section id="brands" className="px-16 my-8">
            <div className="flex justify-between items-end">
               <h1 className="font-bold text-2xl">Brands</h1>
               <Link className="text-sm pe-5 hover:text-green-500 duration-200">
                  View all
               </Link>
            </div>
            <div className="all-brand flex justify-between mt-5 items-center px-5">
               <img src={Xiaomi} className="w-8 h-8" alt="" />
               <img src={Samsung} className="w-14 h-14" alt="" />
               <img src={Asus} className="w-14 h-14" alt="" />
               <img src={Apple} className="w-8 h-8" alt="" />
               <img src={Acer} className="w-14 h-14" alt="" />
               <img src={Vivo} className="w-14 h-14" alt="" />
               <img src={Lenovo} className="w-14 h-14" alt="" />
            </div>
         </section>
      </>
   );
};

export default Brands;
