import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Paper, Button } from "@mui/material";
import "@fontsource/montserrat";
import Footer from "../../components/footer/Footer";
import AddUserSave from "./MyVerticallyCenteredModal";
import "../../assets/css/virtual-select.min.css";
import { Col, Row } from "react-bootstrap";

const AddUser = () => {
  const [showAddUserSave, setShowAddUserSave] = useState(false);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/categoryposts`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Branches response:", response.data.categorypost);
      setCategory(response.data.categorypost);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user_name = formData.get("user_name");
    const admin_email = formData.get("admin_email");
    const password = formData.get("password");
    const category = formData.get("select_category");
    console.log(user_name, admin_email, password, category);
    const detail = { user_name, admin_email, password, category };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/adminsignup`,
        detail,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      setShowAddUserSave(true);
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Error adding user. Please try again later.");
    }
  };

  // Update handleChange functions to spread the existing state and update specific fields
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDetail((prevDetail) => ({
  //     ...prevDetail,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "../../assets/js/virtual-select.min.js"; // Adjust the path as necessary
    script.onload = () => {
      if (window.VirtualSelect) {
        window.VirtualSelect.init({
          ele: "#example-select",
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
  }, []);

  // useEffect(() => {
  //   if (window.VirtualSelect) {
  //     window.VirtualSelect.init({
  //       ele: "#example-select",
  //       multiple: true,
  //       search: false,
  //     });
  //   } else {
  //     console.error("VirtualSelect is not defined");
  //   }
  // }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <Paper
            elevation={10}
            style={{
              width: "95%",
              margin: "1rem auto",
              height: "80vh",
              borderRadius: "20px 20px 0px 0px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "auto",
                background:
                  "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                borderRadius: "20px 20px 0px 0px",
              }}
            >
              <div
                style={{
                  color: "white",
                  padding: "10px",
                  fontFamily: "Lora",
                  fontSize: "25px",
                  paddingLeft: "30px",
                  textAlign: "center",
                }}
              >
                Add User
              </div>
            </div>
            <div className="m-5">
              <form onSubmit={handleSubmit}>
                <Row className="mx-5">
                  <Col>
                    <label
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "block",
                        marginBottom: "1rem",
                      }}
                    >
                      User Name{" "}
                    </label>
                    <input
                      type="text"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #1F2937",
                        width: "100%",
                        maxWidth: "350px",
                      }}
                      name="user_name"
                      required
                    />
                  </Col>
                  <Col>
                    <label
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "block",
                        marginBottom: "1rem",
                      }}
                    >
                      Email ID{" "}
                    </label>
                    <input
                      type="email"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #1F2937",
                        width: "100%",
                        maxWidth: "350px",
                      }}
                      name="admin_email"
                      required
                    />
                  </Col>
                </Row>
                <Row className="my-5 mx-5">
                  <Col>
                    <label
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "block",
                        marginBottom: "1rem",
                      }}
                    >
                      Password{" "}
                    </label>
                    <input
                      type="password"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #1F2937",
                        width: "100%",
                        maxWidth: "350px",
                      }}
                      name="password"
                      required
                    />
                  </Col>
                  <Col>
                    <label
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "block",
                        marginBottom: "1rem",
                      }}
                    >
                      Category{" "}
                    </label>
                    <select
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                      }}
                      id="example-select"
                      multiple
                      name="select_category"
                      placeholder="Select Category"
                      data-silent-initial-value-set="true"
                    >
                      {category.map((el) => (
                        <option key={el.category_id} value={el.category_name}>{el.category_name}</option>
                      ))}
                      {/* <option value="">Jewellery</option>
                      <option value="">Restaurents</option>
                      <option value="">Political</option>
                      <option value="">Theatres</option> */}
                    </select>
                  </Col>
                </Row>
                <center>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      background:
                        "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                      color: "white", // Set text color to white
                      borderRadius: "5px", // Add border radius
                      padding: "10px 80px 10px 80px", // Add padding for the button
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
                      transition: "background-color 0.3s ease", // Add transition effect
                      marginBottom: "30px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "17px",
                      textTransform: "none",
                    }}
                  >
                    Save
                  </Button>
                  <AddUserSave
                    show={showAddUserSave}
                    title="User Successfully Added"
                    onHide={() => setShowAddUserSave(false)}
                  />
                </center>
              </form>
            </div>
          </Paper>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default AddUser;
