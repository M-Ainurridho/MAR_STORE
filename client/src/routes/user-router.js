import { Route, Routes } from "react-router-dom";

import Layout from "../views/layouts/admin";
import Dashboard from "../views/admin/Dashboard";
import NotFound from "../views/errors/NotFound";
import Profile from "../views/admin/Profile";
import MenuManagement from "../views/admin/menu/MenuManagement";
import SubmenuManagement from "../views/admin/menu/SubmenuManagement";

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
            path="/member"
            element={
               <Layout>
                  <Dashboard />
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
