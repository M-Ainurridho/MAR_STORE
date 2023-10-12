import { useState } from "react";
import Category from "./Category";

const Sidebar = () => {
   const { innerWidth } = window;

   const [dropdown, setDropdown] = useState(false);
   return (
      <>
         {innerWidth > 768 ? (
            <aside id="sidebar" className="my-5 md:basis-1/4 hidden md:block">
               <div className="categories py-2 px-6 border rounded-md shadow-lg">
                  <h3 className="font-semibold mt-2 mb-3 text-lg">Categories</h3>
                  <ul>
                     <Category category="Electronics" sub={["TV", "Cooler", "Lamp"]} />
                     <Category category="Computers" sub={["Laptop", "Smartphone", "Tablet"]} />
                     <Category category="Arts & Crafts" />
                  </ul>
               </div>
            </aside>
         ) : (
            <aside className="mt-2 -mb-3">
               <div className="categories relative inline-block" onMouseOver={() => setDropdown(true)} onMouseOut={() => setDropdown(false)}>
                  <p className="pb-1">
                     <i class="bx bx-filter"></i> Categories
                  </p>
                  {dropdown && (
                     <div className="absolute top-7 left-0 border border-neutral-200 w-40 p-1 px-2 rounded-md bg-white z-10 shadow-lg">
                        <ul>
                           <Category category="Electronics" sub={["TV", "Cooler", "Lamp"]} />
                           <Category category="Computers" sub={["Laptop", "Smartphone", "Tablet"]} />
                           <Category category="Arts & Crafts" />
                        </ul>
                     </div>
                  )}
               </div>
            </aside>
         )}
      </>
   );
};

export default Sidebar;
