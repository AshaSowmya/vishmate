import React from "react";
import { Card, Image } from "react-bootstrap";

const SubscriptionCard = (props) => {
  return (
    <Card style={{ margin: "0", padding: "0",  boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc" }}>
      <Card.Header as="h4" className="p-3" style={{ color: "#302B63", fontFamily: "Lora" }}>
      User Subscription Plan Expire Details
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-start align-items-center">
          <div className="d-flex flex-column align-items-center ms-5">
            <Image
              src={props.image}
              alt="image"
              width={120}
              height={120}
              roundedCircle
            />
            <div className="d-flex flex-column align-items-center pt-3">
              <p className="m-0"
                style={{
                  color: "#302B63",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Ver Jwellery
              </p>
              <p style={{ fontWeight: "500" }}>EXP : 01/05/2024</p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center ms-5">
            <Image
              src={props.image}
              alt="image"
              width={120}
              height={120}
              roundedCircle
            />
            <div className="d-flex flex-column align-items-center pt-3">
              <p className="m-0"
                style={{
                  color: "#302B63",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                H Jewelers
              </p>
              <p style={{ fontWeight: "500" }}>EXP : 01/05/2024</p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SubscriptionCard;
