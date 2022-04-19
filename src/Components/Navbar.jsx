import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../DataLayer";
import { logoutAccount } from "../API/Authentication";
import { loadNotifications } from "../API/LoadData";
import { toast } from "react-toastify";
import { action } from "../Reducer/action";
function Navbar() {
  const [{ user }, dispatch] = useDataLayerValue();
  const [notifications, setNotifications] = useState({});
  const logout = async () => {
    let response = await logoutAccount();
    if (response.status !== 200) {
      toast.error("Something is wrong");
    } else {
      dispatch({
        type: action.SETTOKEN,
        token: null,
      });
    }
  };
  useEffect(() => {
    async function getNotification() {
      let response = await loadNotifications();
      if (response.status === 200) {
        let result = await response.json();

        setNotifications(result);
      }
    }
    getNotification();
    return () => {
      setNotifications({});
    };
  }, []);
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
          <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notification</span>
          </span>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            {Object.keys(notifications)?.map((element, index) => {
              return (
                <div key={index}>
                  {notifications[element] !== 0 && (
                    <>
                      <span className="dropdown-item">
                        <h6 className="fw-normal mb-0">
                          {notifications[element]} New {element}
                        </h6>
                      </span>
                      <hr className="dropdown-divider" />
                    </>
                  )}
                </div>
              );
            })}
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
