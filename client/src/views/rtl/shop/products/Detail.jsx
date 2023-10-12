import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingCircle from "../components/loadings/LoadingCircle";
import Settings, { convertPrice } from "../utils/settings";
import BtnWishlist from "../components/buttons/BtnWishlist";

const ProductDetail = () => {
   Settings("Detail");

   const { _id } = useParams();
   const [item, setItem] = useState({});
   const [loading, setLoading] = useState(false);

   const fetchProductDetail = async () => {
      try {
         const { data } = await axios.get(`http://localhost:3000/product/detail/${_id}`);
         setItem(data.payload);
      } catch (err) {
         setItem(err.response.data);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      setLoading(true);
      fetchProductDetail();
   }, []);

   console.log();

   return (
      <>
         {loading ? (
            <LoadingCircle />
         ) : (
            <section id="product-details" className="px-16 my-8">
               <div className="flex gap-x-8">
                  <div className="product-images basis-1/2">{item?.image !== undefined && <img src={require(`../assets/images/products/${item.image[0]}`)} alt="" className="w-full" />}</div>
                  <div className="product-name-desc basis-1/2">
                     <h1 className="product-name text-3xl font-bold mb-5">{item.name}</h1>
                     <p className="product-desc my-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sed velit aspernatur ex porro, atque placeat optio culpa adipisci rerum illum doloribus magnam, quod excepturi error alias! Voluptate id reiciendis
                        tenetur corporis! Accusantium eveniet suscipit omnis error praesentium cumque doloribus, perspiciatis officiis tempore, possimus exercitationem? Ullam impedit odit, facilis non culpa provident neque? Cum magnam,
                        maxime soluta dolore quis totam commodi iure facilis aliquam
                     </p>
                     <div className="ratings mb-5">
                        <i className="bx bxs-star text-yellow-300"></i>
                        <i className="bx bxs-star text-yellow-300"></i>
                        <i className="bx bxs-star text-yellow-300"></i>
                        <i className="bx bxs-star text-yellow-300"></i>
                        <i className="bx bxs-star text-yellow-300"></i>
                        <span className="font-semibold text-sm mx-3">4.9</span>
                        <span className="font-semibold text-sm">324 Reviews</span>
                     </div>
                     <p className="product price text-2xl font-bold mb-5">{convertPrice(item.price)}</p>
                     <button className="bg-green-500 hover:bg-green-600 duration-200 text-white w-1/2 py-2 rounded-md text-xl flex items-center justify-center mb-5">
                        <span>Add to cart</span> <i class="bx bx-right-arrow-alt bx-sm mt-1.5"></i>
                     </button>
                     <div className="others">
                        <div className="inline-block mr-4">
                           <BtnWishlist size="md" /> <span className="inline-block -translate-y-0.5">wishlist</span>
                        </div>
                        <div className="inline-block mr-4">
                           <i class="bx bx-question-mark border rounded-full border-neutral-900"></i> <span className="inline-block -translate-y-0.5">ask question</span>
                        </div>
                        <div className="inline-block mr-4">
                           <i class="bx bx-share-alt"></i> <span className="inline-block -translate-y-0.5">share</span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}
      </>
   );
};

export default ProductDetail;
