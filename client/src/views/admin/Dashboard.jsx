import Settings from "../../utils/settings";
import CrumbNTitle from "./components/CrumbNTitle";

const Dashboard = () => {
   Settings("Dashboard", "admin");

   return (
      <section id="dashboard">
         <CrumbNTitle>
            <strong>Dashboard</strong>
         </CrumbNTitle>
         <div></div>
      </section>
   );
};

export default Dashboard;
