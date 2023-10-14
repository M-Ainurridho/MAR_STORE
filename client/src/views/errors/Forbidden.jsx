import { useDispatch } from "react-redux";
import { Link, useHref } from "react-router-dom";
import { onPageChange } from "../../redux/reducers";
import { useEffect, useState } from "react";

const Forbidden = () => {
   const dispatch = useDispatch();
   const [history, setHistory] = useState();
   let href = useHref();

   useEffect(() => {
      setHistory(href.split("/")[1]);
   }, []);

   return (
      <>
         <h1 className="text-4xl text-center font-bold my-5">403, Forbidden Access</h1>
         <Link to="/" className="text-blue-500 hover:text-blue-600 block text-center" onClick={() => dispatch(onPageChange("Home"))}>
            Go Back
         </Link>
      </>
   );
};

export default Forbidden;
