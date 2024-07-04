import { ButtonBase } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";
import "./Modal.scss";

const MyVerticallyCenteredModal = ({ title, body, onConfirm, type, ...props }) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{ fontFamily: "Lora" }}
          id="contained-modal-title-vcenter"
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonBase
          className={`btn`}
          style={{
            backgroundColor: "#FF0000",
            color: "white",
            padding: ".5rem 1rem",
            borderRadius: "10px",
          }}
          onClick={onConfirm}
        >
          {type.name}
        </ButtonBase>
        <ButtonBase
          className="modal-button"
          style={{
            backgroundColor: "#D7D1D1",
            color: "black",
            padding: ".5rem 1rem",
            borderRadius: "10px",
            marginLeft: "1rem",
          }}
          onClick={props.onHide}
        >
          Close
        </ButtonBase>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
