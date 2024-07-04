import "./Marketplace.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
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
  Switch,
  ButtonBase,
} from "@mui/material";
import { useState, useEffect } from "react";
import edit from "./edit.png";
import trash from "./trash.png";
import MyVerticallyCenteredModal1 from "../../components/Modal/Modal";
import { AddRounded } from "@mui/icons-material";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Col, Image, Row } from "react-bootstrap";
import PaginationComponent from "../../components/Pagination/PaginationComponent";

const Marketplace = () => {
  const [addButtonIsClicked, setAddButtonIsClicked] = useState(false);
  const [market, setMarket] = useState({
    marketplace_id: "",
    service_name: "",
    price_amount: "",
    selected_image: null,
    about: "",
    tools_used: "",
    status: "active", // Default status set to 'active'
  });
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [markets, setMarkets] = useState([]);
  const [showOriginalPaper, setShowOriginalPaper] = useState(true);
  const [showEditPoster, setShowEditPoster] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBranches = markets.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setMarket((prevMarket) => ({
        ...prevMarket,
        [name]: files[0],
      }));
      setSelectedImageURL(URL.createObjectURL(files[0]));
    } else {
      setMarket((prevMarket) => ({
        ...prevMarket,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("service_name", market.service_name);
    formData.append("price_amount", market.price_amount);
    formData.append("selected_image", market.selected_image);
    formData.append("about", market.about);
    formData.append("tools_used", market.tools_used);
    formData.append("status", market.status); // Include status in form data

    axios
      .post(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/marketplace`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Response:", response);
        fetchMarket(); // Refetch data to update the table
        setShowOriginalPaper(true);
        setAddButtonIsClicked(false);
      })
      .catch((error) => {
        console.error("Error Details:", error);
        // Handle the error
      });
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("service_name", market.service_name);
    formData.append("price_amount", market.price_amount);
    if (market.selected_image) {
      formData.append("selected_image", market.selected_image);
    }
    formData.append("about", market.about);
    formData.append("tools_used", market.tools_used);

    axios
      .put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/marketplaces/${market.marketplace_id}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Response:", response);
        fetchMarket(); // Refetch data to update the table
        setShowOriginalPaper(true);
        setShowEditPoster(false);
      })
      .catch((error) => {
        console.error("Error Details:", error);
        // Handle the error
      });
  };

  const fetchMarket = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/marketplaces`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("markets response:", response.data.marketplace);
      setMarkets(response.data.marketplace);
    } catch (error) {
      console.error("Error fetching markets:", error);
    }
  };

  useEffect(() => {
    fetchMarket();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/marketplaces/${selectedRow.marketplace_id}`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Deleted row:", res.data);
      fetchMarket(); // Refetch data to update the table
    } catch (error) {
      console.error("Error deleting row:", error);
    }
    setModalShow(false);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setModalShow(true);
  };

  const handleAddNew = () => {
    setShowOriginalPaper(false);
    setAddButtonIsClicked(true);
    setShowEditPoster(false);
    setMarket({
      marketplace_id: "",
      service_name: "",
      price_amount: "",
      selected_image: null,
      about: "",
      tools_used: "",
      status: "active",
    });
    setSelectedImageURL(null);
  };
  const handleStatusChange = async (marketplace_id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const formData = new FormData();
      formData.append("status", newStatus);

      await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/marketplaces/${marketplace_id}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchMarket(); // Refetch data to update the table
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle the error
    }
  };

  const handleEditClick = (row) => {
    setShowEditPoster(true);
    setShowOriginalPaper(false);
    setAddButtonIsClicked(false);
    setMarket({
      marketplace_id: row.marketplace_id,
      service_name: row.service_name,
      price_amount: row.price_amount,
      selected_image: null,
      about: row.about,
      tools_used: row.tools_used,
      status: row.status,
    });
    setSelectedImageURL(row.selected_image); // reset the selected image URL
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
            <Paper elevation={10} className="papercategory">
              <div
                style={{
                  fontFamily: "Lora",
                  background:
                    "linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)",
                  borderRadius: "20px 20px 0px 0px",
                }}
              >
                <div className="letter" style={{ marginLeft: "5%" }}>
                  Market Place
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div className="secondletter1">
                  <ButtonBase
                    className="notification-button"
                    style={{
                      border: "1px solid #24243E",
                      padding: ".42rem 1rem",
                      marginRight: "3.7rem",
                      marginBottom: "8%",
                      borderRadius: "5px",
                      fontFamily: "Montserrat",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                    }}
                    onClick={handleAddNew}
                  >
                    <AddRounded style={{ width: "20px", height: "20px" }} />{" "}
                    <span>Add New</span>
                  </ButtonBase>
                </div>
              </div>
              <center>
                <TableContainer className="table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className="tablecell">No</TableCell>
                        <TableCell className="tablecell">
                          Service Name
                        </TableCell>
                        <TableCell className="tablecell">Price</TableCell>
                        <TableCell className="tablecell">Status</TableCell>
                        <TableCell className="tablecell">Action</TableCell>
                      </TableRow>
                      {currentBranches &&
                        currentBranches.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell> {index + 1}</TableCell>
                            <TableCell>{row.service_name}</TableCell>
                            <TableCell>{row.price_amount}</TableCell>
                            <TableCell
                              style={{ verticalAlign: "middle", padding: 0 }}
                            >
                              <div class="ios-toggle">
                                <input
                                  type="checkbox"
                                  id={`ios-toggle-${index}`}
                                  checked={row.status === "active"}
                                  onChange={() =>
                                    handleStatusChange(
                                      row.marketplace_id,
                                      row.status
                                    )
                                  }
                                />
                                <label for={`ios-toggle-${index}`} />
                              </div>
                            </TableCell>
                            <TableCell>
                              <img
                                src={edit}
                                alt="Edit"
                                className="actionIcon"
                                onClick={() => handleEditClick(row)}
                              />
                              &nbsp;&nbsp;
                              <ButtonBase style={{ margin: "0 .25rem" }}>
                                <Image
                                  src={trash}
                                  onClick={() => handleDeleteClick(row)}
                                />
                              </ButtonBase>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableHead>
                  </Table>
                </TableContainer>
                <MyVerticallyCenteredModal1
                  title="Delete"
                  body="Are You Sure You Want to Delete ?"
                  type={{ name: "Delete" }}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  onConfirm={handleDeleteConfirm}
                />
              </center>
              <div className="end">
                <PaginationComponent
                  totalItems={markets.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={(newPage) => setCurrentPage(newPage)}
                />
              </div>
            </Paper>
          )}
          {addButtonIsClicked && (
            <Paper elevation={10} className="papercategory">
              <div className="heading">
                <div className="letter1">Add Market Place</div>
              </div>
              <Row className="mt-5">
                <Col>
                  <form onSubmit={handleSubmit}>
                    <div className="inputfield">
                      <label className="category-label-market">
                        Service Name
                      </label>
                      <input
                        className="marketplace_input"
                        type="text"
                        placeholder="Enter name"
                        name="service_name"
                        value={market.service_name}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">
                        Price Amount
                      </label>
                      <input
                        className="marketplace_input"
                        type="text"
                        placeholder="Enter Amount"
                        name="price_amount"
                        value={market.price_amount}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">
                        Select image
                      </label>
                      <input
                        className="marketplace_input"
                        type="file"
                        name="selected_image"
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">About</label>
                      <textarea
                        className="marketplace_input"
                        name="about"
                        value={market.about}
                        onChange={handleChange}
                        placeholder="Enter About"
                      ></textarea>
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">
                        Tools Used
                      </label>
                      <input
                        className="marketplace_input"
                        type="text"
                        name="tools_used"
                        value={market.tools_used}
                        onChange={handleChange}
                        placeholder="Enter Tools Name"
                      />
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">Status</label>
                      <input
                        className="marketplace_input"
                        type="text"
                        name="status"
                        value={market.status}
                        onChange={handleChange}
                        placeholder="Enter Status"
                      />
                    </div>
                    <br />
                    <Button
                      type="submit"
                      className="category-button"
                      style={{ padding: ".5rem 1.5rem" }}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
                <Col>
                  {selectedImageURL && (
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={selectedImageURL}
                        alt="Selected"
                        style={{
                          width: "200px",
                          height: "200px",
                        }}
                      />
                    </div>
                  )}
                </Col>
              </Row>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Paper>
          )}
          {showEditPoster && (
            <Paper elevation={10} className="papercategory">
              <div className="heading">
                <div className="letter1">Update Market Place</div>
              </div>
              <Row className="mt-5">
                <Col>
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="inputfield">
                      <label className="category-label-market">
                        Service Name
                      </label>
                      <input
                        className="marketplace_input"
                        type="text"
                        placeholder="Enter name"
                        name="service_name"
                        value={market.service_name}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">
                        Price Amount
                      </label>
                      <input
                        className="marketplace_input"
                        type="text"
                        placeholder="Enter Amount"
                        name="price_amount"
                        value={market.price_amount}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">
                        Select image
                      </label>

                      <input
                        className="marketplace_input"
                        type="file"
                        id="selected_image"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setSelectedImageURL((prevLanguage) => ({
                            ...prevLanguage,
                            selected_image: file,
                          }));
                        }}
                        name="selected_image"
                      />
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">About</label>
                      <textarea
                        className="marketplace_input"
                        name="about"
                        value={market.about}
                        onChange={handleChange}
                        placeholder="Enter About"
                      ></textarea>
                    </div>
                    <br />
                    <div className="inputfield">
                      <label className="category-label-market">
                        Tools Used
                      </label>
                      <input
                        className="marketplace_input"
                        type="text"
                        name="tools_used"
                        value={market.tools_used}
                        onChange={handleChange}
                        placeholder="Enter Tools Name"
                      />
                    </div>
                    <br />

                    <br />
                    <center>
                      <Button
                        type="submit"
                        style={{
                          background:
                            " linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%) ",
                          color: "white",
                          marginBottom: "40px",
                        }}
                        onClick={handleRefresh}
                      >
                        Update
                      </Button>
                    </center>
                  </form>
                </Col>
                <Col>
                  <div style={{ textAlign: "center" }}>
                    {selectedImageURL && (
                      <img
                        src={selectedImageURL}
                        alt="Selected Language"
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "20px",
                        }}
                      />
                    )}
                  </div>
                </Col>
              </Row>
              <MyVerticallyCenteredModal
                title="Poster Successfully Updated"
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Paper>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};
export default Marketplace;
