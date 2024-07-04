import "./Writenotification.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import {
  Paper,
  Button,
} from "@mui/material";
import { Col, Form, Row } from "react-bootstrap";
import saveIcon from "./saveIcon.png";
import upload from "./upload.png";
import Footer from "../../components/footer/Footer";

const Writenotification = () => {
  // Create a reference to the file input
  const fileInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = () => {
    // Trigger the file input when the div is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle file selection (e.g., display the selected image)
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("File selected:", file.name);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <Paper elevation={10} className="papercategory">
            <div className="heading">
              <div className="letter">Write Notification</div>
            </div>
            <Row>
              <Col>
                <div className="uploadimg" onClick={handleClick}>
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="uploadimg-image"
                    />
                  ) : (
                    <>
                      <img src={upload} alt="Upload" className="uploadimg-image" />
                      <div className="coverimage">Upload cover image</div>
                    </>
                  )}

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </Col>
              <Col>
                <form className="my-5 ">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ fontSize: '15px' }}>Notification Heading</Form.Label>
                    <Form.Control
                      style={{ outline: "none" }}
                      type="text"
                      placeholder="Enter heading"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Notification Tagline</Form.Label>
                    <Form.Control type="text" placeholder="Enter tagline" />
                  </Form.Group>
                  <div style={{ textAlign: "center", marginBottom: '50%' }}>
                    <Button
                      variant="contained"
                      style={{
                        borderRadius: "10px",
                        background:
                          "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                      }}
                    >
                      Send
                      <img
                        src={saveIcon}
                        alt="Save Icon"
                        style={{
                          marginLeft: "8px", // Space between text and image
                          height: "15px", // Adjust height to fit button
                          width: "15px", // Adjust width to maintain aspect ratio
                        }}
                      />
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </Paper>
          <div></div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Writenotification;
