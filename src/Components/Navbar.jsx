import React from "react";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../DataLayer";
import { logout } from "./SideBar";

function Navbar() {
  const [{ user }] = useDataLayerValue();
  return (
    <nav
      className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0"
      style={{ userSelect: "none" }}
    >
      <span
        className="sidebar-toggler flex-shrink-0 "
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => {
          document.getElementById("_sidebar").classList.toggle("hide");
        }}
      >
        <i className="fa fa-bars"></i>
      </span>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a
            href="/"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notification</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <a href="/" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="/" className="dropdown-item">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="/" className="dropdown-item">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="/" className="dropdown-item text-center">
              See all notifications
            </a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a
            href="/"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-user me-2"></i>
            <span className="d-none d-lg-inline-flex">{user?.name}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <Link to="/account" className="dropdown-item">
              My Profile
            </Link>

            <Link to="/signin" className="dropdown-item" onClick={logout}>
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
