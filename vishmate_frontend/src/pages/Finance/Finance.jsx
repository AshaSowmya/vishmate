import { Clear, FileDownloadOutlined, Search } from "@mui/icons-material";
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
  makeStyles,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import goldStar from "../../assets/gold_star.png";
import silverStar from "../../assets/silver_star.png";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Finance.scss";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Finance = () => {
  const [showGoldMembers, setShowGoldMembers] = useState(true);
  const [goldMembers, setGoldMembers] = useState([]);
  const [silverMembers, setSilverMembers] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchFilteredData, setSearchFilteredData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [showClearIcon, setShowClearIcon] = useState("none");

  let goldMembersData = [];
  let silverMembersData = [];

  const [currentGoldPage, setCurrentGoldPage] = useState(1);
  const [currentSilverPage, setCurrentSilverPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page

  const handleChangePage = (event, newPage) => {
    if (showGoldMembers) setCurrentGoldPage(newPage);
    else setCurrentSilverPage(newPage);
  };

  const indexOfLastItem = showGoldMembers
    ? currentGoldPage * itemsPerPage
    : currentSilverPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBranches = tableData.slice(indexOfFirstItem, indexOfLastItem);

  function formatDate(date) {
    const createdDate = new Date(date);
    const oneYearLater = new Date(createdDate);
    oneYearLater.setFullYear(createdDate.getFullYear() + 1);
    const formattedDate = oneYearLater.toISOString().split("T")[0];
    return formattedDate;
  }

  const handleGoldDownload = async () => {
    try {
      const data = goldMembers || "No Data Found";
      const doc = new jsPDF();
      doc.text("Yearly Members", 14, 20);
      doc.autoTable({
        startY: 30,
        head: [
          [
            "Customer Name",
            "Email",
            "Mobile Number",
            "Plan Type",
            "Due Date",
          ],
        ],
        body: data.map((row) => [
          row.name,
          row.email,
          row.mobile,
          row.plan_type,
          row.due_date,
        ]),
      });
      doc.save("Yearly Members.pdf");
    } catch (error) {
      console.error("Error fetching and downloading data:", error);
    }
  };

  const handleSilverDownload = async () => {
    try {
      const data = silverMembers || "No Data Found";
      const doc = new jsPDF();
      doc.text("Monthly Members", 14, 20);
      doc.autoTable({
        startY: 30,
        head: [
          [
            "Customer Name",
            "Email",
            "Mobile Number",
            "Plan Type",
            "Due Date",
          ],
        ],
        body: data.map((row) => [
          row.name,
          row.email,
          row.mobile,
          row.plan_type,
          row.due_date,
        ]),
      });
      doc.save("Monthly Members.pdf");
    } catch (error) {
      console.error("Error fetching and downloading data:", error);
    }
  };

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}/api/user`,
          {
            headers: {
              Authorization:
                "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            },
          }
        );

        const data = response.data.users;
        console.log(data);
        data.map((el) => {
          if (el.select_plan === "gold") {
            goldMembersData.push({
              id: el.customer_id,
              name: el.name,
              email: el.email,
              plan_type: "2999/Y",
              mobile: el.mobile,
              due_date: formatDate(el.updated_at),
            });
          } else {
            silverMembersData.push({
              id: el.customer_id,
              name: el.name,
              email: el.email,
              plan_type: "299/M",
              mobile: el.mobile,
              due_date: formatDate(el.updated_at),
            });
          }
        });

        setGoldMembers(goldMembersData);
        setSilverMembers(silverMembersData);
        setTableData(goldMembersData);
        setOriginalData(goldMembersData);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchFinanceData();
  }, []);

  useEffect(() => {
    if (searchFilteredData === "") {
      setTableData(originalData); // Reset to original data when search is cleared
    } else {
      const filteredData = originalData.filter(
        (el) =>
          el.name.toLowerCase().includes(searchFilteredData) ||
          el.email.toLowerCase().includes(searchFilteredData) ||
          el.plan_type.toLowerCase().includes(searchFilteredData) ||
          el.mobile.toLowerCase().includes(searchFilteredData)
      );
      setTableData(filteredData);
    }
  }, [searchFilteredData, originalData]);

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchFilteredData(event.target.value.toLowerCase());
  };

  const handleClick = () => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...");
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div
          className="top"
          style={{ boxShadow: "none", padding: "0", margin: "0" }}
        >
          <Container className="mx-5">
            <Row
              className="mt-5"
              style={{
                borderRadius: "1rem",
                height: "150px",
                boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc",
                overflow: "hidden",
              }}
            >
              <Col className="bg-white p-0">
                <div
                  onClick={() => {
                    setShowGoldMembers(true);
                    setTableData(goldMembers);
                    setOriginalData(goldMembers);
                  }}
                  className={`d-flex justify-content-center align-items-center ${
                    showGoldMembers ? "gold-active" : ""
                  }`}
                  style={{
                    borderRadius: "1rem",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <Image src={goldStar} />
                  <p
                    style={{
                      textAlign: "center",
                      marginLeft: "1rem",
                      fontFamily: "Montserrat",
                      fontSize: "1.5rem",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Premium Gold
                    <br />
                    Members
                  </p>
                </div>
              </Col>
              <Col className="bg-white p-0">
                <div
                  onClick={() => {
                    setShowGoldMembers(false);
                    setTableData(silverMembers);
                    setOriginalData(silverMembers);
                  }}
                  className={`d-flex justify-content-center align-items-center ${
                    showGoldMembers ? "" : "silver-active"
                  }`}
                  style={{
                    borderRadius: "1rem",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <Image src={silverStar} />
                  <p
                    style={{
                      textAlign: "center",
                      marginLeft: "1rem",
                      fontFamily: "Montserrat",
                      fontSize: "1.5rem",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Standard Silver
                    <br />
                    Members
                  </p>
                </div>
              </Col>
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
                        Paid Members
                      </div>
                      <div>
                        <FormControl>
                          <TextField
                            style={{ borderRadius: "6px" }}
                            className="bg-white br-none ot-none"
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
                              Due Date
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
                              Subscription
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
                          {currentBranches.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                {row.due_date}
                              </TableCell>
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="center">
                                {row.plan_type}
                              </TableCell>
                              <TableCell align="center">{row.mobile}</TableCell>
                              <TableCell align="center">{row.email}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card.Body>
                  <Card.Footer>
                    <Stack spacing={2}>
                      <Pagination
                        style={{ display: "flex", justifyContent: "center" }}
                        shape="rounded"
                        count={Math.ceil(tableData.length / itemsPerPage)}
                        page={
                          showGoldMembers ? currentGoldPage : currentSilverPage
                        }
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
            </Row>
            <Row className="mt-3 mb-5" style={{ justifyContent: "flex-end" }}>
              <Button
                style={{
                  width: "fit-content",
                  padding: ".5rem 1rem",
                  fontFamily: "Montserrat",
                  background:
                    "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                }}
                onClick={showGoldMembers ? handleGoldDownload : handleSilverDownload}
              >
                Download&nbsp;
                <FileDownloadOutlined />
              </Button>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Finance;
