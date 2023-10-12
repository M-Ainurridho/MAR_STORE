const Footer = ({ bgColor, color }) => {
   return (
      <>
         <footer className={`${bgColor} text-center py-3 self-end`}>
            <p className={`${color && color} italic text-sm`}>&copy; Copyrigth by Muhammad Ainurridho</p>
         </footer>
      </>
   );
};

export default Footer;
