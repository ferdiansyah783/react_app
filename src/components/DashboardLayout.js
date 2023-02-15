import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-50 font-poppins">
      <div className="w-[92%] h-[92%] flex">{children}</div>
    </main>
  );
};

export default DashboardLayout;
