import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";

function Main() {
  return (
    <div style={{ height: "100vh" }}>
      {/* <NavBar /> */}
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Main;
