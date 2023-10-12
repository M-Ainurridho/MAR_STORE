import { useNavigate } from "react-router-dom";

const BtnSignUp = () => {
   const navigate = useNavigate()
   return (
      <button className="p-3 md:px-16 lg:px-20 border border-white hover:bg-white hover:text-emerald-500 duration-100 rounded-full font-semibold tracking-wider text-sm" onClick={() => navigate("/auth/signup")}>
         SIGN UP
      </button>
   );
};

export default BtnSignUp;
