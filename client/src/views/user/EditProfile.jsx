import CrumbNTitle from "./components/CrumbNTitle";
import Settings from "../../utils/settings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { editDataUser } from "../../redux/reducers";
import Alert from "./components/alerts/Alert";
import ChangePassword from "./ChangePassword";
import InputField from "./components/forms/InputField";

const EditProfile = () => {
   Settings("Edit Profile");
   const [alert, setAlert] = useState(false)

   return (
      <section id="edit-profile">
         <CrumbNTitle breadcrumbs={"User / Profile"}>
            <strong>Edit Profile</strong>
         </CrumbNTitle>

         {alert && <Alert value={alert} onValueChange={setAlert} />}

         <div className="p-6 grid md:grid-cols-2 gap-4 text-lg">
            <Edit value={alert} onValueChange={setAlert} />
            <ChangePassword value={alert} onValueChange={setAlert} />
         </div>
      </section>
   );
};

const Edit = ({value, onValueChange}) => {
   const { data } = useSelector((state) => state.user);

   const dispatch = useDispatch();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [image, setImage] = useState("");
   const [errors, setErrors] = useState([])

   useEffect(() => {
      setName(data.name);
      setEmail(data.email);
   }, []);

   const onSubmit = async (e) => {
      e.preventDefault();

      image ? await withImage() : await withoutImage();
   };

   const withImage = async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", image);

      try {
         const response = await axios.patch(`http://localhost:3000/user/edit/with_image/${data._id}`, formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         localStorage.setItem("alert", response.data.message)
         dispatch(editDataUser(response.data.payload));
         onValueChange(!value)
         setErrors([])
      } catch (err) {
         setErrors(err.response.data.errors)
      }
   };

   const withoutImage = async () => {
      try {
         const response = await axios.patch(`http://localhost:3000/user/edit/without_image/${data._id}`, { name, email });
         localStorage.setItem("alert", response.data.message)
         dispatch(editDataUser(response.data.payload));
         onValueChange(!value)
         setErrors([])
      } catch (err) {
         setErrors(err.response.data.errors)
      }
   };

   return (
      <div className="edit-profile bg-white rounded-md border border-neutral-200 self-start">
         <p className="py-2 px-4 text-lg border-b border-b-neutral-200">
            <i className="bx-fw bx bxs-user-circle text-base -translate-y-1.5"></i>
            <strong> Edit Profile</strong>
         </p>
         <form onSubmit={onSubmit}>
            <div className="avatar bg-white p-4 border-b border-b-neutral-200">
               <p className="font-semibold mb-2">Avatar</p>
               <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                     type="file"
                     className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:rounded-md"
                     onChange={(e) => setImage(e.target.files[0])}
                  />
               </label>
               <p className="text-red-500 text-xs mt-1">Max size: 2mb (optional change)</p>
            </div>
            <div className="p-4 border-b border-b-neutral-200">
               <InputField 
                   label="Name"
                   type="text" 
                   id="name"
                   name="name"
                   value={name} 
                   onValueChange={setName}
                   errors={errors}
                />
                <InputField 
                   label="Email"
                   type="email" 
                   id="email"
                   name="email"
                   value={email} 
                   onValueChange={setEmail}
                   errors={errors}
                />
            </div>
            <div className="p-4">
               <button type="submit" className="bg-green-500 hover:bg-green-600 duration-100 text-white text-base font-semibold px-4 py-2 rounded-md">
                  Save changes
               </button>
            </div>
         </form>
      </div>
   );
};



export default EditProfile;
