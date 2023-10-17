import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/reducers";
import Settings from "../../utils/settings";
import AuthIntro from "./components/AuthIntro";
import AuthInput from "./components/AuthInput";
import BtnSignUp from "./components/BtnSignUp";
import LoadingPage from "../../components/loadings/LoadingPage"
import axios from "axios";

const SignIn = () => {
   Settings("Sign In");

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const [alert, setAlert] = useState(false);
   const [loading, setLoading] = useState(false)

   const onHandleChange = (field, value) => {
      field === "email" ? setEmail(value) : setPassword(value);
   };

   const onHandleSubmit = async (e) => {
      e.preventDefault();

      setLoading(!loading)
      try {
         const res = await axios.post("http://localhost:3000/auth/signin", { email, password });

         localStorage.setItem("token", res.data.token);
         await tokenValidation();
      } catch (err) {
         setErrors(err.response.data.errors);
         setLoading(!loading)
      }
   };

   const tokenValidation = async () => {
      const token = localStorage.getItem("token");

      if (token) {
         try {
            axios.defaults.headers.common["auth-token"] = token;

            const user = await axios.get("http://localhost:3000/auth/exchangetoken");
            dispatch(signIn({ authentication: true, user: user.data.payload }));

            if (user?.data.payload.role === "member") {
               navigate("/member");
            } else {
               navigate("/admin");
            }
         } catch (err) {
            delete axios.defaults.headers.common["auth-token"];
         } finally {
            setLoading(!loading)
         }
      }
   };

   useEffect(() => {
      if (localStorage.getItem("success-register")) {
         setAlert(true);
         setTimeout(() => {
            localStorage.removeItem("success-register");
            setAlert(false);
         }, 3000);
      }
   }, []);

   return (
      <>
         {loading ? <LoadingPage /> : <section id="sign-in" className="h-screen w-full flex">
         <div className="relative flex flex-col justify-center basis-full md:basis-2/3 px-16 h-full ">
            <div className="absolute left-4 md:left-8 lg:left-16 top-5 font-bold mb-10">
               <p className="max-w-max cursor-pointer" onClick={() => navigate("/")}>
                  <span className="text-green-500 tracking-wide">MAR</span>
                  <span className="tracking-wide">STORE</span>
               </p>
            </div>
            <div className="flex flex-col items-center">
               <h1 className="text-emerald-500 text-5xl font-bold">Sign in to Marstore</h1>
               <div className="signin-account my-6">
                  <Link className="inline-block border rounded-full w-10 h-10 text-center leading-10 mx-1">
                     <i className="bx bxl-facebook text-lg"></i>
                  </Link>
                  <Link className="inline-block border rounded-full w-10 h-10 text-center leading-10 mx-1">
                     <i className="bx bxl-google text-lg"></i>
                  </Link>
                  <Link className="inline-block border rounded-full w-10 h-10 text-center leading-10 mx-1">
                     <i className="bx bxl-linkedin text-lg"></i>
                  </Link>
               </div>
               <div className="own-account w-11/12 lg:w-3/5">
                  <p className="text-neutral-500 text-center">or use your email account:</p>
                  {alert && <div className="alert bg-emerald-500 p-2 px-3 mt-1 text-white rounded-md font-semibold">{localStorage.getItem("success-register")}</div>}

                  <form onSubmit={onHandleSubmit} className="my-5">
                     <AuthInput icon="bx bx-envelope" type="text" name="email" placeholder="Email" handleChange={(field, value) => onHandleChange(field, value)} errors={errors} />

                     <AuthInput icon="bx bx-lock" type="password" name="password" placeholder="Password" handleChange={(field, value) => onHandleChange(field, value)} errors={errors} />
                     
                     <p className="text-center md:hidden font-medium">
                        don't have an account yet? <Link to="/auth/signup" className="hover:text-blue-600 duration-100 font-normal">Sign up</Link>
                     </p>

                     {/* <Link className="block mt-3 md:mt-4 font-medium md:text-lg border-b border-b-emerald-500 max-w-max mx-auto pb-1">Forgot your password?</Link> */}

                     <div className="mt-6 text-center">
                        <button type="submit" className="p-3 px-20 bg-emerald-500 hover:bg-emerald-600 duration-100 rounded-full font-semibold tracking-wider text-sm text-white">
                           SIGN IN
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <AuthIntro>
            <h1 className="md:text-4xl lg:text-5xl font-semibold">Hello, Friend!</h1>
            <p className="my-6 md:text-base lg:text-lg text-center">Enter your personal details and start journey with us</p>
            <BtnSignUp />
         </AuthIntro>
      </section>}
      </>
   );
};

export default SignIn;
