const InputField = ({ label, type, id, name,  value, onValueChange, errors }) => {
    return ( 
        <div className="mb-2">
            <label htmlFor={id} className="block font-semibold mb-1">
                {label}
            </label>
                  <input
                     type={type}
                     id={id}
                     className="block w-full p-2 px-3 border border-neutral-400 rounded-md text-base focus:border-green-300 focus:outline-none focus:ring focus:ring-green-300"
                     value={value}
                     onChange={(e) => onValueChange(e.target.value)}
                  />
            {errors.length > 0 && 
                <>
                    {errors.map((error, i) => error.path === name && 
                        <small key={i} className="text-red-500 text-sm italic inline-block -translate-y-1 mr-1">{error.msg} -</small>
                        )
                    }
                </>
            }
        </div>
     );
}
 
export default InputField;