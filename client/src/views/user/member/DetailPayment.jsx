import { useParams } from "react-router-dom";
import Settings from "../../../utils/settings";
import CrumbNTitle from "../components/CrumbNTitle";

const DetailPayment = () => {
   Settings("Detail Payment");
   const { _id } = useParams();

   return (
      <section id="payments">
         <CrumbNTitle breadcrumbs={"Member / Payments"}>
            <strong>Detail Payment</strong>
         </CrumbNTitle>
      </section>
   );
};

export default DetailPayment;
