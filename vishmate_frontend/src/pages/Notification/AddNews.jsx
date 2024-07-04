import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import SuccessModal from "./MyVerticallyCenteredModal";

const AddNews = ({ data, onHide }) => {
  const [category, setCategory] = useState({
    news_image: "",
    heading: "",
    tagline: "",
    status: "active",
  });
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log("File selected:", file.name);
    }
  };

  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (data) {
      setCategory({
        news_image: data.news_image || "",
        heading: data.heading || "",
        tagline: data.tagline || "",
        status: data.status || "active",
      });
      if (data.news_image) {
        setSelectedImage(data.news_image);
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", category.heading);
    formData.append("tagline", category.tagline);
    formData.append("status", category.status);
    if (selectedImage) {
      formData.append("news_image", selectedImage);
    }

    try {
      const url = data
        ? `${process.env.REACT_APP_API_GATEWAY_URL}/api/newses/${data.news_id}`
        : `${process.env.REACT_APP_API_GATEWAY_URL}/api/news`;

      const method = data ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization:
            "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Poster details:", response.data);

      if (
        response.data.message === "news created successfully" ||
        response.data.message === "news updated successfully"
      ) {
        setShowSuccessModal(true);
        if (onHide) onHide(); // Close the modal after success
      } else {
        console.error("Unexpected response:", response.data);
        setError(
          "Unexpected response from the server. Please try again later."
        );
      }
    } catch (error) {
      console.error(
        "Error saving poster:",
        error.response?.data || error.message
      );
      setError("Error saving poster. Please try again later.");
    }
  };

  return (
    <Card.Body>
      <Row>
        <Col>
          <div
            className="uploadimg"
            onClick={handleClick}
            style={{ marginTop: "1rem" }}
          >
            {selectedImage ? (
              <img
                src={
                  typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
                className="uploadimg-image"
              />
            ) : (
              <>
                <div className="coverimage">Upload cover image</div>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </Col>
        <Col>
          <form className="my-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "15px" }}>
                Notification Heading
              </Form.Label>
              <Form.Control
                style={{ outline: "none" }}
                type="text"
                placeholder="Enter heading"
                value={category.heading}
                onChange={(e) =>
                  setCategory({ ...category, heading: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notification Tagline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tagline"
                value={category.tagline}
                onChange={(e) =>
                  setCategory({ ...category, tagline: e.target.value })
                }
              />
            </Form.Group>
            <div style={{ textAlign: "center", marginBottom: "50%" }}>
              <Button
                variant="contained"
                style={{
                  borderRadius: "10px",
                  background:
                    "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                    color: "white"
                }}
                type="submit"
              >
                Save
              </Button>
            </div>
            {error && <p className="text-danger">{error}</p>}
          </form>
        </Col>
        <Col></Col>
        <SuccessModal
        title="Poster Successfully Updated"
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
      />
      </Row>
    </Card.Body>
  );
};

export default AddNews;
