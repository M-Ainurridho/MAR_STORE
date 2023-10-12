import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Settings from "../../utils/settings";
import AuthIntro from "./components/AuthIntro";
import AuthInput from "./components/AuthInput";
import axios from "axios";

const SignUp = () => {
   Settings("Sign Up");

   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [errors, setErrors] = useState([]);

   const onHandleChange = (field, value) => {
      field === "name" ? setName(value) : field === "email" ? setEmail(value) : setPassword(value);
   };

   const onHandleSubmit = async (e) => {
      e.preventDefault();

      try {
         await axios.post("http://localhost:3000/auth/signup", { name, email, password });

         localStorage.setItem("success-register", "Congratulations! the account has been successfully created");
         navigate("/auth/signin");
      } catch (err) {
         setErrors(err.response.data.errors);
      }
   };

   return (
      <section id="sign-up" className="h-screen w-full flex">
         <AuthIntro>
            <h1 className="md:text-4xl lg:text-5xl font-semibold">Welcome Back!</h1>
            <p className="my-6 md:text-base lg:text-lg text-center">To keep connected with us please login with your personal info</p>
            <button className="p-3 px-20 border border-white hover:bg-white hover:text-emerald-500 duration-100 rounded-full font-semibold tracking-wider text-sm" onClick={() => navigate("/auth/signin")}>
               SIGN IN
            </button>
         </AuthIntro>

         <div className="relative flex flex-col justify-center basis-full md:basis-2/3 px-16 h-full">
            <div className="absolute right-4 md:right-8 lg:right-16 top-5 font-bold mb-10">
               <p className="max-w-max cursor-pointer" onClick={() => navigate("/")}>
                  <span className="text-green-500 tracking-wide">MAR</span>
                  <span className="tracking-wide">STORE</span>
               </p>
            </div>
            <div className="flex flex-col items-center">
               <h1 className="text-emerald-500 text-5xl font-bold">Create Account</h1>
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
                  <p className="text-neutral-500 text-center">or use your email for registration:</p>
                  <form onSubmit={onHandleSubmit} className="my-5">
                     <AuthInput icon="bx bx-user" type="text" name="name" placeholder="Name" handleChange={(field, value) => onHandleChange(field, value)} errors={errors} />
                     <AuthInput icon="bx bx-envelope" type="text" name="email" placeholder="Email" handleChange={(field, value) => onHandleChange(field, value)} errors={errors} />
                     <AuthInput icon="bx bx-lock" type="password" name="password" placeholder="Password" handleChange={(field, value) => onHandleChange(field, value)} errors={errors} />

                     <p className="text-center md:hidden font-medium">
                        already have an account?{" "}
                        <Link to="/auth/signin" className="hover:text-blue-600 duration-100 font-normal">
                           Sign in
                        </Link>
                     </p>
                     <div className="mt-6 text-center">
                        <button type="submit" className="p-3 px-20 bg-emerald-500 hover:bg-emerald-600 duration-100 rounded-full font-semibold tracking-wider text-sm text-white">
                           SIGN UP
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SignUp;
