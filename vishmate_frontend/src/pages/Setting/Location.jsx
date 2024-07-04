import "./Location.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import {
  Paper,
  Button,
  ButtonBase,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import morePng from "../../assets/ep_more.png";
import editPng from "../../assets/akar-icons_edit.png";
import deletePng from "../../assets/ph_trash-light.png";
import { useState, useEffect } from "react";
import LocationSave from "./MyVerticallyCenteredModal";
import LocationUpdate from "./MyVerticallyCenteredModal";
import MyVerticallyCenteredModal from "../../components/Modal/Modal";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import PaginationComponent from "../../components/Pagination/PaginationComponent";

const Location = () => {
  const [LocationDeleteShow, setLocationDeleteShow] = useState(false);
  const [showLocationPaper, setShowLocationPaper] = useState(true);
  const [showNewLocationPaper, setShowNewLocationPaper] = useState(false);
  const [showEditLocationPaper, setShowEditLocationPaper] = useState(false);
  const [showLocationSave, setShowLocationSave] = useState(false);
  const [showLocationUpdate, setShowLocationUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [detail, setDetail] = useState({
    addlocation: "",
  });
  const [editDetail, setEditDetail] = useState({
    addlocation: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBranches = branches.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddNewLocation = () => {
    setShowLocationPaper(false);
    setShowNewLocationPaper(true);
  };

  const handleEditLocationPaper = (row) => {
    setSelectedRow(row);
    setEditDetail({ addlocation: row.addlocation });
    setShowLocationPaper(false);
    setShowEditLocationPaper(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/addlocation`,
        detail,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("location", detail);
      setShowLocationSave(true);
      fetchBranches(); // Refresh data after adding a new location
    } catch (error) {
      console.error("Error adding location:", error);
      setError("Error adding location. Please try again later.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/addlocations/${selectedRow.addlocation_id}`,
        editDetail,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Updated location", editDetail);
      setShowLocationUpdate(true);
      fetchBranches(); // Refresh data after editing a location
    } catch (error) {
      console.error("Error updating location:", error);
      setError("Error updating location. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const fetchBranches = async () => {
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
      setBranches(response.data.addlocation);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/addlocations/${selectedRow.addlocation_id}`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Deleted row:", res.data);
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

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        {showLocationPaper && (
          <div className="top" style={{ boxShadow: "none", padding: "0" }}>
            <Container>
              <Row>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ButtonBase
                    style={{
                      padding: ".5rem 1.5rem",
                      border: "1px solid",
                      borderRadius: "10px",
                    }}
                    className="LocationButton"
                    onClick={handleAddNewLocation}

                    // onChange={() => setSelectedRow(selectedRow)}
                  >
                    + Add New
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
                          Location
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
                                S.No
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
                                <TableCell align="center">
                                  {index + 1}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  component="th"
                                  scope="row"
                                >
                                  {row.addlocation}
                                </TableCell>
                                <TableCell align="center">
                                  <ButtonBase style={{ margin: "0 .25rem" }}>
                                    <Image
                                      src={editPng}
                                      onClick={() =>
                                        handleEditLocationPaper(row)
                                      }
                                    />
                                  </ButtonBase>
                                  <ButtonBase
                                    onClick={() => {
                                      setLocationDeleteShow(true);
                                      handleDeleteClick(row);
                                    }}
                                    style={{ margin: "0 .25rem" }}
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
                        body="Are You Sure You Want to Delete?"
                        type={{ name: "Delete" }}
                        show={modalShow}
                        onHide={() => setLocationDeleteShow(false)}
                        onConfirm={handleDeleteConfirm}
                      />
                    </Card.Body>
                    <Card.Footer>
                      <PaginationComponent
                        totalItems={branches.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={(newPage) => setCurrentPage(newPage)}
                      />
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        )}

        {showNewLocationPaper && (
          <div style={{ flexGrow: "1" }}>
            <form onSubmit={handleSubmit}>
              <Paper
                elevation={10}
                style={{
                  width: "30%",
                  margin: "1rem auto",
                  height: "50vh",
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
                    Add Location
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "20px",
                      fontWeight: "600",
                      display: "block",
                      marginLeft: "40px",
                      marginTop: "40px",
                      textAlign: "left",
                    }}
                  >
                    Location{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter a Location"
                    name="addlocation"
                    id="addlocation"
                    value={detail.addlocation}
                    onChange={handleChange}
                    style={{
                      padding: "8px",
                      borderRadius: "10px",
                      border: "2px solid #A6A6A6",
                      margin: "0 auto",
                      width: "80%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    required
                  />
                  <br />
                </div>
                <center>
                  <Button
                    type="submit"
                    onClick={() => setShowLocationSave(true)}
                    variant="contained"
                    style={{
                      background:
                        "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                      color: "white",
                      borderRadius: "5px",
                      padding: "10px 80px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s ease",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "17px",
                      textTransform: "none",
                    }}
                  >
                    Save
                  </Button>
                  <LocationSave
                    show={showLocationSave}
                    title="Location Successfully Added"
                    onHide={() => setShowLocationSave(false)}
                  />
                </center>
              </Paper>
            </form>
          </div>
        )}

        {showEditLocationPaper && (
          <div style={{ flexGrow: "1" }}>
            <form onSubmit={handleEditSubmit}>
              <Paper
                elevation={10}
                style={{
                  width: "30%",
                  margin: "1rem auto",
                  borderRadius: "20px 20px 20px 20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
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
                    Edit Location
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "20px",
                      fontWeight: "600",
                      display: "block",
                      marginLeft: "40px",
                      marginTop: "40px",
                      textAlign: "left",
                    }}
                  >
                    Location{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    name="addlocation"
                    id="addlocation"
                    value={editDetail.addlocation}
                    onChange={handleEditChange}
                    style={{
                      padding: "8px",
                      borderRadius: "10px",
                      border: "2px solid #A6A6A6",
                      margin: "0 auto",
                      width: "80%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    required
                  />
                  <br />
                </div>
                <center>
                  <Button
                    type="submit"
                    onClick={() => setShowLocationUpdate(true)}
                    variant="contained"
                    style={{
                      background:
                        "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                      color: "white",
                      borderRadius: "5px",
                      padding: "10px 80px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s ease",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "17px",
                      marginBottom: "2rem",
                      textTransform: "none",
                    }}
                  >
                    Update
                  </Button>
                  <LocationUpdate
                    show={showLocationUpdate}
                    title="Location Successfully Updated"
                    onHide={() => setShowLocationUpdate(false)}
                  />
                </center>
              </Paper>
            </form>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};
export default Location;
