import Footer from "../../components/Footer";
import Navbar from "../rtl/components/navbars/Navbar";
import { useSelector } from "react-redux";
import FloatAlert from "../../components/alerts/FloatAlert";

const Layout = ({ children }) => {
   return (
      <div className="grid h-screen">
         <Navbar />
         <Main>{children}</Main>
         <Footer bgColor="bg-neutral-800" color="text-white" />
      </div>
   );
};

const Main = ({ children }) => {
   const { condition } = useSelector((state) => state.alert);

   return (
      <>
         <main id="rtl-layout" className="mt-screen-13">
            {children}
         </main>
         {condition && <FloatAlert message={"Please Signin Before"} color={"bg-red-500"} />}
      </>
   );
};

export default Layout;
