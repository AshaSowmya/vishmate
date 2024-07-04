import React from "react";
import { Col } from "react-bootstrap";

const PriceCard = (props) => {
  return (
    <Col
      className="d-flex bg-white justify-content-between mx-3 p-0"
      style={{ overflow: "hidden", borderRadius: "10px", boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc" }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          flexBasis: "35%",
          background: "linear-gradient(to bottom, #0F0C29, #302B63, #24243E)",
          borderRadius: "10px",
        }}
      >
        <img src={props.png} alt="calender" />
      </div>
      <div
        style={{ flexBasis: "65%" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <p style={{ fontWeight: "500" }} className="mt-3 mb-0">
          {props.title}
        </p>
        <p style={{ fontSize: "26px", fontWeight: "600" }}>INR {props.value}</p>
      </div>
    </Col>
  );
};

export default PriceCard;
