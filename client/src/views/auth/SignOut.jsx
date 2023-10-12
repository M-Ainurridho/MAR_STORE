import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/reducers";

const SignOut = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      localStorage.removeItem("token");
      dispatch(signOut());
      navigate("/auth/signin");
   }, []);
};

export default SignOut;
