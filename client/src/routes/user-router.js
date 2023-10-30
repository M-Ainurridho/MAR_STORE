import { Route, Routes } from "react-router-dom";

import Layout from "../views/layouts/user";
import Dashboard from "../views/user/Dashboard";
import Profile from "../views/user/Profile";
import EditProfile from "../views/user/EditProfile";
import NotFound from "../views/errors/NotFound";
// Admin
import Members from "../views/user/admin/Members";
import PaymentConfirmation from "../views/user/admin/PaymentConfirmation";
import A_PaymentDetail from "../views/user/admin/PaymentDetail";
// Menu
import MenuManagement from "../views/user/menu/MenuManagement";
import SubmenuManagement from "../views/user/menu/SubmenuManagement";
// member
import Payments from "../views/user/member/Payments";
import M_PaymentDetail from "../views/user/member/PaymentDetail";

const UserRouter = () => {
   return (
      <Routes>
         <Route
            path="/admin"
            element={
               <Layout>
                  <Dashboard />
               </Layout>
            }
         ></Route>
         <Route
            path="/admin/members"
            element={
               <Layout>
                  <Members />
               </Layout>
            }
         ></Route>
         <Route
            path="/admin/payment_confirmation"
            element={
               <Layout>
                  <PaymentConfirmation />
               </Layout>
            }
         ></Route>
         <Route
            path="/admin/payment_confirmation/detail/:_id"
            element={
               <Layout>
                  <A_PaymentDetail/>
               </Layout>
            }
         ></Route>
         <Route
            path="/member"
            element={
               <Layout>
                  <Dashboard />
               </Layout>
            }
         ></Route>
         <Route
            path="/member/payments"
            element={
               <Layout>
                  <Payments />
               </Layout>
            }
         ></Route>
         <Route
            path="/member/payments/detail/:_id"
            element={
               <Layout>
                  <M_PaymentDetail />
               </Layout>
            }
         ></Route>
         <Route
            path="/user"
            element={
               <Layout>
                  <Profile />
               </Layout>
            }
         ></Route>
         <Route
            path="/user/profile/edit"
            element={
               <Layout>
                  <EditProfile />
               </Layout>
            }
         ></Route>
         <Route
            path="/menu"
            element={
               <Layout>
                  <MenuManagement />
               </Layout>
            }
         ></Route>
         <Route
            path="/menu/submenu_management"
            element={
               <Layout>
                  <SubmenuManagement />
               </Layout>
            }
         ></Route>
         <Route path="*" element={<NotFound />}></Route>
      </Routes>
   );
};

export default UserRouter;
