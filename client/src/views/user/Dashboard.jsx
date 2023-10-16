import { useHref } from "react-router-dom";
import Settings, { capitalize } from "../../utils/settings";
import CrumbNTitle from "./components/CrumbNTitle";

const Dashboard = () => {
   Settings("Dashboard", "admin");
   const href = useHref();
   const menu = href.split("/")[1];

   return (
      <section id="dashboard">
         <CrumbNTitle breadcrumbs={capitalize(menu)}>
            <strong>Dashboard</strong>
         </CrumbNTitle>
         <div></div>
      </section>
   );
};

export default Dashboard;
