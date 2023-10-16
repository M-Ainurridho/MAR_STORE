const Alert = ({value, onValueChange}) => {

    setTimeout(() => {
        localStorage.removeItem("alert");
        onValueChange(!value);
     }, 3000);

    return ( 
        <div className="p-4 pb-0">
            <div className="alert bg-green-500 p-3 mt-1 text-white rounded-md font-semibold">{localStorage.getItem("alert")}</div>
        </div>
     );
}
 
export default Alert;