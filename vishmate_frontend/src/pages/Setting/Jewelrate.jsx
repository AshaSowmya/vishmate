import { FileDownloadOutlined } from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import editPng from "../../assets/akar-icons_edit.png";
import morePng from "../../assets/ep_more.png";
import deletePng from "../../assets/ph_trash-light.png";
import MyVerticallyCenteredModal from "../../components/Modal/Modal";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Jewelrate.scss";
import JewelSave from "./MyVerticallyCenteredModal";

const Jewelrate = () => {
  const [showJewelPaper, setShowJewelPaper] = useState(true);
  const [showNewJewelPaper, setShowNewJewelPaper] = useState(false);
  const [showEditJewelPaper, setShowEditJewelPaper] = useState(false);
  const [showJewelSave, setShowJewelSave] = useState(false);
  const [showJewelUpdate, setShowJewelUpdate] = useState(false);
  const [showAddUserSave, setShowAddUserSave] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [location, setLocation] = useState([]);
  const [detail, setDetail] = useState({
    time: "",
    location: "",
    goldrate: "",
    silverrate: "",
  });

  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/goldrate`,
        detail,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("jewel rate", detail);
      setShowJewelSave(true);
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Error adding user. Please try again later.");
    }
  };
  console.log("jewel rate", detail);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/goldrates`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Branches response:", response.data.goldrate);
      setBranches(response.data.goldrate);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/addlocations`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Branches response:", response.data.addlocation);
      setLocation(response.data.addlocation);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchLocation();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      // Send a DELETE request to your backend API endpoint
      const res = await axios.delete(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/goldrates/${selectedRow.goldrate_id}`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Deleted row:", res.data);
      // Update UI to reflect the deletion
      fetchBranches(); // Refetch data to update the table
    } catch (error) {
      console.error("Error deleting row:", error);
    }
    setModalShow(false);
  };
  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setModalShow(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };
  const handleAddNewJewel = () => {
    setShowJewelPaper(false);
    setShowNewJewelPaper(true); // Show the new Paper
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/goldrates`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      const data = response.data.goldrate;

      const doc = new jsPDF();
      doc.text("Jewel Rates", 14, 20);
      doc.autoTable({
        startY: 30,
        head: [["Time", "Location", "Gold Rate", "Silver Rate"]],
        body: data.map((row) => [
          row.time,
          row.location,
          row.goldrate,
          row.silverrate,
        ]),
      });
      doc.save("jewel_rates.pdf");
    } catch (error) {
      console.error("Error fetching and downloading data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBranches = branches.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditJewelPaper = (row) => {
    setSelectedRow(row);
    setDetail({
      time: row.time,
      location: row.location,
      goldrate: row.goldrate,
      silverrate: row.silverrate,
    });
    setShowJewelPaper(false);
    setShowEditJewelPaper(true); // Show the new Paper
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/goldrates/${selectedRow.goldrate_id}`,
        detail,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Updated jewel rate", detail);
      setShowJewelUpdate(true);
      fetchBranches();
    } catch (error) {
      console.error("Error updating jewel rate:", error);
      setError("Error updating jewel rate. Please try again later.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        {showJewelPaper && (
          <div className="top" style={{ boxShadow: "none", padding: "0" }}>
            <Container>
              <Row>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ButtonBase className="AddButton" onClick={handleAddNewJewel}>
                    {" "}
                    + Add New{" "}
                  </ButtonBase>
                </div>
              </Row>
              <Row className="mt-5">
                <Col className="p-0">
                  <Card
                    style={{ boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc" }}
                  >
                    <Card.Header
                      as="h4"
                      className="p-3"
                      style={{
                        color: "white",
                        fontFamily: "Lora",
                        background:
                          "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          style={{
                            fontFamily: "Lora",
                            fontSize: "2rem",
                            fontWeight: "500",
                            paddingLeft: "1rem",
                          }}
                        >
                          Jewel Rate
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell
                                style={{
                                  backgroundColor: "rgba(243, 247, 254, 1)",
                                  fontWeight: "600",
                                  fontFamily: "Montserrat",
                                  color: "rgba(36, 36, 62, 1)",
                                }}
                                align="center"
                              >
                                Time
                              </TableCell>
                              <TableCell
                                style={{
                                  backgroundColor: "rgba(243, 247, 254, 1)",
                                  fontWeight: "600",
                                  fontFamily: "Montserrat",
                                  color: "rgba(36, 36, 62, 1)",
                                }}
                                align="center"
                              >
                                Location
                              </TableCell>
                              <TableCell
                                style={{
                                  backgroundColor: "rgba(243, 247, 254, 1)",
                                  fontWeight: "600",
                                  fontFamily: "Montserrat",
                                  color: "rgba(36, 36, 62, 1)",
                                }}
                                align="center"
                              >
                                Gold Rate
                              </TableCell>
                              <TableCell
                                style={{
                                  backgroundColor: "rgba(243, 247, 254, 1)",
                                  fontWeight: "600",
                                  fontFamily: "Montserrat",
                                  color: "rgba(36, 36, 62, 1)",
                                }}
                                align="center"
                              >
                                Silver Rate
                              </TableCell>
                              <TableCell
                                style={{
                                  backgroundColor: "rgba(243, 247, 254, 1)",
                                  fontWeight: "600",
                                  fontFamily: "Montserrat",
                                  color: "rgba(36, 36, 62, 1)",
                                }}
                                align="center"
                              >
                                <Image src={morePng} alt="Edit" height={26} />
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {currentBranches.map((row, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">{row.time}</TableCell>
                                <TableCell
                                  align="center"
                                  component="th"
                                  scope="row"
                                >
                                  {row.location}
                                </TableCell>
                                <TableCell align="center">
                                  &#8377; {row.goldrate}
                                </TableCell>
                                <TableCell align="center">
                                  &#8377; {row.silverrate}
                                </TableCell>
                                <TableCell align="center">
                                  <ButtonBase
                                    variant="light"
                                    className="p-1"
                                    onClick={() => handleEditJewelPaper(row)}
                                  >
                                    <Image
                                      src={editPng}
                                      style={{ width: "25px", height: "25px" }}
                                    />
                                  </ButtonBase>
                                  <ButtonBase
                                    style={{ margin: "0 .25rem" }}
                                    onClick={() => handleDeleteClick(row)}
                                  >
                                    <Image src={deletePng} />
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
                        type={{ name: "Delete" }}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        onConfirm={handleDeleteConfirm}
                      />
                    </Card.Body>
                    <Card.Footer>
                      <Pagination
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          borderRadius: "6px",
                        }}
                        shape="rounded"
                        count={Math.ceil(branches.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handleChangePage}
                        renderItem={(item) => (
                          <PaginationItem
                            style={{
                              borderRadius: "6px",
                              backgroundColor: item.selected
                                ? "#24243e"
                                : "transparent",
                              color: item.selected ? "white" : "black",
                            }}
                            {...item}
                          />
                        )}
                      />
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3 mb-5" style={{ justifyContent: "flex-end" }}>
                <Button
                  style={{
                    width: "fit-content",
                    padding: ".5rem 1rem",
                    fontFamily: "Montserrat",
                    marginBottom: "50px",
                    marginRight: "80px",
                    color: "white",
                    marginTop: "3%",
                    background:
                      "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                    textTransform: "",
                  }}
                  onClick={handleDownload}
                >
                  Download&nbsp;
                  <FileDownloadOutlined />
                </Button>
              </Row>
            </Container>
          </div>
        )}

        {showNewJewelPaper && (
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
                  textAlign: "left",
                }}
              >
                Add Jewel Rate
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  marginTop: "80px",
                  marginLeft: "200px",
                  marginBottom: "100px",
                }}
              >
                <div className="d-flex ">
                  <div>
                    <label
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "block",
                      }}
                    >
                      Time{" "}
                    </label>
                    <br></br>
                    <select
                      style={{
                        padding: "8px 8px",
                        borderRadius: "4px",
                        border: "2px solid #A6A6A6 ",
                        marginRight: "20px",
                        width: "40vh",
                      }}
                      id="time"
                      name="time"
                      type="text"
                      value={detail.time}
                      onChange={handleChange}
                      required
                    >
                      <option hidden>Select Time</option>
                      <option value="Morning">Morning</option>
                      <option value="Evening">Evening</option>
                    </select>

                    <br></br>
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "block",
                        marginLeft: "100px",
                      }}
                    >
                      Location{" "}
                    </label>
                    <br></br>
                    <select
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "2px solid #A6A6A6",
                        marginRight: "20px",
                        width: "40vh",
                        marginLeft: "100px",
                      }}
                      id="location"
                      name="location"
                      type="text"
                      value={detail.location}
                      onChange={handleChange}
                      required
                    >
                      <option hidden>Select Location</option>
                      {location.map((el) => (
                        <option key={el.addlocation_id}>
                          {el.addlocation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <br></br>
                <div className="d-flex ">
                  <div>
                    <label
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "block",
                      }}
                    >
                      Gold Rate{" "}
                    </label>
                    <br></br>
                    <input
                      id="goldrate"
                      name="goldrate"
                      type="number"
                      value={detail.goldrate}
                      onChange={handleChange}
                      required
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "2px solid #A6A6A6",
                        marginRight: "20px",
                        width: "40vh",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "block",
                        marginLeft: "100px",
                      }}
                    >
                      Silver Rate{" "}
                    </label>
                    <br></br>
                    <input
                      id="silverrate"
                      name="silverrate"
                      type="number"
                      value={detail.silverrate}
                      onChange={handleChange}
                      required
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "2px solid #A6A6A6",
                        marginRight: "20px",
                        width: "40vh",
                        marginLeft: "28%",
                      }}
                    />
                  </div>
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
                <JewelSave
                  show={showJewelSave}
                  title="Jewel Rate Successfully Added"
                  onHide={() => {
                    setShowJewelSave(false);
                    setShowNewJewelPaper(false);
                    setShowJewelPaper(true);
                    fetchBranches();
                  }}
                />
              </center>
            </form>
          </Paper>
        )}

        {showEditJewelPaper && (
          <div className="top" style={{ boxShadow: "none", padding: "0" }}>
            <Container>
              <form onSubmit={handleUpdate}>
                <Row className="mt-5">
                  <Col className="p-0">
                    <Card
                      style={{ boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc" }}
                    >
                      <Card.Header
                        as="h4"
                        className="p-3"
                        style={{
                          color: "white",
                          fontFamily: "Lora",
                          background:
                            "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            style={{
                              fontFamily: "Lora",
                              fontSize: "2rem",
                              fontWeight: "bold",
                            }}
                          >
                            Edit Jewel Rate
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-3">
                          <Col md={6}>
                            <label
                              style={{
                                fontFamily: "Montserrat",
                                fontSize: "20px",
                                fontWeight: "600",
                                display: "block",
                                marginBottom: "1rem",
                              }}
                            >
                              Time{" "}
                            </label>
                            <input
                              type="text"
                              name="time"
                              placeholder="Time"
                              value={detail.time}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </Col>
                          <Col md={6}>
                            <label
                              style={{
                                fontFamily: "Montserrat",
                                fontSize: "20px",
                                fontWeight: "600",
                                display: "block",
                                marginBottom: "1rem",
                              }}
                            >
                              Location{" "}
                            </label>
                            <input
                              type="text"
                              name="location"
                              placeholder="Location"
                              value={detail.location}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={6}>
                            <label
                              style={{
                                fontFamily: "Montserrat",
                                fontSize: "20px",
                                fontWeight: "600",
                                display: "block",
                                marginBottom: "1rem",
                              }}
                            >
                              Gold Rate{" "}
                            </label>
                            <input
                              type="text"
                              name="goldrate"
                              placeholder="Gold Rate"
                              value={detail.goldrate}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </Col>
                          <Col md={6}>
                            <label
                              style={{
                                fontFamily: "Montserrat",
                                fontSize: "20px",
                                fontWeight: "600",
                                display: "block",
                                marginBottom: "1rem",
                              }}
                            >
                              Silver Rate{" "}
                            </label>
                            <input
                              type="text"
                              name="silverrate"
                              placeholder="Silver Rate"
                              value={detail.silverrate}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col className="d-flex justify-content-center">
                            <ButtonBase type="submit" className="AddButton">
                              Update
                            </ButtonBase>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </form>
            </Container>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Jewelrate;
