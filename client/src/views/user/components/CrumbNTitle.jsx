

const CrumbNTitle = ({ breadcrumbs, children }) => {
   return (
      <>
         <div className="p-6 tracking-wider text-center md:text-left">
            <h2 className="text-lg lg:text-xl">
               <span className="text-neutral-700">{breadcrumbs} / </span>
               {children}
            </h2>
         </div>
         <div className="p-6 tracking-wider bg-white border-y border-y-neutral-200 text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl">{children}</h1>
         </div>
      </>
   );
};

export default CrumbNTitle;
