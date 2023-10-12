import Footer from "../../components/Footer";
import Navbar from "../rtl/components/navbars/Navbar";

const Layout = ({ children }) => {
   return (
      <div className="grid h-screen">
         <Navbar />
         <main id="rtl-layout" className="mt-screen-13">
            {children}
         </main>
         <Footer bgColor="bg-neutral-800" color="text-white" />
      </div>
   );
};

export default Layout;
