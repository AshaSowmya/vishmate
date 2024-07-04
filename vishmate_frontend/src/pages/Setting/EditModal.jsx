import { ButtonBase } from "@mui/material";
import React, { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import "../../assets/css/virtual-select.min.css";

const EditModal = ({ title, data, type, submitHandler, ...props }) => {
  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "../../assets/js/virtual-select.min.js"; // Adjust the path as necessary
    script.onload = () => {
      if (window.VirtualSelect) {
        window.VirtualSelect.init({
          ele: "#select_category",
          multiple: true,
          search: false,
        });
      } else {
        console.error("VirtualSelect is not defined");
      }
    };
    script.onerror = () => {
      console.error("Failed to load VirtualSelect script");
    };
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  });

  console.log(data);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const editCategory = formData.get("select_category");
    console.log(username, email, password, editCategory);
    data.user_name = username || null;
    data.admin_email = email || null;
    data.password = password || null;
    data.category = editCategory || null;
    submitHandler(data);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          background:
            "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
        }}
        closeButton
      >
        <Modal.Title
          style={{
            fontFamily: "Lora",
            color: "white",
          }}
          id="contained-modal-title-vcenter"
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" onSubmit={formSubmitHandler}>
          <Row className="mx-4">
            <Col>
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1F2937",
                    fontWeight: "bold",
                  }}
                >
                  User Name
                </label>
                <div style={{ marginTop: ".5rem" }}>
                  <input
                    type="text"
                    name="username"
                    style={{
                      width: "100%",
                      height: "44px",
                      display: "block",
                      borderRadius: "8px",
                      padding: ".3rem .5rem",
                      border: "1px solid #1F2937",
                    }}
                    defaultValue={data ? data.user_name : ""}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1F2937",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </label>
                <div style={{ marginTop: ".5rem" }}>
                  <input
                    type="email"
                    name="email"
                    style={{
                      width: "100%",
                      height: "44px",
                      display: "block",
                      borderRadius: "8px",
                      padding: ".3rem .5rem",
                      border: "1px solid #1F2937",
                    }}
                    defaultValue={data ? data.admin_email : ""}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="my-4 mx-4">
            <Col>
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1F2937",
                    fontWeight: "bold",
                  }}
                >
                  Password
                </label>
                <div style={{ marginTop: ".5rem" }}>
                  <input
                    type="password"
                    name="password"
                    style={{
                      width: "100%",
                      height: "44px",
                      display: "block",
                      borderRadius: "8px",
                      padding: ".3rem .5rem",
                      border: "1px solid #1F2937",
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1F2937",
                    fontWeight: "bold",
                  }}
                >
                  Edit Category
                </label>
                <div style={{ marginTop: ".5rem" }}>
                  <select
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "2px solid rgb(166, 166, 166)",
                    }}
                    id="select_category"
                    multiple
                    name="select_category"
                    placeholder="Select Category"
                    data-silent-initial-value-set="true"
                  >
                    <option value="Jewellery" selected={data ? data.category.split(",").includes("Jewellery") : ""}>Jewellery</option>
                    <option value="Restaurant" selected={data ? data.category.split(",").includes("Restaurant") : ""}>Restaurant</option>
                    <option value="Political" selected={data ? data.category.split(",").includes("Political") : ""}>Political</option>
                    <option value="Theater" selected={data ? data.category.split(",").includes("Theater") : ""}>Theater</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="m-4">
            <Col lg={8}></Col>
            <Col lg={4}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ButtonBase
                  className={`btn`}
                  type="submit"
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                    color: "white",
                    padding: ".5rem 1rem",
                    borderRadius: "10px",
                  }}
                >
                  {type.name}
                </ButtonBase>
                <ButtonBase
                  className="modal-button"
                  style={{
                    width: "100%",
                    backgroundColor: "#D7D1D1",
                    color: "black",
                    padding: ".5rem 1rem",
                    borderRadius: "10px",
                    marginLeft: "1rem",
                  }}
                  onClick={props.onHide}
                >
                  Cancel
                </ButtonBase>
              </div>
            </Col>
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
