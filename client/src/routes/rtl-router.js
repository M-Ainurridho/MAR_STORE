import { Route, Routes } from "react-router-dom";
import Layout from "../views/layouts/rtl";
import Home from "../views/rtl/index";
import Shop from "../views/rtl/shop/Shop";
import Cart from "../views/rtl/shop/Cart";
import Checkout from "../views/rtl/shop/Checkout";
import NotFound from "../views/errors/NotFound";
import ProductDetail from "../views/rtl/shop/products/Detail";

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
            path="/cart"
            element={
               <Layout>
                  <Cart />
               </Layout>
            }
         ></Route>
         <Route
            path="/cart/checkout"
            element={
               <Layout>
                  <Checkout />
               </Layout>
            }
         ></Route>
         <Route
            path="/shop/detail/:_id"
            element={
               <Layout>
                  <ProductDetail />
               </Layout>
            }
         ></Route>
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
