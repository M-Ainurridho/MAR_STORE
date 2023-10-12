import { useState } from "react";
import { useDispatch } from "react-redux";
import { categoryChange } from "../../../../redux/reducers";

const Category = ({ category, sub = [], link = [] }) => {
   const [dropdown, setDropdown] = useState(false);
   const dispatch = useDispatch();

   return (
      <li className="my-2 text-neutral-700" onClick={() => setDropdown(!dropdown)}>
         <div className="flex items-center justify-between cursor-pointer">
            <span>{category}</span> {dropdown ? <i className="bx bx-chevron-down"></i> : <i className="bx bx-chevron-right"></i>}
         </div>
         {dropdown && (
            <div className="ps-6">
               {sub &&
                  sub.map((item, i) => {
                     return (
                        <button key={i} className="block text-sm my-1 hover:text-green-500 duration-200" onClick={() => dispatch(categoryChange({ category, sub_category: item }))}>
                           - {item}
                        </button>
                     );
                  })}
            </div>
         )}
      </li>
   );
};

export default Category;
