import { useNavigate } from "react-router-dom";

const BtnSignIn = () => {
   const navigate = useNavigate();

   return (
      <button className="bg-blue-600 hover:bg-blue-700 duration-200 w-24 md:px-3 py-2 mx-3 md:me-0 rounded-full text-white shadow-md shadow-blue-400" onClick={() => navigate("/auth/signin")}>
         Sign in
      </button>
   );
};

export default BtnSignIn;
