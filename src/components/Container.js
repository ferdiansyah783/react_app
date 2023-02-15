import clsx from "clsx";
import React from "react";

const Container = ({ className, ...props }) => {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4", className)} {...props} />
  );
};

export default Container;
