import { useDispatch, useSelector } from "react-redux";
import { alertOff } from "../../redux/reducers";

const FloatAlert = ({ message, color }) => {
   const dispatch = useDispatch();
   const { condition } = useSelector((state) => state.alert);

   setTimeout(() => {
      dispatch(alertOff());
   }, 3000);

   return (
      <>
         {condition && (
            <div id="duplicate-order" className={`hidden-alert fixed bottom-4 right-5 z-50 ${color} shadow-md shadow-red-400 p-2 rounded-md text-white flex items-center`}>
               <span className="font-bold ml-2">{message}</span> <i className="bx bx-x text-3xl mt-0.5 ml-3 cursor-pointer" onClick={() => dispatch(alertOff())}></i>
            </div>
         )}
      </>
   );
};

export default FloatAlert;
