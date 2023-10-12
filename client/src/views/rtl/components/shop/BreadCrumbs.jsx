import { useSelector } from "react-redux";

const BreadCrumbs = () => {
   const shop = useSelector((state) => state.shop);

   return (
      <>
         <div id="bread-crumbs" className="h-14 flex flex-row items-center bg-neutral-100 px-4 md:px-8 lg:px-16 shadow">
            {shop.category ? <span className="text-neutral-500">{`Shop / Categories / ${shop.category} / ${shop.sub_category}`} </span> : <span className="text-neutral-500">{`Shop / Categories`} </span>}
         </div>
      </>
   );
};

export default BreadCrumbs;
