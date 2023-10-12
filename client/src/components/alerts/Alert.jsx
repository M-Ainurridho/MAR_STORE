import { useState } from "react";

const Alert = ({ show, message, color }) => {
   const [cross, setCross] = useState(true);

   const onClose = () => {
      setCross(!cross);
      show(!cross);
   };

   setTimeout(() => {
      setCross(!cross);
      show(!cross);
   }, 3000);

   return (
      <>
         {cross && (
            <div id="duplicate-order" className={`hidden-alert fixed bottom-4 right-5 z-50 ${color} shadow-lg p-2 rounded-md text-white flex items-center`}>
               <span className="font-bold ml-2">{message}</span> <i className="bx bx-x text-3xl mt-0.5 ml-3 cursor-pointer" onClick={onClose}></i>
            </div>
         )}
      </>
   );
};

export default Alert;
