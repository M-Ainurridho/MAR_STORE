import { useDispatch } from "react-redux";
import Brands from "./Brands";
import Hero from "./components/Hero";
import Settings from "../../utils/settings";
import { useEffect } from "react";
import { inputSearch } from "../../redux/reducers";

const Home = () => {
   Settings("Home");
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(inputSearch(""));
   }, []);

   return (
      <>
         <Hero />
         <Brands />
      </>
   );
};

export default Home;
