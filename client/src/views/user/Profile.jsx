import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CrumbNTitle from "./components/CrumbNTitle";
import Settings from "../../utils/settings";
import BgGradient from "../../assets/images/backgrounds/gradient-profile.jpg";

const Profile = () => {
   Settings("Profile");

   const { name, email, image } = useSelector((state) => state.user.data);

   return (
      <section id="profile">
         <CrumbNTitle breadcrumbs={"User"}>
            <strong>Profile</strong>
         </CrumbNTitle>
         <div className="member-detail p-6">
            <div className="bg-white rounded-md overflow-hidden shadow-lg">
               <img src={BgGradient} alt="bg-gradient" className="w-full h-36 bg-cover" />
               <div className="flex items-center justify-between relative py-3 px-3 md:py-4 md:px-5">
                  <img src={require(`../../assets/images/avatars/${image}`)} alt={image} className="w-24 h-24 md:w-28 w-24 h-24 md:h-28 rounded-full absolute -top-8 left-5 md:left-10 bg-cover border-4 border-neutral-400" />
                  <div className="ml-28 md:ml-36">
                     <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">{name}</h3>
                     <p className="text-sm md:text-base">{email}</p>
                  </div>
                  <Link to="/user/edit" className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-100 py-2 px-4 rounded-md font-medium">Edit Profile</Link>
               </div>
            </div>
         </div>
         
      </section>
   );
};

export default Profile;
