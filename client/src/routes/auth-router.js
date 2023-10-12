import { Route, Routes } from "react-router-dom";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/SignUp";
import SignOut from "../views/auth/SignOut";

const AuthRouter = () => {
   return (
      <Routes>
         <Route path="/auth/signin" element={<SignIn />}></Route>
         <Route path="/auth/signup" element={<SignUp />}></Route>
         <Route path="/auth/signout" element={<SignOut />}></Route>
      </Routes>
   );
};

export default AuthRouter;
