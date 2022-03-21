import React from "react";
import { Link } from "react-router-dom";
import "../Css/Sidebar.css";
function SideBar() {
  return (
    <aside className="sidebar pe-4 pb-3 bg-dark ">
      <nav>
        <div className="ms-3">
          <Link to="/" className="navbar-brand mx-4 mb-3">
            <h3 className="text-white">
              <i className="fa fa-hashtag me-2"></i>Shop Name
            </h3>
          </Link>
        </div>
        <div className="navbar-nav ms-3 ">
          <Link to="/" className="nav-item nav-link navbarItems">
            <span className="material-icons me-2 ms-1">dashboard</span>
            Dashboard
          </Link>

          <Link to="/" className="nav-item nav-link navbarItems">
            <span className="material-icons-outlined me-2 ms-1">inventory</span>
            Products
          </Link>
          <Link to="/" className="nav-item nav-link navbarItems">
            <span className="material-icons-outlined me-2 ms-1">category</span>{" "}
            Categories
          </Link>
          <Link to="/" className="nav-item nav-link navbarItems">
            <span className="material-icons-outlined me-2 ms-1">
              currency_rupee
            </span>
            Pricing
          </Link>
          <Link to="/" className="nav-item nav-link navbarItems">
            <span className="material-icons-outlined me-2 ms-1">
              people_outline
            </span>
            users
          </Link>
          <Link to="/signin" className="nav-item nav-link navbarItems">
            <span className="material-icons-outlined me-2 ms-1">login</span>Sign
            In
          </Link>
          
        </div>
      </nav>
    </aside>
  );
}

export default SideBar;
