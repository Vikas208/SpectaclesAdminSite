import React from "react";

function Notfound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center "
      style={{ height: "inherit" }}
    >
      <img
        src="https://res.cloudinary.com/dyg4mksoz/image/upload/v1643375493/CommonImages/2828914_bf6x76.png"
        alt="Not Found"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
        }}
      />
      <span style={{ fontSize: "20px" }}>Not Found</span>
    </div>
  );
}

export default Notfound;
