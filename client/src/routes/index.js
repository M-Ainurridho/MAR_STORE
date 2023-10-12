import AdminRouter from "./admin-router";
import AuthRouter from "./auth-router";
import RTL from "./rtl-router";
// import MemberRouter from "./member-router";
import { useHref } from "react-router-dom";

const Router = () => {
   let href = useHref();
   href = href.split("/")[1];

   return (
      <>
         {href === "admin" ? (
            <AdminRouter />
         ) : href === "auth" ? (
            <AuthRouter />
         ) : (
            //       href === "user" ? <MemberRouter /> :
            <RTL />
         )}
      </>
   );
};

export default Router;
