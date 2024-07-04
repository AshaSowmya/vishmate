import { Clear, FileDownloadOutlined, Search } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React, { useRef } from "react";
import ViewSave from "./MyVerticallyCenteredModal";

import "@fontsource/montserrat";
import {
  FormControl,
  InputAdornment,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Users.scss";
import blueregister from "./blueregister.png";
import blueuser from "./blueuser.png";
import EditIcon from "./edit.png";
import rightarrow from "./rightarrow.png";
import whiteregister from "./whiteregister.png";
import whiteuser from "./whiteuser.png";

const Users = () => {
  const [showpaidMembers, setShowpaidMembers] = useState(true);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [showViewSave, setShowViewSave] = useState(false);
  const [showNewPaper, setShowNewPaper] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [showPaidData, setShowPaidData] = useState([]);
  const [showRegisterData, setShowRegisterData] = useState([]);
  const [showSelectedRow, setSelectedRow] = useState([]);
  const [showModal, setModalShow] = useState([]);
  const [isImageEdited, setIsImageEdited] = useState(false);
  const [searchFilteredData, setSearchFilteredData] = useState("");
  const [originalPaidData, setOriginalPaidData] = useState([]);
  const [originalRegisterData, setOriginalRegisterData] = useState([]);
  const [error, setError] = useState({
    err: false,
    message: "",
  });
  const [currentPaidMemberPage, setCurrentPaidMemberPage] = useState(1);
  const [currentRegisterPage, setCurrentRegisterPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page

  const handleChangePage = (event, newPage) => {
    if (showpaidMembers) setCurrentPaidMemberPage(newPage);
    else setCurrentRegisterPage(newPage);
  };

  const indexOfLastItem = showpaidMembers
    ? currentPaidMemberPage * itemsPerPage
    : currentRegisterPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPaidBranches = showPaidData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const currentRegisterBranches = showRegisterData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    if (showpaidMembers) {
      if (searchFilteredData === "") {
        setShowPaidData(originalPaidData); // Reset to original data when search is cleared
      } else {
        const filteredData = originalPaidData.filter(
          (el) =>
            el.customer_name.toLowerCase().includes(searchFilteredData) ||
            el.business_name.toLowerCase().includes(searchFilteredData) ||
            el.mobile.toLowerCase().includes(searchFilteredData) ||
            el.email.toLowerCase().includes(searchFilteredData)
        );
        setShowPaidData(filteredData);
      }
    } else {
      if (searchFilteredData === "") {
        setShowRegisterData(originalRegisterData); // Reset to original data when search is cleared
      } else {
        const filteredData = originalRegisterData.filter(
          (el) =>
            el.name.toLowerCase().includes(searchFilteredData) ||
            el.mobilenumber.toLowerCase().includes(searchFilteredData) ||
            el.email.toLowerCase().includes(searchFilteredData)
        );
        setShowRegisterData(filteredData);
      }
    }
  }, [searchFilteredData]);

  const handleEditClick = () => {
    // Trigger file input click when edit icon is clicked
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the selected image to be displayed
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsImageEdited(true);
    }
  };

  const handleView = (row) => {
    setShowNewPaper(true); // Show the new Paper
    setSelectedRow(row);
    setSelectedImage(row.upload_image);
    setModalShow(true);
  };
  console.log(showNewPaper);

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchFilteredData(event.target.value.toLowerCase());
  };

  const handleClick = () => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...");
  };

  //getting values from db
  const FetchPaidUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/addbussinesses`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Branches response:", response.data.addbussiness);
      return response.data.addbussiness;
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const FetchRegisterUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/signupdatas`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Branches response:", response.data.signupdata);
      setShowRegisterData(response.data.signupdata);
      setOriginalRegisterData(response.data.signupdata);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    FetchRegisterUsers();
  }, []);

  const FetchUserLogin = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/api/user`, {
        headers: {
          Authorization:
            "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
        },
      });
      console.log("Branches response:", response.data.users);

      return response.data.users;
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    const mergeData = async () => {
      const businessData = await FetchPaidUsers();
      const userData = await FetchUserLogin();
      let mergedData = [];
      // Merge businessData with userData using customerId
      businessData.map((business) => {
        const user = userData.find(
          (user) => user.customer_id === business.customer_id
        );
        mergedData.push({
          id: business.customer_id,
          upload_image: business.upload_logo,
          customer_name: user.name,
          business_name: business.bussiness_name,
          mobile: business.mobile_no,
          alternate_number: business.alternate_no,
          email: business.email,
          website: business.website,
          membership: user.select_plan,
          address: business.address,
          created_at: business.created_at,
        });
      });
      console.log(mergedData);
      setShowPaidData(mergedData);
      setOriginalPaidData(mergedData);
    };

    mergeData();
  }, []);

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append("upload_logo", fileInputRef.current.files[0]);
      formData.append("bussiness_id", showSelectedRow.id);
      // Add other fields as necessary
      const res = await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/addbussinesses/${showSelectedRow.id}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log(res);
      setShowViewSave(true);
    } catch (error) {
      console.error("Error saving updated image:", error);
    }
  };

  const handlePaidDownload = async () => {
    try {
      const data = showNewPaper ? showRegisterData : showPaidData;

      const doc = new jsPDF();
      doc.text("Paid Members", 14, 20);
      doc.autoTable({
        startY: 30,
        head: [
          [
            "Customer Name",
            "Business Name",
            "Mobile Number",
            "Alternate Number",
            "Email",
            "Website",
            "Membership",
            "Address",
          ],
        ],
        body: data.map((row) => [
          row.customer_name,
          row.business_name,
          row.mobile,
          row.alternate_number,
          row.email,
          row.website,
          row.membership,
          row.address,
        ]),
      });
      doc.save("User_report(Paid Members).pdf");
    } catch (error) {
      console.error("Error fetching and downloading data:", error);
    }
  };

  const handleRegisterDownload = async () => {
    try {
      const data = showNewPaper ? showPaidData : showRegisterData;

      const doc = new jsPDF();
      doc.text("Registered Members", 14, 20);
      doc.autoTable({
        startY: 30,
        head: [["Register Date", "Customer Name", "Mobile Number", "Email"]],
        body: data.map((row) => [
          new Date(row.created_at).toISOString().split("T")[0],
          row.name,
          row.mobilenumber,
          row.email,
        ]),
      });
      doc.save("User_report(Registered Members).pdf");
    } catch (error) {
      console.error("Error fetching and downloading data:", error);
    }
  };

  const handleViewDownload = async () => {
    try {
      const data = showRegisterData ? showPaidData : showNewPaper;

      const doc = new jsPDF();
      doc.text("View", 14, 20);
      doc.autoTable({
        startY: 30,
        head: [
          [
            "User Name",
            "Business",
            "Mobile Number",
            "Alternative Mobile number",
            "Email",
            "Website Name",
            "Membership",
            "Address",
          ],
        ],
        body: data.map((row) => [
          row.created_at,
          row.name,
          row.mobile,
          row.email,
        ]),
      });
      doc.save("User_report(View).pdf");
    } catch (error) {
      console.error("Error fetching and downloading data:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div
        className="newContainer"
        style={{ backgroundColor: "rgb(239, 235, 235)" }}
      >
        <Navbar />
        <div
          className="top"
          style={{ boxShadow: "none", padding: "0", margin: "0" }}
        >
          <Container style={{ backgroundColor: "#EFEBEB" }}>
            {!showNewPaper && (
              <>
                <Row
                  className="mt-5 mx-4"
                  style={{
                    borderRadius: "1rem",
                    height: "150px",
                    boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc",
                    overflow: "hidden",
                  }}
                >
                  <Col className="bg-white p-0">
                    <div
                      onClick={() => setShowpaidMembers(true)}
                      className={`d-flex justify-content-center align-items-center ${
                        showpaidMembers ? "inputbutton" : ""
                      }`}
                      style={{
                        borderRadius: "1rem",
                        height: "100%",
                        cursor: "pointer",
                        color: showpaidMembers ? "white" : "#24243E",
                      }}
                    >
                      {showpaidMembers ? (
                        <img src={whiteuser} />
                      ) : (
                        <img src={blueuser} />
                      )}
                      <p
                        style={{
                          textAlign: "center",
                          marginLeft: "1rem",
                          fontFamily: "Montserrat",
                          fontSize: "1.5rem",
                          fontWeight: "500",
                        }}
                      >
                        Paid Members
                      </p>
                    </div>
                  </Col>
                  <Col className="bg-white p-0">
                    <div
                      onClick={() => setShowpaidMembers(false)}
                      className={`d-flex justify-content-center align-items-center ${
                        showpaidMembers ? "" : "inputbutton"
                      }`}
                      style={{
                        borderRadius: "1rem",
                        height: "100%",
                        cursor: "pointer",
                        color: showpaidMembers ? "#24243E" : "white",
                      }}
                    >
                      {showpaidMembers ? (
                        <img src={blueregister} />
                      ) : (
                        <img src={whiteregister} />
                      )}
                      <p
                        style={{
                          textAlign: "center",
                          marginLeft: "1rem",
                          fontFamily: "Montserrat",
                          fontSize: "1.5rem",
                          fontWeight: "500",
                        }}
                      >
                        Registered Members
                      </p>
                    </div>
                  </Col>
                </Row>
                {showpaidMembers && (
                  <Row className="mt-5 mx-4">
                    <Col className="p-0">
                      <Card
                        style={{
                          boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc",
                        }}
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
                              User Report
                            </div>
                            <div>
                              <FormControl>
                                <TextField
                                  style={{ borderRadius: "6px" }}
                                  className="bg-white"
                                  size="small"
                                  variant="outlined"
                                  placeholder="Search..."
                                  onChange={handleChange}
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
                            </div>
                          </div>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <TableContainer>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
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
                                    Join Date
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
                                    Customer Name
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
                                    Bussiness Name
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
                                    Mobile Number
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
                                    View
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {currentPaidBranches.map((row, i) => (
                                  <TableRow
                                    key={i}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell align="center">
                                      {
                                        new Date(row.created_at)
                                          .toISOString()
                                          .split("T")[0]
                                      }
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      component="th"
                                      scope="row"
                                    >
                                      {row.customer_name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {row.business_name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {row.mobile}
                                    </TableCell>
                                    <TableCell align="center">
                                      {row.email}
                                    </TableCell>
                                    {/* <TableCell align="center">
                                {row.view}
                              </TableCell> */}
                                    <TableCell
                                      align="center"
                                      style={{ textAlign: "center" }}
                                    >
                                      <img
                                        src={rightarrow}
                                        onClick={() => handleView(row)}
                                      ></img>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Card.Body>
                        {/* Render the new Paper only if showNewPaper is true */}

                        <Card.Footer>
                          <Stack spacing={2}>
                            <Pagination
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                              shape="rounded"
                              count={Math.ceil(
                                showPaidData.length / itemsPerPage
                              )}
                              page={currentPaidMemberPage}
                              onChange={handleChangePage}
                              renderItem={(item) => (
                                <PaginationItem
                                  style={{
                                    borderRadius: "6px",
                                    backgroundColor: item.selected
                                      ? "#24243e"
                                      : "transparent", // Change #yourSelectedColor to the color you want for the selected page
                                    color: item.selected ? "White" : "black",
                                  }}
                                  {...item}
                                />
                              )}
                            />
                          </Stack>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <div>
                      <Row
                        className="mt-3"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <Button
                          style={{
                            width: "fit-content",
                            padding: ".5rem 1rem",
                            fontFamily: "Montserrat",
                            marginTop: "1rem",
                            background:
                              "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                          }}
                          onClick={handlePaidDownload}
                        >
                          Download &nbsp;
                          <FileDownloadOutlined />
                        </Button>
                      </Row>
                    </div>
                  </Row>
                )}

                {!showpaidMembers && (
                  <Row className="mt-5 mx-4">
                    <Col className="p-0">
                      <Card
                        style={{
                          boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc",
                        }}
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
                              User Report
                            </div>
                            <div>
                              <FormControl>
                                <TextField
                                  style={{ borderRadius: "6px" }}
                                  className="bg-white"
                                  size="small"
                                  variant="outlined"
                                  placeholder="Search..."
                                  onChange={handleChange}
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
                            </div>
                          </div>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <TableContainer>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
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
                                    Register Date
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
                                    Customer Name
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
                                    Mobile Number
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
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {currentRegisterBranches.map((row) => (
                                  <TableRow
                                    key={row.signupdata_id}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell align="center">
                                      {
                                        new Date(row.created_at)
                                          .toISOString()
                                          .split("T")[0]
                                      }
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      component="th"
                                      scope="row"
                                    >
                                      {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {row.mobilenumber}
                                    </TableCell>
                                    <TableCell align="center">
                                      {row.email}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Card.Body>
                        <Card.Footer>
                          <Stack spacing={2}>
                            <Pagination
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                              shape="rounded"
                              count={Math.ceil(
                                showRegisterData.length / itemsPerPage
                              )}
                              page={currentRegisterPage}
                              onChange={handleChangePage}
                              renderItem={(item) => (
                                <PaginationItem
                                  style={{
                                    borderRadius: "6px",
                                    backgroundColor: item.selected
                                      ? "#24243e"
                                      : "transparent", // Change #yourSelectedColor to the color you want for the selected page
                                    color: item.selected ? "White" : "black",
                                  }}
                                  {...item}
                                />
                              )}
                            />
                          </Stack>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <Row
                      className="mt-3"
                      style={{
                        justifyContent: "flex-end",
                        padding: "0",
                        margin: "0",
                      }}
                    >
                      <Button
                        style={{
                          width: "fit-content",
                          padding: ".5rem 1rem",
                          fontFamily: "Montserrat",
                          marginTop: "1rem",
                          background:
                            "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                        }}
                        onClick={handleRegisterDownload}
                      >
                        Download&nbsp;
                        <FileDownloadOutlined />
                      </Button>
                    </Row>
                  </Row>
                )}
              </>
            )}
            {showNewPaper && (
              <div className="download">
                <Paper
                  elevation={10}
                  style={{
                    width: "90%",
                    height: "90%",
                    margin: "2rem auto",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      color: "#302B63",
                      textAlign: "center",
                      padding: "30px 0",
                      fontSize: "35px",
                      fontFamily: "Lora",
                      fontWeight: "600",
                    }}
                  >
                    Tushar Cinemas
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={selectedImage}
                          alt="Selected"
                          style={{
                            width: "250px",
                            height: "200px",
                            paddingRight: "50px",
                          }}
                        />
                        {/* Edit icon positioned at the top right corner */}
                        <div
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            bottom: "10px",
                            right: "70px",
                            background:
                              "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                            borderRadius: "10px",
                          }}
                          onClick={handleEditClick}
                        >
                          <img src={EditIcon} />
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                      </div>

                      <center>
                        <span
                          style={{
                            fontFamily: "Lora",
                            color: "#302B63",
                            fontSize: "20px",
                            marginRight: "50px",
                            fontWeight: "600",
                          }}
                        >
                          Logo
                        </span>
                      </center>
                    </div>
                    <div>
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        User Name
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        :
                      </label>

                      <input
                        value={showSelectedRow.customer_name}
                        type="text"
                        readOnly={true}
                        // onChange={handleViewChange}
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          marginBottom: "30px",
                          border: "none",
                          marginLeft: "40px",
                        }}
                      />
                      <br></br>
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Business
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      </label>
                      <input
                        value={showSelectedRow.business_name}
                        type="text"
                        readOnly={true}
                        // onChange={handleViewChange}
                        style={{
                          padding: "8px",

                          marginBottom: "30px",
                          border: "none",
                          marginLeft: "40px",
                        }}
                      />
                      <br></br>
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Mobile Number
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      </label>
                      <input
                        value={showSelectedRow.mobile}
                        type="text"
                        readOnly={true}
                        style={{
                          padding: "8px",

                          marginBottom: "30px",
                          border: "none",
                          marginLeft: "40px",
                        }}
                      />
                      <br></br>
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Alternative Mobile Number :{" "}
                      </label>
                      <input
                        value={showSelectedRow.alternate_number}
                        type="text"
                        readOnly={true}
                        style={{
                          padding: "8px",

                          marginBottom: "30px",
                          border: "none",
                          marginLeft: "40px",
                        }}
                      />
                      <br></br>
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Email
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      </label>
                      <input
                        value={showSelectedRow.email}
                        type="text"
                        readOnly={true}
                        style={{
                          padding: "8px",

                          marginBottom: "30px",
                          border: "none",
                          marginLeft: "40px",
                        }}
                      />
                      <br></br>
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Website Name
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      </label>
                      <input
                        value={showSelectedRow.website}
                        type="text"
                        readOnly={true}
                        style={{
                          padding: "8px",

                          marginBottom: "30px",
                          border: "none",
                          marginLeft: "40px",
                        }}
                      />
                      <br></br>
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Membership
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      </label>
                      <input
                        value={showSelectedRow.membership}
                        type="text"
                        readOnly={true}
                        style={{
                          padding: "8px",

                          marginBottom: "30px",

                          border: "none",
                          marginLeft: "40px",
                        }}
                      />
                      <br></br>
                      <br></br>
                      <div
                        style={{
                          display: "flex",

                          marginBottom: "10px",
                        }}
                      >
                        <label
                          style={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: "600",
                            marginBottom: "10px",
                            marginTop: "0px",
                            display: "block",
                          }}
                        >
                          Address
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        </label>
                        <textarea
                          value={showSelectedRow.address}
                          readOnly={true}
                          style={{
                            width: "202px",
                            height: "13vh",
                            border: "none",
                            marginLeft: "40px",
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </Paper>
                <Row className="mt-3" style={{ justifyContent: "flex-end" }}>
                  {isImageEdited && (
                    <Button
                      onClick={handleSaveClick}
                      variant="contained"
                      style={{
                        width: "10vw",
                        padding: ".5rem 1rem",
                        fontFamily: "Montserrat",
                        marginRight: "20px",
                        color: "white",
                        background:
                          "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                      }}
                    >
                      Save
                    </Button>
                  )}
                  <ViewSave
                    show={showViewSave}
                    title="User Successfully Added"
                    onHide={() => setShowViewSave(false)}
                  />
                  <Button
                    style={{
                      width: "fit-content",
                      padding: ".5rem 1rem",
                      fontFamily: "Montserrat",
                      marginRight: "5rem",
                      background:
                        "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                    }}
                    onClick={handleViewDownload}
                  >
                    Download&nbsp;
                    <FileDownloadOutlined />
                  </Button>
                </Row>
              </div>
            )}
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Users;
