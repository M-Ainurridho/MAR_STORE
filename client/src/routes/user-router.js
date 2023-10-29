import { Route, Routes } from "react-router-dom";

import Layout from "../views/layouts/user";
import Dashboard from "../views/user/Dashboard";
import Customers from "../views/user/admin/Customers";
import MenuManagement from "../views/user/menu/MenuManagement";
import SubmenuManagement from "../views/user/menu/SubmenuManagement";
import NotFound from "../views/errors/NotFound";

import Profile from "../views/user/Profile";
import EditProfile from "../views/user/EditProfile";

import Payments from "../views/user/member/Payments";
import DetailPayment from "../views/user/member/DetailPayment";

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
            path="/admin/customers"
            element={
               <Layout>
                  <Customers />
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
                  <DetailPayment />
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
