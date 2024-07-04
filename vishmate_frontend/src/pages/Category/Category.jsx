import "./Category.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import {
  Paper,
  TableCell,
  TableHead,
  Table,
  TableRow,
  TableContainer,
  Button,
  Stack,
  PaginationItem,
  Pagination,
  Modal,
  Box,
  ButtonBase,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";

import { useState, useEffect } from "react";
import edit from "./edit.png";
import trash from "./trash.png";

import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import MyVerticallyDeleteModal from "../../components/Modal/Modal";
import { AddRounded, Clear, Search } from "@mui/icons-material";
import Footer from "../../components/footer/Footer";
import { TableBody } from "@material-ui/core";

const Category = () => {
  const [showOriginalPaper, setShowOriginalPaper] = useState(true);
  const [showAddPoster, setShowAddPoster] = useState(false);
  const [showEditPoster, setShowEditPoster] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [error, setError] = useState({
    err: false,
    message: "",
  });
  const [showCategories, setShowCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track the selected language for editing
  const [selectedRow, setSelectedRow] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State to manage image preview
  const [originalData, setOriginalData] = useState([]);
  const [searchFilteredData, setSearchFilteredData] = useState("");

  //function declarations of Category

  // const [entries, setEntries] = useState([
  //   { id: 1, name: "Jewellery", status: false },
  //   { id: 2, name: "Political", status: false },
  //   { id: 3, name: "Restaurant", status: false },
  //   { id: 4, name: "Theaters", status: false },
  // ]);

  const [category, setCategory] = useState({
    category_name: "",
    category_image: "",
    category_status: "active",
  });

  const handleEditPoster = (Category) => {
    setSelectedCategory(Category);
    setPreviewImage(Category.category_image);
    setShowOriginalPaper(false);
    setShowEditPoster(true); // Show the edit poster Paper
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category_name", selectedCategory.category_name);
      if (selectedCategory.category_image) {
        formData.append("category_image", selectedCategory.category_image);
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/categoryposts/${selectedCategory.category_id}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Updated category", res.data);
      // Optionally refresh categories or update state
      setShowSaveModal(true);
    } catch (error) {
      setError({
        err: true,
        message: error.response?.data?.message || error.message,
      });
      console.error("Update failed:", error.response?.data || error.message);
    }
    setShowUpdateModal(true);
  };

  const handleSave = () => {
    setShowOriginalPaper(true);
    setShowAddPoster(false);
    setShowEditPoster(false); // Reset to original state after saving
  };

  const addButtonIsClicked = () => {
    setShowAddPoster(true);
    setShowOriginalPaper(false);
    setShowEditPoster(false); //
  };

  useEffect(() => {
    if (searchFilteredData === "") {
      setShowCategories(originalData); // Reset to original data when search is cleared
    } else {
      const filteredData = originalData.filter((el) =>
        el.category_name.toLowerCase().includes(searchFilteredData)
      );
      setShowCategories(filteredData);
    }
  }, [searchFilteredData, originalData]);

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchFilteredData(event.target.value.toLowerCase());
  };

  const handleClick = () => {
    // TODO: Clear the search input
    setSearchFilteredData("");
    console.log("clicked the clear icon...");
  };

  //post opeations
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(category);
      formData.append("category_name", category.category_name);
      formData.append("category_image", category.category_image);
      formData.append("category_status", category.category_status);
      console.log("form submitted");

      await axios.post(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/categorypost`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );

      setShowSaveModal(true);
      FetchCategories();
    } catch (error) {
      setError({
        err: true,
        message: error.message,
      });
      console.error(error.message);
    }
  };

  //delete operations
  const handleDelete = async (category_id) => {
    console.log("deleting category id:", category_id);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/categoryposts/${category_id}`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );

      FetchCategories();
    } catch (error) {
      console.error("Error deleting language:", error);
      setError({
        err: true,
        message: error.message,
      });
    }
  };

  //get operations
  const FetchCategories = async () => {
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
      setShowCategories(response.data.categorypost);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  useEffect(() => {
    FetchCategories();
  }, []);

  const handleStatusChange = async (category_id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/categoryposts/${category_id}`,
        { category_status: newStatus }, // Send data as JSON
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            "Content-Type": "application/json", // Set correct content type
          },
        }
      );
      console.log("Status updated:", response.data);
      FetchCategories(); // Refetch data to update the table
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
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
        <div className="top">
          {showOriginalPaper && (
            <Paper
              elevation={10}
              style={{
                width: "95%",
                margin: "1rem auto",
                height: "100%",
                maxHeight: "90%",
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
                    textAlign: "left",
                  }}
                >
                  Category
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mx-5 my-4">
                <div className="d-flex" style={{ gap: "10px" }}>
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
                      textAlign: "center",
                    }}
                    value={showCategories.length}
                    readOnly
                  />
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    entries
                  </div>
                </div>
                <div className="d-flex align-items-center" style={{gap: "10px"}}>
                  <FormControl>
                    <TextField
                      size="small"
                      variant="outlined"
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
                            onClick={handleClick}
                          >
                            <Clear />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <ButtonBase className="category_button" onClick={addButtonIsClicked}>
                    + Add New
                  </ButtonBase>
                </div>
              </div>
              <center>
                <TableContainer className="table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            textAlign: "center",
                            fontFamily: "Lora",
                          }}
                        >
                          No
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            textAlign: "center",
                            fontFamily: "Lora",
                          }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            textAlign: "center",
                            fontFamily: "Lora",
                          }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            textAlign: "center",
                            fontFamily: "Lora",
                          }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {showCategories.map((valueCategory, index) => (
                        <TableRow key={valueCategory.category_id}>
                          <TableCell
                            style={{
                              textAlign: "center",
                              fontWeight: "600",
                              fontSize: "16px",
                            }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            style={{
                              fontFamily: "Montserrat",
                              fontWeight: "600",
                              fontSize: "16px",
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
                                  src={valueCategory.category_image}
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
                                {valueCategory.category_name}
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
                                  checked={
                                    valueCategory.category_status === "active"
                                  }
                                  onChange={() =>
                                    handleStatusChange(
                                      valueCategory.category_id,
                                      valueCategory.category_status
                                    )
                                  }
                                />
                                <label htmlFor={`ios-toggle-${index}`} />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              border: "none",
                            }}
                          >
                            <img
                              src={edit}
                              alt="Edit"
                              className="actionIcon"
                              onClick={() => handleEditPoster(valueCategory)}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <ButtonBase style={{ margin: "0 .25rem" }}>
                              <img
                                src={trash}
                                alt="Trash"
                                className="actionIcon"
                                onClick={() => {
                                  setSelectedRow(valueCategory.category_id);
                                  setShowDeleteModal(true);
                                }}
                              />
                            </ButtonBase>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <MyVerticallyDeleteModal
                  title="Delete"
                  body="Are You Sure You Want to Delete ?"
                  type={{
                    name: "Delete",
                  }}
                  show={showDeleteModal}
                  onHide={() => setShowDeleteModal(false)}
                  onConfirm={() => {
                    handleDelete(selectedRow);
                    console.log("Deleting:", selectedRow);
                    setShowDeleteModal(false);
                  }}
                />
              </center>
              <div className="end">
                <Stack spacing={2}>
                  <Pagination
                    style={{ display: "flex", justifyContent: "center" }}
                    shape="rounded"
                    count={1}
                    renderItem={(item) => (
                      <PaginationItem
                        style={{
                          borderRadius: "6px",
                          backgroundColor: item.selected
                            ? "#24243e"
                            : "transparent",
                          color: item.selected ? "White" : "black",
                        }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              </div>
            </Paper>
          )}
          {showAddPoster && (
            <Paper
              elevation={10}
              style={{
                width: "95%",
                margin: "1rem auto",
                height: "90vh",
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
                  Add Poster
                </div>
              </div>
              <form onSubmit={handleSubmit}>
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
                      Name{" "}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      required
                      onChange={(e) =>
                        setCategory((prevState) => ({
                          ...prevState,
                          category_name: e.target.value,
                        }))
                      }
                      value={category.category_name}
                      name="category_name"
                      style={{
                        padding: "8px",
                        borderRadius: "10px",
                        border: "2px solid #A6A6A6",
                        marginBottom: "30px",
                        marginLeft: "12%",
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
                        setCategory((prevCategory) => ({
                          ...prevCategory,
                          category_image: file,
                        }));
                      }}
                      name="category_image"
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
                <br />

                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    background:
                      "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                    color: "white", // Set text color to white
                    borderRadius: "5px", // Add border radius
                    padding: "10px 60px 10px 60px", // Add padding for the button
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
                    transition: "background-color 0.3s ease", // Add transition effect
                    marginBottom: "30px",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    fontSize: "17px",
                    textTransform: "none",
                    marginLeft: "40%",
                    marginTop: "25px",
                    marginBottom: "20%",
                  }}
                >
                  Save
                </Button>
                {error.err && <p style={{ color: "red" }}>{error.message}</p>}
                <MyVerticallyCenteredModal
                  title="Poster Successfully Added"
                  handleConfirm={() => {}}
                  show={showSaveModal}
                  onHide={() => {
                    setShowSaveModal(false);
                    setShowOriginalPaper(true);
                    setShowAddPoster(false);
                  }}
                />
              </form>
            </Paper>
          )}

          {showEditPoster && (
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
                  Update Poster
                </div>
              </div>
              <div style={{ position: "absolute", right: "8%", top: "30%" }}>
                {/* Occupy 40% of the width for the image */}
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Selected Category"
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
                      Name{" "}
                    </label>
                    <input
                      type="text"
                      id="category_name"
                      placeholder="Enter Name"
                      value={selectedCategory.category_name}
                      onChange={(e) => {
                        setSelectedCategory((prevState) => ({
                          ...prevState,
                          category_name: e.target.value,
                        }));
                      }}
                      style={{
                        padding: "8px",
                        borderRadius: "10px",
                        border: "2px solid #A6A6A6",
                        marginBottom: "30px",
                        marginLeft: "16%",
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
                      id="category_image"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setSelectedCategory((prevCategory) => ({
                          ...prevCategory,
                          category_image: file,
                        }));
                      }}
                      name="category_image"
                      style={{
                        padding: "8px",
                        borderRadius: "10px",
                        border: "2px solid #A6A6A6",
                        marginLeft: "20px",
                        width: "25vw",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    background:
                      "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                    color: "white", // Set text color to white
                    borderRadius: "5px", // Add border radius
                    padding: "10px 60px 10px 60px", // Add padding for the button
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
                    transition: "background-color 0.3s ease", // Add transition effect
                    marginBottom: "30px",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    fontSize: "17px",
                    textTransform: "none",
                    marginLeft: "40%",
                    marginTop: "25px",
                    marginBottom: "20%",
                  }}
                >
                  Update
                </Button>

                <MyVerticallyCenteredModal
                  onClick={handleRefresh}
                  title="Poster Successfully Updated"
                  handleConfirm={() => {}}
                  show={showUpdateModal}
                  onHide={() => {
                    setShowEditPoster(false);
                    setShowOriginalPaper(true);
                    setShowUpdateModal(false);
                  }}
                />
              </form>
            </Paper>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Category;
