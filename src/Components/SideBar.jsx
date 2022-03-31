import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutAccount } from "../API/Authentication";
import "../Css/Sidebar.css";
import { useDataLayerValue } from "../DataLayer";

export const logout = async () => {
  let response = await logoutAccount();
  if (response.status !== 200) {
    toast.error("Something is wrong");
  }
};
function SideBar() {
  const [{ token, user, shopDetails }] = useDataLayerValue();

  return (
    <div className="sidebar pe-4 pb-3 " id="_sidebar">
      <nav className="navbar bg-light navbar-light">
        <a href="/" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            <i className="fa fa-hashtag me-2"></i>
            <span className="text-wrap shopname">{shopDetails?.shopName}</span>
          </h3>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <i className="fa fa-user"></i>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">{user?.name}</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <Link
            to="/dashboard"
            className="nav-item nav-link d-flex align-items-center justify-content-left "
          >
            <i className="fa fa-dashboard me-2"></i> <span>Dashboard</span>
          </Link>
          <Link
            to="/products"
            className="nav-link nav-item d-flex align-items-center justify-content-left "
          >
            <i className="fa fa-tachometer fa-laptop me-2"></i>{" "}
            <span>Products</span>
          </Link>
          <Link
            to="/shopDetails"
            className="nav-item nav-link d-flex align-items-center justify-content-left"
          >
            <i className="fa fa-th me-2"></i>
            <span>Shop Details</span>
          </Link>
          <Link
            to="/"
            className="nav-item nav-link d-flex align-items-center justify-content-left"
          >
            <i className="fa fa-users me-2"></i>
            <span>Users</span>
          </Link>
          <Link
            to="/account"
            className="nav-item nav-link d-flex align-items-center justify-content-left"
          >
            <i className="fa fa-user me-2"></i>
            <span>Account</span>
          </Link>
          {!token ? (
            <Link
              to="/signin"
              className="nav-item nav-link d-flex align-items-center justify-content-left"
            >
              <i className="fa fa-sign-in me-2"></i>
              <span>Login</span>
            </Link>
          ) : (
            <Link
              to="/signin"
              className="nav-item nav-link d-flex align-items-center justify-content-left"
              onClick={logout}
            >
              <i className="fa fa-sign-out me-2"></i>
              <span>Logout</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
