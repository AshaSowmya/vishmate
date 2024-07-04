import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import axios from "axios";
import SuccessModal from "./MyVerticallyCenteredModal";

const AddPoster = ({ data, onHide }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [category, setCategory] = useState({
    category_type: "",
    language: "",
    title: "",
    font_style: "",
    font_size: "",
    logo_x: "",
    logo_y: "",
    date_x: "",
    date_y: "",
    footer_x: "",
    footer_y: "",
    footer1_x: "",
    footer1_y: "",
    gold_x: "",
    gold_y: "",
    frame_image: "",
    silver_x: "",
    silver_y: "",
    color_code: "",
    status: "active",
  });
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (data) {
      setCategory({
        category_type: data.category_type || "",
        language: data.language || "",
        title: data.title || "",
        font_style: data.font_style || "",
        font_size: data.font_size || "",
        logo_x: data.logo_x || "",
        logo_y: data.logo_y || "",
        date_x: data.date_x || "",
        date_y: data.date_y || "",
        footer_x: data.footer_x || "",
        footer_y: data.footer_y || "",
        footer1_x: data.footer1_x || "",
        footer1_y: data.footer1_y || "",
        gold_x: data.gold_x || "",
        gold_y: data.gold_y || "",
        silver_x: data.silver_x || "",
        silver_y: data.silver_y || "",
        color_code: data.color_code || "",
        status: data.status || "active",
      });
      if (data.frame_image) {
        setSelectedImage(data.frame_image);
      }
    }
  }, [data]);

  const categoryHandler = (e) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      category_type: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(category.title)

    const formData = new FormData();
    formData.append("category_type", category.category_type);
    formData.append("language", category.language);
    formData.append("title", category.title);
    formData.append("font_style", category.font_style);
    formData.append("font_size", category.font_size);
    formData.append("logo_x", category.logo_x);
    formData.append("logo_y", category.logo_y);
    formData.append("date_x", category.date_x);
    formData.append("date_y", category.date_y);
    formData.append("footer_x", category.footer_x);
    formData.append("footer_y", category.footer_y);
    formData.append("footer1_x", category.footer1_x);
    formData.append("footer1_y", category.footer1_y);
    formData.append("gold_x", category.gold_x);
    formData.append("gold_y", category.gold_y);
    formData.append("silver_x", category.silver_x);
    formData.append("silver_y", category.silver_y);
    formData.append("color_code", category.color_code);
    formData.append("status", "active");
    if (selectedImage) {
      formData.append("frame_image", selectedImage);
    }

    try {
      const url = data
        ? `${process.env.REACT_APP_API_GATEWAY_URL}/api/categoryframes/${data.categoryframe_id}`
        : `${process.env.REACT_APP_API_GATEWAY_URL}/api/categoryframe`;

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
      setShowSuccessModal(true);
      if (onHide) onHide(); // Close the modal after success
    } catch (error) {
      console.error("Error saving poster:", error);
      setError("Error saving poster. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`)
    setCategory((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  console.log(selectedImage);

  return (
    <Card.Body>
      <Row>
        <Col
          style={{
            width: "80%",
            maxWidth: "600px",
            marginLeft: "5%",
          }}
        >
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Col>
                <label className="category-form__label" htmlFor="">
                  Select Category
                </label>
              </Col>
              <Col>
                <select
                  className="category-frame__select"
                  name="category_type"
                  id="category_type"
                  onChange={categoryHandler}
                  value={category.category_type}
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Restaurants">Restaurants</option>
                  <option value="Political">Political</option>
                  <option value="Theaters">Theaters</option>
                </select>
              </Col>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Col>
                <label className="category-form__label" htmlFor="">
                  Select Language
                </label>
              </Col>
              <Col>
                <select
                  className="category-frame__select"
                  name="language"
                  id="language"
                  value={category.language}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select Language
                  </option>
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                </select>
              </Col>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Col>
                <label className="category-form__label" htmlFor="">
                  Enter Title
                </label>
              </Col>
              <Col>
                <input
                  className="category-frame__input"
                  type="text"
                  name="title"
                  id="title"
                  value={category.title}
                  onChange={handleChange}
                />
              </Col>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Col>
                <label className="category-form__label" htmlFor="">
                  Select Frame Image
                </label>
              </Col>
              <Col>
                <input
                  className="category-frame__input"
                  type="file"
                  name="frame_image"
                  id="frame_image"
                  onChange={handleImageChange}
                />
              </Col>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Col>
                <label className="category-form__label" htmlFor="">
                  Enter Colour Code
                </label>
              </Col>
              <Col>
                <input
                  className="category-frame__input"
                  type="text"
                  name="color_code"
                  id="color_code"
                  value={category.color_code}
                  onChange={handleChange}
                />
              </Col>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Col>
                <label className="category-form__label" htmlFor="">
                  Enter Font
                </label>
              </Col>
              <Col>
                <select
                  className="category-frame__select"
                  name="font_style"
                  id="font_style"
                  value={category.font_style}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select Font
                  </option>
                  <option value="Nunito">Nunito</option>
                  <option value="Roboto">Roboto</option>
                </select>
              </Col>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Col>
                <label className="category-form__label" htmlFor="">
                  Select Font Size
                </label>
              </Col>
              <Col className="font-size__input">
                <input
                  className="category-frame__input"
                  type="number"
                  name="font_size"
                  id="font_size"
                  value={category.font_size}
                  onChange={handleChange}
                />{" "}
                <span className="px-symbol">px</span>
              </Col>
            </div>

            <div className="alignment">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2rem",
                }}
              >
                <Col>
                  <label className="category-form__label" htmlFor="">
                    Logo Alignment
                  </label>
                </Col>
                <Col>
                  <Row>
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label>X :</label>
                      <input
                        className="category-frame__input"
                        type="text"
                        name="logo_x"
                        id="logo_x"
                        value={category.logo_x}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label>Y :</label>
                      <input
                        className="category-frame__input"
                        type="text"
                        name="logo_y"
                        id="logo_y"
                        value={category.logo_y}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </div>

              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Col>
                    <label className="category-form__label" htmlFor="">
                      Date Alignment
                    </label>
                  </Col>
                  <Col>
                    <Row>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>X :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="date_x"
                          id="date_x"
                          value={category.date_x}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>Y :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="date_y"
                          id="date_y"
                          value={category.date_y}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Col>
                    <label className="category-form__label" htmlFor="">
                      Footer Alignment
                    </label>
                  </Col>
                  <Col>
                    <Row>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>X :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="footer_x"
                          id="footer_x"
                          value={category.footer_x}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>Y :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="footer_y"
                          id="footer_y"
                          value={category.footer_y}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Col>
                    <label className="category-form__label" htmlFor="">
                      Footer1 Alignment
                    </label>
                  </Col>
                  <Col>
                    <Row>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>X :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="footer1_x"
                          id="footer1_x"
                          value={category.footer1_x}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>Y :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="footer1_y"
                          id="footer1_y"
                          value={category.footer1_y}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Col>
                    <label className="category-form__label" htmlFor="">
                      Gold Alignment
                    </label>
                  </Col>
                  <Col>
                    <Row>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>X :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="gold_x"
                          id="gold_x"
                          value={category.gold_x}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>Y :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="gold_y"
                          id="gold_y"
                          value={category.gold_y}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Col>
                    <label className="category-form__label" htmlFor="">
                      Silver Alignment
                    </label>
                  </Col>
                  <Col>
                    <Row>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>X :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="silver_x"
                          id="silver_x"
                          value={category.silver_x}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>Y :</label>
                        <input
                          className="category-frame__input"
                          type="text"
                          name="silver_y"
                          id="silver_y"
                          value={category.silver_y}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </div>
              </>
            </div>
            <div style={{ textAlign: "center", margin: "3rem 0 1rem 0" }}>
              <Button
                variant="contained"
                style={{
                  background:
                    "linear-gradient(rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))",
                  marginTop: "2rem",
                }}
                type="submit"
              >
                {data ? "Update" : "Add"} Poster
              </Button>
            </div>
          </form>
        </Col>
        <Col>
          {selectedImage && (
            <div className="form-group m-5">
              <img
                src={
                  typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
                className="img-thumbnail"
                style={{ width: "200px" }}
              />
            </div>
          )}
        </Col>
      </Row>
      <SuccessModal
        title="Poster Successfully Updated"
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
      />
    </Card.Body>
  );
};

export default AddPoster;
