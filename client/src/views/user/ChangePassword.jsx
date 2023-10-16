import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editDataUser } from "../../redux/reducers";
import axios from "axios";
import InputField from "./components/forms/InputField";

const ChangePassword = ({value, onValueChange}) => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user.data);
    const [oldPassword, setOldPassword] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [errors, setErrors] = useState([])
 
    const onSubmit = async (e) => {
       e.preventDefault();
 
       try {
          const response = await axios.patch(`http://localhost:3000/user/changepassword/${_id}`, { oldPassword, newPass, confirmPass });
          localStorage.setItem("alert", response.data.message)
          dispatch(editDataUser(response.data.payload));
          onValueChange(!value)
          setErrors([]); setOldPassword(""); setNewPass(""); setConfirmPass("")
       } catch (err) {
          setErrors(err.response.data.errors)
       }
    };
 
    return (
       <div className="change-password bg-white rounded-md border border-neutral-200">
          <p className="py-2 px-4 text-lg border-b border-b-neutral-200">
             <i className="bx-fw bx bxs-lock text-base -translate-y-1.5"></i>
             <strong>Change Password</strong>
          </p>
          <form onSubmit={onSubmit}>
             <div className="p-4 border-b border-b-neutral-200">
                <InputField 
                   label="Current Password"
                   type="password" 
                   id="old-password"
                   name="oldPassword"
                   value={oldPassword} 
                   onValueChange={setOldPassword}
                   errors={errors}
                />
             </div>
             <div className="p-4 border-b border-b-neutral-200">
                <InputField 
                   label="New Password"
                   type="password" 
                   id="new-password"
                   name="newPass"
                   value={newPass} 
                   onValueChange={setNewPass}
                   errors={errors}
                />
                <InputField 
                   label="Confirm Password"
                   type="password" 
                   id="confirm-password"
                   name="confirmPass"
                   value={confirmPass} 
                   onValueChange={setConfirmPass}
                   errors={errors}
                />
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

 export default ChangePassword;