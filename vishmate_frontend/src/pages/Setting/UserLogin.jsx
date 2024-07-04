import "./UserLogin.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import {
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
import MyVerticallyCenteredModal from "../../components/Modal/Modal";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import EditModal from "./EditModal";
import "../../assets/css/virtual-select.min.css";
import PaginationComponent from "../../components/Pagination/PaginationComponent";

const UserLogin = () => {
  const [modalShow, setModalShow] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBranches = branches.slice(indexOfFirstItem, indexOfLastItem);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/adminusers`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Branches response:", response.data.adminusers);
      setBranches(response.data.adminusers);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setModalShow(true);
  };

  const editHandler = async (updatedData) => {
    console.log(updatedData);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/adminuseres/${updatedData.adminuser_id}`,
        updatedData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log(res.data);
      fetchBranches();
      setShowEditModal(false);
    } catch (err) {
      console.log(err.message);
      setShowEditModal(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log(selectedRow);
      // Send a DELETE request to your backend API endpoint
      const res = await axios.delete(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/adminuseres/${selectedRow.adminuser_id}`,
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

  const editUserLoginHandler = (id) => {
    setSelectedRow(id);
    setShowEditModal(true);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top" style={{ boxShadow: "none", padding: "0" }}>
          <Container>
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
                        User Login
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
                              User Name
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
                              Email
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
                              Password
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
                              Category
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
                          {currentBranches &&
                            currentBranches.map((row, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  {row.user_name}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  component="th"
                                  scope="row"
                                >
                                  {row.admin_email}
                                </TableCell>
                                <TableCell align="center">
                                  {row.password}
                                </TableCell>
                                <TableCell align="center">
                                  {row.category}
                                </TableCell>
                                <TableCell align="center">
                                  <ButtonBase
                                    style={{ margin: "0 .25rem" }}
                                    onClick={() => editUserLoginHandler(row)}
                                  >
                                    <Image src={editPng} />
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
                    <EditModal
                      title="Update User"
                      data={selectedRow}
                      type={{ name: "Update" }}
                      show={showEditModal}
                      submitHandler={editHandler}
                      onHide={() => setShowEditModal(false)}
                    />
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
        <Footer />
      </div>
    </div>
  );
};

export default UserLogin;
