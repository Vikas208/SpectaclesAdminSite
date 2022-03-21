import React from "react";

function NavBar() {
  return (
    <nav
      className="d-flex align-items-center bg-dark"
      style={{
        float: "right",
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        cursor: "pointer",
        color: "white",
        borderRadius: "4px",
      }}
    >
      <span className="material-icons me-1">person</span>
      <span style={{ textTransform: "uppercase" }}>vikas</span>
    </nav>
  );
}

export default NavBar;
