import React, { useState, useEffect } from "react";
import "./Language.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import NotifyUpdate from "./MyVerticallyCenteredModal";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  TableBody,
  ButtonBase,
} from "@mui/material";
import "@fontsource/lora";
import "@fontsource/montserrat";
import editImage from "./edit.png";
import trashImage from "./trash.png";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Clear, Search } from "@mui/icons-material";
import MyVerticallyCenteredModal from "./Modal";
import Footer from "../../components/footer/Footer";
import NotifySave from "./MyVerticallyCenteredModal";
import { Image } from "react-bootstrap";

const Language = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showNotifySave, setShowNotifySave] = useState(false);
  const [showNotifyUpdate, setShowNotifyUpdate] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [showOriginalPaper, setShowOriginalPaper] = useState(true);
  const [showNewPaper, setShowNewPaper] = useState(false);
  const [showUpdatePaper, setShowUpdatePaper] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState({
    err: false,
    message: "",
  });
  const [searchLanguageData, setSearchLanguageData] = useState("");  
  const [showLanguages, setShowLanguages] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState({
    language_name: "",
    language_image: "",
  });
  const [previewImage, setPreviewImage] = useState(null); 
   const [showNotifyUpdate1, setShowNottifyUpdate1] = useState(false);
  const [entries, setEntries] = useState([
    { id: 1, name: "English", status: false },
    { id: 2, name: "Tamil", status: false },
  ]);


  const handleAddNew = () => {
    setShowOriginalPaper(false);
    setShowNewPaper(true); // Show the new Paper
  };

  //logic for search
  useEffect(() => {
    console.log(searchLanguageData)
    if (searchLanguageData === "") {
      setShowLanguages(originalData); // Reset to original data when search is cleared
    } else {
      const filteredData = originalData.filter((el) =>
        el.language_name.toLowerCase().includes(searchLanguageData)
      );
      setShowLanguages(filteredData);
    }
  }, [searchLanguageData, originalData]);

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchLanguageData(event.target.value.toLowerCase());
  };

  const handleClick = () => {
    setSearchLanguageData("");
    setShowClearIcon("none");
    console.log("clicked the clear icon...");
  };

  const [language, setLanguage] = useState({
    language_name: "",
    language_image: "",
    status: "active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("language_name", language.language_name);
      formData.append("language_image", language.language_image);
      formData.append("status", language.status);
      console.log("form submitted");

      const response = await axios.post(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/language`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );

      setShowNotifySave(true);
      FetchLanguage();
    } catch (error) {
      setError({
        err: true,
        message: error.message,
      });
      console.error(error.message);
    }
  };

  const FetchLanguage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/languages`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Branches response:", response.data.language);
      setShowLanguages(response.data.language);
      setOriginalData(response.data.language)
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    FetchLanguage();
  }, []);

  const handleEdit = (language) => {
    setSelectedLanguage(language);
    setPreviewImage(language.language_image); // Set the preview image to the current language image
    setShowOriginalPaper(false);
    setShowUpdatePaper(true);
  };
  const handleChange1 = (event) => {
    const { id, value } = event.target;
    setSelectedLanguage((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("language_name", selectedLanguage.language_name);
      formData.append("language_image", selectedLanguage.language_image);

      const response = await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/languages/${selectedLanguage.language_id}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("response", response.data);
      setShowNotifyUpdate(true);
      FetchLanguage();
    } catch (error) {
      setError({
        err: true,
        message: error.message,
      });
      console.error(error.message);
    }
  };

  const handleDelete = async (language_id) => {
    console.log("Attempting to delete language with ID:", language_id);
    try {
      // Send a delete request to the API endpoint
      const response = await axios.delete(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/languages/${language_id}`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
  
      console.log('Delete response:', response.data);
      // If deletion is successful, update the list of languages
      FetchLanguage();
    } catch (error) {
      console.error("Error deleting language:", error);
      // Update the error state to display the error message
      setError({
        err: true,
        message: error.message,
      });
    }
  };
  

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setModalShow(true);
  };

  const handleStatusChange = async (language_id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const formData = new FormData();
      formData.append("status", newStatus);

      await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/languages/${language_id}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      FetchLanguage(); // Refetch data to update the table
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle the error
    }
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        {showOriginalPaper && (
          <Paper
            elevation={10}
            style={{
              width: "95%",
              margin: "1rem auto",
              height: "80vh",
              borderRadius: "20px 20px 20px 20px",
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
                  padding: "20px",
                  fontFamily: "Lora",
                  fontSize: "25px",
                  paddingLeft: "30px",
                  textAlign: "center",
                }}
              >
                Language
              </div>
            </div>
            <div className="secondletter">
              <div
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Show
              </div>

              <input
                type="text"
                style={{
                  width: "50px",
                  height: "30px",
                  marginLeft: "20px",
                  marginRight: "5px",
                  alignContent: "center",
                  textAlign: "center",
                }}
                value={showLanguages.length}
                readOnly
              />

              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "20px",
                  marginLeft: "10px",
                }}
              >
                entries
              </span>

              <FormControl>
                <TextField
                  style={{ borderRadius: "9px", marginLeft: "500px" }}
                  size="small"
                  variant="outlined"
                  value={searchLanguageData}
                  onChange={handleChange}
                  placeholder="Search..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ display: showClearIcon }}
                       
                      >
                        <Clear onClick={handleClick} style={{ cursor: "pointer" }}/>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <h2 className="buttonstyle" onClick={handleAddNew}>
                + Add New
              </h2>
            </div>
            <div style={{ padding: "30px", borderRadius: "16px" }}>
              <TableContainer>
                <Table className="table table-bordered">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontFamily: "Lora",
                          fontWeight: "500",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                      >
                        No
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: "Lora",
                          fontWeight: "500",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: "Lora",
                          fontWeight: "500",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: "Lora",
                          fontWeight: "500",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showLanguages.map((row, index) => (
                      <TableRow key={index.language_id}>
                        <TableCell
                          style={{
                            fontFamily: "Montserrat",
                            fontWeight: "500",
                            fontSize: "20px",
                            textAlign: "center",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{
                            fontFamily: "Montserrat",
                            fontWeight: "500",
                            fontSize: "20px",
                          }}
                        >
                          {/* Display image based on language */}
                          <div
                            style={{
                              width: "150px", // Increased width for demonstration
                              height: "60px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                marginRight: "10px", // Added margin for spacing between image and text
                              }}
                            >
                              <img
                                src={row.language_image}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <span style={{ marginTop: "10px" }}>
                              {" "}
                              {row.language_name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`ios-toggle-${index}`}
                                checked={row.status === "active"}
                                onChange={() =>
                                  handleStatusChange(
                                    row.language_id,
                                    row.status
                                  )
                                }
                              />
                              <label for={`ios-toggle-${index}`} />
                            </div>
                          </div>
                        </TableCell>

                        <TableCell
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <Image
                            src={editImage}
                            alt="Edit"
                            className="actionIcon"
                            onClick={() => handleEdit(row)}
                          />
                          &nbsp;&nbsp;
                          <ButtonBase style={{ margin: "0 .25rem" }}>
                            <Image
                              src={trashImage}
                              alt="Trash"
                              className="actionIcon"
                              onClick={() => handleDeleteClick(row)}
                            />
                          </ButtonBase>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <MyVerticallyCenteredModal
                title="Delete"
                body="Are You Sure You Want to Delete ?"
                type={{
                  className: "danger",
                  name: "Delete",
                }}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onConfirm={() => {
                  handleDelete(selectedRow.language_id);
                  console.log("Deleting:", selectedRow);
                  setModalShow(false);
                }}
              />
            </div>
          </Paper>
        )}

        {showNewPaper && (
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
                    padding: "20px",
                    fontFamily: "Lora",
                    fontSize: "25px",
                    paddingLeft: "30px",
                    textAlign: "center",
                  }}
                >
                  Add Language
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ padding: "20px", borderRadius: "16px" }}
            >
              <div
                style={{
                  marginTop: "80px",
                  marginLeft: "100px",
                  marginBottom: "100px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    Language{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Language Name"
                    onChange={(e) =>
                      setLanguage((prevState) => ({
                        ...prevState,
                        language_name: e.target.value,
                      }))
                    }
                    value={language.language_name}
                    required
                    name="language_name"
                    style={{
                      padding: "8px",
                      borderRadius: "10px",
                      border: "2px solid #A6A6A6",
                      marginBottom: "30px",
                      marginLeft: "7%",
                      width: "25vw",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    Select Image{" "}
                  </label>
                  <input
                    type="file"
                    required
                    className="label"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setLanguage((prevLanguage) => ({
                        ...prevLanguage,
                        language_image: file,
                      }));
                    }}
                    name="language_image"
                    style={{
                      padding: "8px",
                      borderRadius: "10px",
                      border: "2px solid #A6A6A6",
                      marginLeft: "50px",
                      width: "25vw",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </div>
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
                {error.err && <p style={{ color: "red" }}>{error.message}</p>}
                <NotifySave
                  show={showNotifySave}
                  title="Language Successfully Added"
                  onHide={() => {
                    setShowNotifySave(false);
                    setShowOriginalPaper(true);
                    setShowNewPaper(false);
                  }}
                />
              </center>
            </form>
          </Paper>
        )}

        {showUpdatePaper && (
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
                  padding: "20px",
                  fontFamily: "Lora",
                  fontSize: "25px",
                  paddingLeft: "30px",
                  textAlign: "center",
                }}
              >
                Update Language
              </div>
            </div>
            <div style={{ position: "absolute", right: "8%", top: "30%" }}>
              {/* Occupy 40% of the width for the image */}
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Selected Language"
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "20px",
                  }}
                />
              )}
            </div>
            <form
              onSubmit={handleUpdate}
              style={{ width: "60%", padding: "20px", borderRadius: "16px" }}
            >
              <div
                style={{
                  marginTop: "80px",
                  marginLeft: "100px",
                  marginBottom: "100px",
                }}
              >
                <div>
      <label
        style={{
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: "20px",
        }}
      >
        Language{" "}
      </label>
      <input
        type="text"
        id="language_name"
        value={selectedLanguage.language_name}
        onChange={handleChange1}
        style={{
          padding: "8px",
          borderRadius: "10px",
          border: "2px solid #A6A6A6",
          marginBottom: "30px",
          marginLeft: "75px",
          width: "21vw",
        }}
      />
    </div>
                <div>
                  <label
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    Select Image{" "}
                  </label>
                  <input
                    type="file"
                    id="language_image"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setSelectedLanguage((prevLanguage) => ({
                        ...prevLanguage,
                        language_image: file,
                      }));
                    }}
                    name="language_image"
                    style={{
                      padding: "8px",
                      borderRadius: "10px",
                      border: "2px solid #A6A6A6",
                      marginLeft: "50px",
                      width: "21vw",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </div>
              <center>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleRefresh}
                  style={{
                    background:
                      "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                    color: "white", // Set text color to white
                    borderRadius: "5px", // Add border radius
                    padding: "10px 80px 10px 80px", // Add padding for the button
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
                    transition: "background-color 0.3s ease", // Add transition effect
                    marginBottom: "100px",
                    textTransform: "none",
                    fontSize: "17px",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                  }}
                >
                  Update
                </Button>

                <NotifyUpdate
                  show={showNotifyUpdate}
                  title="Language Successfully Updated"
                  onHide={() => {
                    setShowNottifyUpdate1(false);
                    setShowOriginalPaper(true);
                    setShowUpdatePaper(false);
                  }}
                />
              </center>
            </form>
          </Paper>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Language;
