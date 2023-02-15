import React, { useState } from "react";
import { BiHomeCircle, BiChevronRight } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsCart4 } from "react-icons/bs";

const DashboardSidebar = (props) => {
  const [showFullSidebar, setShowFullSidebar] = useState(false);
  const [isActive, setIsActive] = useState(0);

  const handleFullSidebar = () => {
    props.widthSidebar((widthSidebar) => !widthSidebar);
    showFullSidebar === false
      ? setTimeout(() => {
          setShowFullSidebar((showFullSidebar) => !showFullSidebar);
        }, 350)
      : setShowFullSidebar((showFullSidebar) => !showFullSidebar);
  };

  return (
    <section className="h-full flex flex-col text-primary bg-white drop-shadow-lg rounded-2xl relative">
      <div className="py-12 font-extrabold italic text-center">dappr</div>
      <button
        onClick={handleFullSidebar}
        className={`${
          showFullSidebar ? "rotate-180" : ""
        } px-1 py-1 absolute -right-4 top-20 bg-white text-black text-2xl rounded-full drop-shadow-md transition duration-300`}
      >
        <BiChevronRight />
      </button>
      {[
        [<BiHomeCircle />, "Home"],
        [<HiOutlineUserGroup />, "Manage User"],
        [<BsCart4 />, "Manage Product"],
      ].map(([logo, value], index) => (
        <button
          onClick={() => setIsActive(index)}
          key={index}
          className={`flex items-center px-5 transition duration-100 relative ${
            isActive === index ? "bg-gray-200 scale-105" : ""
          }`}
        >
          {isActive === index ? (
            <span className="bg-primary h-full w-1 absolute left-0 rounded-full scale-y-100 transition duration-500"></span>
          ) : (
            <span className="bg-primary h-full w-1 absolute left-0 rounded-full scale-y-0 transition duration-75"></span>
          )}
          <span className="py-5 text-3xl">{logo}</span>
          <p
            className={`${
              showFullSidebar ? "" : "hidden"
            } text-lg ml-10 font-semibold`}
          >
            {value}
          </p>
        </button>
      ))}
    </section>
  );
};

export default DashboardSidebar;
