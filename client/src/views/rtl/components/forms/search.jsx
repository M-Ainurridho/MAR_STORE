import { useEffect } from "react";
import { useHref, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inputSearch } from "../../../../redux/reducers";

const InputSearch = ({ size }) => {
   const search = useSelector((state) => state.search.value);
   const endpoint = useHref();
   const dispacth = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (search != "" && endpoint != "/shop") {
         navigate("/shop");
      }
   }, [search]);

   return (
      <div className={`search-box relative w-${size}`}>
         <label htmlFor="search" className="absolute left-2">
            <i className="bx bx-search mt-2.5 text-neutral-400"></i>
         </label>
         <input
            type="text"
            id="search"
            placeholder="Search..."
            className="w-full h-full text-sm placeholder:text-neutral-400 text-neutral-500 rounded-md bg-neutral-100 border border-neutral-200 p-2 ps-7 pe-2"
            value={search}
            autoComplete="off"
            onChange={(e) => dispacth(inputSearch(e.target.value))}
         />
      </div>
   );
};

export default InputSearch;
