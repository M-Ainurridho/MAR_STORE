import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "./CardProduct";
import ItemNotFound from "../../../../../components/alerts/ItemNotFound";
import LoadingCircle from "../../../../../components/loadings/LoadingCircle";
import axios from "axios";

const Products = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const search = useSelector((state) => state.search.value);
   const { category, sub_category } = useSelector((state) => state.shop);

   const fetchAllProducts = async () => {
      const { data } = await axios.get("http://localhost:3000/product");
      setProducts(data.payload);
      setLoading(false);
   };

   const fetchProductByCategory = async () => {
      try {
         const { data } = await axios.get(`http://localhost:3000/product/${category}/${sub_category}`);
         setProducts(data.payload);
      } catch {
         setProducts([]);
      } finally {
         setLoading(false);
      }
   };

   const searchProduct = async () => {
      try {
         const { data } = await axios.get(`http://localhost:3000/product/search/${search}`);
         setProducts(data.payload);
      } catch {
         setProducts([]);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      setLoading(true);
      if (search.length >= 3) {
         searchProduct();
      } else if (sub_category) {
         fetchProductByCategory();
      } else {
         fetchAllProducts();
      }
   }, [search, sub_category]);

   return (
      <section id="products" className="basis-full md:basis-3/4 my-5">
         {loading ? (
            <LoadingCircle />
         ) : (
            <>
               {search && <h1 className="font-bold text-2xl mb-4">Searched for "{search}"</h1>}

               <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8">
                  {products.map(({ _id, name, brand, image, price, stock, discount }, i) => {
                     return <CardProduct key={i} _id={_id} name={name} brand={brand} image={image} price={price} stock={stock} discount={discount} />;
                  })}
               </div>
               {products.length === 0 && <ItemNotFound />}
            </>
         )}
      </section>
   );
};

export default Products;
