import { useHref, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/reducers";
import Navbar from "../user/components/navbars/Navbar";
import Sidebar from "../user/components/sidebar/Sidebar";
import Footer from "../../components/Footer";
import Forbidden from "../errors/Forbidden";
import axios from "axios";

const Layout = ({ children }) => {
   const href = useHref();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { authentication, data } = useSelector((state) => state.user);
   const [isCollapse, setIsCollapse] = useState(false);
   const [haveAccess, setHaveAccess] = useState(null);

   useEffect(() => {
      if (!authentication) {
         localStorage.removeItem("token");
         dispatch(signOut());
         navigate("/auth/signin");
      } else {
         userAccessCheck();
      }
   }, []);

   const userAccessCheck = async () => {
      const menu = href.split("/")[1];

      if (menu !== "user") {
         try {
            const res = await axios.get(`http://localhost:3000/user/access?menu=${menu}&role=${data.role}`);
            res.data.status === 200 && setHaveAccess(true);
         } catch (err) {
            setHaveAccess(false);
         }
      }
   };

   return (
      <>
         {haveAccess === false ? (
            <Forbidden />
         ) : (
            <div className="grid">
               <Sidebar isCollapse={isCollapse} setCollapse={setIsCollapse} />

               <div className={`w-full ${isCollapse ? "md:w-95%" : "md:w-3/4 lg:w-4/5"} min-h-screen grid justify-self-end bg-neutral-100`}>
                  <Navbar isCollapse={isCollapse} setCollapse={setIsCollapse} />
                  <main className="mt-screen-10">{children}</main>
                  <Footer bgColor="bg-slate-800" />
               </div>
            </div>
         )}
      </>
   );
};

export default Layout;
