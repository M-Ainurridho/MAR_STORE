import Settings from "../../../utils/settings";

const Checkout = () => {
   Settings("Checkout");

   return (
      <>
         <section id="cart" className="px-16 my-5 grid grid-cols-3 gap-x-4">
            <div className="cart-left self-start col-span-2 px-3 py-2 border border-neutral-200 rounded-md shadow">
               <h3 className="text-2xl font-bold mb-2">Payment Methods</h3>
            </div>
         </section>
      </>
   );
};

export default Checkout;
