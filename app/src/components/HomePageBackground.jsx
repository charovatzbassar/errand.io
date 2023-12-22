import React from "react";

const Background = ({ children }) => {
  return (
    <ul className="background h-screen">
      {" "}
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      {children}
    </ul>
  );
};

export default Background;
