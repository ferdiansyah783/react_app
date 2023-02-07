import React from "react";
import { Alert } from "flowbite-react";

const AlertSuccess = ({ allertVisible, color, value }) => {
  return (
    <>
      <Alert
        className={`${allertVisible} absolute top-0 right-0 left-0 w-full`}
        color={color}
      >
        <span>
          <span className="font-medium">Info alert!</span> {value}
        </span>
      </Alert>
    </>
  );
};

export default AlertSuccess;
