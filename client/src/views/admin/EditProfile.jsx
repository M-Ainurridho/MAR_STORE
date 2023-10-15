import CrumbNTitle from "./components/CrumbNTitle";
import Settings from "../../utils/settings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { editDataUser } from "../../redux/reducers";

const EditProfile = () => {
   Settings("Edit Profile");

   return (
      <section id="edit-profile">
         <CrumbNTitle>
            <strong>Edit Profile</strong>
         </CrumbNTitle>
         <div className="p-6 grid md:grid-cols-2 gap-4 text-lg">
            <Edit />
            <ChangePassword />
         </div>
      </section>
   );
};

const Edit = () => {
   const { data } = useSelector((state) => state.user);

   const dispatch = useDispatch();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [image, setImage] = useState("");

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
         dispatch(editDataUser(response.data.payload));
      } catch (err) {
         console.log("error: ", err);
      }
   };

   const withoutImage = async () => {
      try {
         const response = await axios.patch(`http://localhost:3000/user/edit/without_image/${data._id}`, { name, email });
         dispatch(editDataUser(response.data.payload));
      } catch (err) {
         console.log("error: ", err);
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
               <div className="mb-2">
                  <label htmlFor="name" className="block font-semibold mb-1">
                     Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     className="block w-full p-2 px-3 border border-neutral-400 rounded-md text-base focus:border-green-300 focus:outline-none focus:ring focus:ring-green-300"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="email" className="block font-semibold mb-1">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     className="block w-full p-2 px-3 border border-neutral-400 rounded-md text-base focus:border-green-300 focus:outline-none focus:ring focus:ring-green-300"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
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

const ChangePassword = () => {
   const onSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <div className="change-password bg-white rounded-md border border-neutral-200">
         <p className="py-2 px-4 text-lg border-b border-b-neutral-200">
            <i className="bx-fw bx bxs-lock text-base -translate-y-1.5"></i>
            <strong>Change Password</strong>
         </p>
         <form onSubmit={onSubmit}>
            <div className="p-4 border-b border-b-neutral-200">
               <div className="mb-2">
                  <label htmlFor="current-password" className="block font-semibold mb-1">
                     Current Password
                  </label>
                  <input type="password" id="current-password" className="block w-full p-2 px-3 border border-neutral-400 rounded-md text-base focus:border-green-300 focus:outline-none focus:ring focus:ring-green-300" />
               </div>
            </div>
            <div className="p-4 border-b border-b-neutral-200">
               <div className="mb-2">
                  <label htmlFor="new-password" className="block font-semibold mb-1">
                     New Password
                  </label>
                  <input type="password" id="new-password" className="block w-full p-2 px-3 border border-neutral-400 rounded-md text-base focus:border-green-300 focus:outline-none focus:ring focus:ring-green-300" />
               </div>
               <div>
                  <label htmlFor="confirm-password" className="block font-semibold mb-1">
                     Confirm Password
                  </label>
                  <input type="password" id="confirm-password" className="block w-full p-2 px-3 border border-neutral-400 rounded-md text-base focus:border-green-300 focus:outline-none focus:ring focus:ring-green-300" />
               </div>
            </div>
            <div className="p-4">
               <button type="submit" className="bg-green-500 hover:bg-green-600 duration-100 text-white text-base font-semibold px-4  py-2 rounded-md">
                  Save changes
               </button>
            </div>
         </form>
      </div>
   );
};

// const Detail = () => {
//    const { data } = useSelector((state) => state.user);

//    return (
//       <div className="profile bg-white rounded-md border border-neutral-200 border-b border-b-neutral-200">
//          <p className=" py-2 px-4 text-lg border-b border-b-neutral-200">
//             <i className="bx-fw bx bxs-user text-base -translate-y-1.5"></i>
//             <strong>Profile</strong>
//          </p>
//          <div className="p-4 border-b border-b-neutral-200">
//             <img src={require(`../../assets/images/avatars/profile.png`)} alt={data.image} className="w-48 h-48 mx-auto rounded-full shadow" />
//          </div>
//          <div className="p-4 pt-2 border-b border-b-neutral-200">
//             <label className="block font-semibold mb-1">Name</label>
//             <input type="text" className="block w-full p-2 px-3 border border-neutral-400 rounded-md text-base" value="Muhammad Ainurridho" disabled />
//          </div>
//          <div className="p-4 pt-2">
//             <label className="block font-semibold mb-1">Email</label>
//             <input type="email" className="block w-full p-2 px-3 border border-neutral-400 rounded-md text-base" value="admin@gmail.com" disabled />
//          </div>
//       </div>
//    );
// };

export default EditProfile;
