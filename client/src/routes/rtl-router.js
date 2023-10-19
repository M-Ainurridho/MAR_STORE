import { Route, Routes } from "react-router-dom";
import Layout from "../views/layouts/rtl";
import Home from "../views/rtl/index";
import Shop from "../views/rtl/shop/Shop";
import Cart from "../views/rtl/shop/Cart";
import NotFound from "../views/errors/NotFound";

const RTL = () => {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <Layout>
                  <Home />
               </Layout>
            }
         ></Route>
         <Route
            path="/shop"
            element={
               <Layout>
                  <Shop />
               </Layout>
            }
         ></Route>
         <Route
            path="/shop/cart"
            element={
               <Layout>
                  <Cart />
               </Layout>
            }
         ></Route>
         {/* <Route
            path="/shop/detail/:_id"
            element={
               <Navbar>
                  <ProductDetail />
               </Navbar>
            }
         ></Route> */}
         {/* 
         <Route
            path="/brands"
            element={
               <Navbar>
                  <Brands />
               </Navbar>
            }
         ></Route>
         <Route
            path="/shop/cart"
            element={
               <Navbar>
                  <Cart />
               </Navbar>
            }
         ></Route> */}

         <Route path="*" element={<NotFound />}></Route>
      </Routes>
   );
};

export default RTL;
