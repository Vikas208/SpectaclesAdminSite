import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";

import "../App.css";
import Navbar from "../Components/Navbar";
function Main() {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <SideBar />
      <div
        className="m-2"
        id="main"
        style={{ flex: "auto", height: "inherit", overflow: "auto" }}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
