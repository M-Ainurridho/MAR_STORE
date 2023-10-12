import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { signOut } from "../../redux/reducers";
import Navbar from "../admin/components/navbars/Navbar";
import Sidebar from "../admin/components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
   const [isCollapse, setIsCollapse] = useState(false);

   const { authentication } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (!authentication) {
         localStorage.removeItem("token");
         dispatch(signOut());
         navigate("/auth/signin");
      }
   }, []);

   return (
      <div className="grid">
         <Sidebar isCollapse={isCollapse} setCollapse={setIsCollapse} />

         <div className={`w-full ${isCollapse ? "md:w-95%" : "md:w-3/4 lg:w-4/5"} min-h-screen grid justify-self-end bg-neutral-100`}>
            <Navbar isCollapse={isCollapse} setCollapse={setIsCollapse} />
            <main className="mt-screen-10">{children}</main>
            <Footer bgColor="bg-slate-800" />
         </div>
      </div>
   );
};

export default Layout;
