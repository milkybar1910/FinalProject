import React from "react";
import Menu from "./template/Menu";

const Base = ({ children }) => {
  return (
    <div>
      <Menu />
      <div>{children}</div>
    </div>
  );
};

export default Base;
