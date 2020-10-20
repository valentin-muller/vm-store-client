import React from "react";
import Menu from "./Menu";

const Layout = ({ title = "Title", description = "Description", children }) => (
  <div>
  <Menu />
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <div>{children}</div>
  </div>
);

export default Layout;
