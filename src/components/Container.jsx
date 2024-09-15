import React from "react";

const Container = ({ children, className }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className={classNames("px-4 relative w-full", className)}>
      {children}
    </div>
  );
};

export default Container;
