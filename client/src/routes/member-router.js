import { Route, Routes } from "react-router-dom";
import M_Dashboard from "../pages/Member/Dashboard";

const MemberRouter = () => {
   return (
      <Routes>
         <Route path="/user" element={<M_Dashboard />}></Route>
      </Routes>
   );
};

export default MemberRouter;
