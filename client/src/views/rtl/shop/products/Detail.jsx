import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Settings, { convertPrice } from "../../../../utils/settings";
import LoadingSpin from "../../../../components/loadings/LoadingSpin";
import BtnWishlist from "../../components/buttons/BtnWishlist";
import axios from "axios";

const ProductDetail = () => {
   Settings("Detail");

   const { _id } = useParams();
   const [item, setItem] = useState({});
   const [loading, setLoading] = useState(false);
   const [show, setShow] = useState(false);
   let i = 1;

   const fetchProductDetail = async () => {
      try {
         const { data } = await axios.get(`http://localhost:3000/product/detail/${_id}`);
         setItem(data.payload);
      } catch (err) {
         setItem(err.response.data);
      }
   };

   const sliderConfiguration = () => {
      if (item.images !== undefined) {
         const slides = Array.from(document.querySelectorAll(".slider"));
         slides.forEach((image) => {
            image.classList.add("hidden");
         });

         slides[i - 1].classList.remove("hidden");
      }
   };

   const nextSlide = () => {
      const images = Array.from(document.querySelectorAll(".slider"));
      images.length === i ? (i = 1) : (i += 1);
      sliderConfiguration();
   };

   const prevSlide = () => {
      const images = Array.from(document.querySelectorAll(".slider"));
      i === 1 ? (i = images.length) : (i -= 1);
      sliderConfiguration();
   };

   useEffect(() => {
      setLoading(true);
      fetchProductDetail();
      sliderConfiguration();
      setLoading(false);
   }, []);

   return (
      <>
         {loading ? (
            <LoadingSpin />
         ) : (
            <section id="product-details" className="px-16 my-8">
               <div className="flex gap-x-8">
                  <div className="product-images basis-1/2 relative" onMouseEnter={() => setShow(!show)} onMouseLeave={() => setShow(!show)}>
                     <div className="container-slider rounded-md overflow-hidden shadow-lg">
                        {item.images !== undefined && (
                           <>
                              {item.images.map((image, i) => (
                                 <img key={i} src={require(`../../../../assets/images/products/${image}`)} className={`slider w-full h-96 object-cover ${i !== 0 && "hidden"}`} />
                              ))}
                           </>
                        )}
                     </div>
                     {show && (
                        <>
                           <div className="button-next cursor-pointer" style={{ position: "absolute", right: "0", top: "45%", bottom: "50%" }} onClick={() => nextSlide()}>
                              <i className="bx bx-chevron-right bg-neutral-900/50 rounded-l-md text-4xl text-white py-2"></i>
                           </div>
                           <div className="button-prev cursor-pointer" style={{ position: "absolute", left: "0", top: "45%", bottom: "50%" }} onClick={() => prevSlide()}>
                              <i className="bx bx-chevron-left bg-neutral-900/50 rounded-r-md text-4xl text-white py-2"></i>
                           </div>
                        </>
                     )}
                  </div>
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
                     <p className="product price text-2xl font-bold mb-5">
                        {convertPrice(item.price, item.discount)}
                        {item.discount && <del className="text-sm text-neutral-700 font-medium ml-1">{convertPrice(item.price)}</del>}
                     </p>
                     <button className="bg-green-500 hover:bg-green-600 duration-200 text-white w-1/2 py-2 rounded-md text-xl flex items-center justify-center mb-5">Add to cart</button>
                     <div className="others">
                        <div className="inline-block mr-4">
                           <BtnWishlist size="md" /> <span className="inline-block -translate-y-0.5">wishlist</span>
                        </div>
                        <div className="inline-block mr-4">
                           <i className="bx bx-question-mark border rounded-full border-neutral-900"></i> <span className="inline-block -translate-y-0.5">ask question</span>
                        </div>
                        <div className="inline-block mr-4">
                           <i className="bx bx-share-alt"></i> <span className="inline-block -translate-y-0.5">share</span>
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
