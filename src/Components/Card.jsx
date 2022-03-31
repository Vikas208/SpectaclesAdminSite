import React from "react";

function Card({ Imageclass, name, data }) {
  return (
    <div
      className="col-sm-6 col-xl-3 m-1 _card"
      style={{ userSelect: "none", width: "fit-content" }}
    >
      <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
        <i
          className={Imageclass}
          style={{ fontSize: "3em", color: "blue" }}
        ></i>
        <div className="ms-3">
          <p className="mb-2">{name}</p>
          <h6 className="mb-0" style={{ textAlign: "right" }}>
            {data}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Card;
