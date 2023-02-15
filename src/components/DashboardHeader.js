import clsx from "clsx";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiSettings3Line } from "react-icons/ri";

const DashboardHeader = () => {
  const [isActive, setIsActive] = useState(false);

  const handleOptions = {
    "View profile": () => console.log("profile"),
    "Log out": () => console.log("profile"),
    Cancel: () => setIsActive((isActive) => !isActive),
  };

  return (
    <header className="w-full h-20 flex items-center justify-between relative">
      <h1 className="font-bold text-3xl text-indigo-900">Welcome John!</h1>
      <button
        onClick={() => setIsActive((isActive) => !isActive)}
        className="flex items-center"
      >
        <span>
          <img
            alt="people"
            width={50}
            className="rounded-full border-4 box-content border-white object-center"
            src="https://source.unsplash.com/360x360?people"
          />
        </span>
        <span
          className={clsx(
            "text-2xl text-gray-600 transition duration-300",
            isActive === true ? "rotate-180" : ""
          )}
        >
          <IoIosArrowDown />
        </span>
      </button>
      <div
        className={`${
          isActive === true ? "scale-y-100 opacity-100" : "opacity-0 scale-110"
        } grid grid-cols-1 absolute -right-10 -bottom-56 w-52 h-56 bg-white rounded-2xl drop-shadow-md py-3 transition duration-200`}
      >
        <div className="text-2xl mx-auto pt-5 -mb-5 text-gray-600">
          <RiSettings3Line />
        </div>
        {["View profile", "Log out", "Cancel"].map((value, index) => (
          <button
            onClick={handleOptions[value]}
            className="group hover"
            key={index}
          >
            <p
              className={clsx(
                "group-hover:font-bold",
                value === "Cancel"
                  ? "group-hover:text-red-600 text-red-500"
                  : "group-hover:text-[#645fdf] text-gray-500"
              )}
            >
              {value}
            </p>
            <div
              className={clsx(
                "w-1/2 mx-auto h-[3px] rounded-full scale-x-0 group-hover:scale-x-100 transition duration-300",
                value === "Cancel"
                  ? "group-hover:bg-red-500"
                  : "group-hover:bg-primary"
              )}
            ></div>
          </button>
        ))}
      </div>
    </header>
  );
};

export default DashboardHeader;
