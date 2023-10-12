import { useState } from "react";

const AuthInput = ({ icon, type, name, placeholder, handleChange, errors }) => {
   const [value, setValue] = useState("");

   const onHandleChange = (e) => {
      handleChange(name, e.target.value);
      setValue(e.target.value);
   };

   return (
      <div className="mb-3">
         <label className="block relative text-neutral-500">
            <i className={`${icon} absolute top-2.5 left-3 text-lg`}></i>
            <input type={type} name={name} placeholder={placeholder} className="placeholder:text-neutral-500 bg-neutral-100 w-full py-3 ps-10 pe-6 tracking-wider rounded-sm" value={value} onChange={onHandleChange} />
         </label>
         {errors.length > 0 &&
            errors.map(
               (error, i) =>
                  error.path === name && (
                     <small key={i} className="text-red-500 italic">
                        {error.msg} - {" "}
                     </small>
                  )
            )}
      </div>
   );
};

export default AuthInput;
