import { Button, Modal } from "react-bootstrap";
import Tick from "./tick.gif";


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ borderRadius: "20px" }}
    >
      <Modal.Header
        style={{
          background:
            "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
          color: "white",
        }}
        closeButton
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Successfully
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={Tick}
          style={{ width: "25%", height: "25%", marginLeft: "40%" }}
        />
        <center>
          <h4>Poster Successfully Updated</h4>
        </center>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
