import React from "react";
import { Card, Image } from "react-bootstrap";

const EventCard = (props) => {
  return (
    <Card style={{ margin: "0", padding: "0",  boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc" }}>
      <Card.Header
        as="h4"
        className="p-3"
        style={{ color: "#302B63", fontFamily: "Lora" }}
      >
        Today Event
      </Card.Header>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="ms-4">
            <Image
              src={props.image}
              alt="image"
              width={120}
              height={120}
              roundedCircle
            />
          </div>
          <p
            className="ms-4"
            style={{
              fontSize: "1.75rem",
              fontWeight: "500",
              fontFamily: "Montserrat",
            }}
          >
            May 1 , 2024 - Workers Day
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
