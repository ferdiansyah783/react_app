import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => {
  const [widthSidebar, setWidthSidebar] = useState(false);

  return (
    <>
      <DashboardLayout>
        <div
          className={`${
            widthSidebar ? "w-[315px]" : "w-[75px]"
          } h-full transition-all duration-500`}
        >
          <DashboardSidebar widthSidebar={setWidthSidebar} />
        </div>
        <div className="w-full h-full pl-10">
          <DashboardHeader/>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
