import {
  AddRounded,
  Clear,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Search,
} from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  alpha,
  styled,
} from "@mui/material";
import { useEffect, useState,useRef } from "react";
import {  Form } from "react-bootstrap";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./News.scss";
import leoPng from "./leo.png";
import editPng from "./edit.png";
import deletePng from "./trash.png";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import DeleteModal from "../../components/Modal/Modal";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import AddNews from "./AddNews";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: "4px",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  
  const [filterData, setFilterData] = useState([]);
  const [category, setCategory] = useState([]);
  const [editData, setEditData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionEl, setActionEl] = useState(null);
  const categoryOpen = Boolean(anchorEl);
  const actionOpen = Boolean(actionEl);
  const [addButtonIsClicked, setAddButtonIsClicked] = useState(false);
  const [editButtonIsClicked, setEditButtonIsClicked] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBranches = newsData.slice(indexOfFirstItem, indexOfLastItem);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/newses`,
        {
          headers: {
            Authorization:
            "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Particulars response:", response.data.news);

      setNewsData(response.data.news || []);
    } catch (error) {
      console.error("Error fetching Particulars:", error);
      setNewsData([]); // Set to empty array on error
    }
  };

 
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
    fetchNews();
    fetchCategory();
  }, []);

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allIds = currentBranches.map((news) => news.news_id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (news_id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(news_id)
        ? prevSelectedItems.filter((id) => id !== news_id)
        : [...prevSelectedItems, news_id]
    );
  };

  const handleBulkAction = async (action) => {
    if (selectedItems.length === 0) return;

    for (let news_id of selectedItems) {
      let newStatus;
      if (action === "enable") newStatus = "active";
      else if (action === "disable") newStatus = "inactive";

      if (action === "delete") {
        await axios.delete(
          `${process.env.REACT_APP_API_GATEWAY_URL}/api/newses/${news_id}`,
          {
            headers: {
              Authorization:
                "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            },
          }
        );
      } else {
        const formData = new FormData();
        formData.append("status", newStatus);
        await axios.put(
          `${process.env.REACT_APP_API_GATEWAY_URL}/api/newses/${news_id}`,
          formData,
          {
            headers: {
              Authorization:
                "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    }

    fetchNews();
    setSelectedItems([]);
    setSelectAll(false);
  };

  const editHandler = (data) => {
    setEditButtonIsClicked(true);
    setEditData(data);
  };
 
  const handleDeleteClick = (frame) => {
    setSelectedRow(frame);
    setShowDeleteModal(true);
  };

  const handleStatusChange = async (news_id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const formData = new FormData();
      formData.append("status", newStatus);

      const res = await axios.put(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/newses/${news_id}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data)
      fetchNews();
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle the error
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log(selectedRow);
      // Send a DELETE request to your backend API endpoint
      const res = await axios.delete(
        `${process.env.REACT_APP_API_GATEWAY_URL}/api/newses/${selectedRow.news_id}`,
        {
          headers: {
            Authorization:
              "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
          },
        }
      );
      console.log("Deleted row:", res.data);
      // Update UI to reflect the deletion
      fetchNews(); // Refetch data to update the table
    } catch (error) {
      console.error("Error deleting row:", error);
    }
    setShowDeleteModal(false);
  };
  
  const handleCategoryChange = (category_type) => {
    // if (category_type === "all") {
    //   setFilterData(newsData);
    // } else {
    //   const filteredFrames = newsData.filter(
    //     (frame) => frame.category_type === category_type
    //   );
    //   setFilterData(filteredFrames);
    // }
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleActionDropdownClick = (event) => {
    setActionEl(event.currentTarget);
  };
  const handleActionClose = () => {
    setActionEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };
  const handleFileChange = (e) => {
    // Handle file selection (e.g., display the selected image)
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("File selected:", file.name);
    }
  };
  const fileInputRef = useRef();
  const handleClick = () => {
    // Trigger the file input when the div is clicked
    fileInputRef.current.click();
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top" style={{ boxShadow: "none", padding: "0" }}>
          <Container>
            <Card
              className="mt-5"
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
                    {addButtonIsClicked
                      ? "Add News"
                      : editButtonIsClicked
                      ? "Update News"
                      : "News Feed"}
                  </div>
                </div>
              </Card.Header>
              {!addButtonIsClicked && !editButtonIsClicked && (
                <>
                  <Card.Body className="p-4">
                    <Row>
                      <div className="d-flex justify-content-end">
                        <div className="d-flex align-items-center">
                          <input
                            type="checkbox"
                            id="select_all"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            style={{ width: "14px", height: "14px" }}
                          />
                          <label
                            htmlFor="select_all"
                            style={{ marginLeft: "6px" }}
                          >
                            Select All
                          </label>
                          <Button
                            style={{
                              background: "#FFA700",
                              textTransform: "none",
                              fontFamily: "Montserrat",
                              marginLeft: "1rem",
                            }}
                            id="action-button"
                            aria-controls={
                              actionOpen ? "action-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={actionOpen ? "true" : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleActionDropdownClick}
                            endIcon={
                              actionOpen ? (
                                <KeyboardArrowUp />
                              ) : (
                                <KeyboardArrowDown />
                              )
                            }
                          >
                            Action
                          </Button>
                          <StyledMenu
                            id="action-menu"
                            MenuListProps={{
                              "aria-labelledby": "action-button",
                            }}
                            anchorEl={actionEl}
                            open={actionOpen}
                            onClose={handleActionClose}
                          >
                            <MenuItem
                              style={{
                                fontFamily: "Montserrat",
                                minWidth: "105px",
                              }}
                              onClick={() => {
                                handleActionClose();
                                handleBulkAction("enable");
                              }}
                              disableRipple
                            >
                              Enable
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily: "Montserrat",
                                minWidth: "105px",
                              }}
                              onClick={() => {
                                handleActionClose();
                                handleBulkAction("disable");
                              }}
                              disableRipple
                            >
                              Disable
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily: "Montserrat",
                                minWidth: "105px",
                              }}
                              onClick={() => {
                                handleActionClose();
                                handleBulkAction("delete");
                              }}
                              disableRipple
                            >
                              Delete
                            </MenuItem>
                          </StyledMenu>
                          <ButtonBase
                            className="notification-button"
                            style={{
                              border: "1px solid #24243E",
                              padding: ".42rem 1rem",
                              marginLeft: "1rem",
                              borderRadius: "5px",
                              fontFamily: "Montserrat",
                              fontSize: "0.875rem",
                              fontWeight: "600",
                            }}
                            onClick={() =>
                              setAddButtonIsClicked((prevState) => !prevState)
                            }
                          >
                            <AddRounded
                              style={{ width: "20px", height: "20px" }}
                            />{" "}
                            <span style={{ marginLeft: "5px" }}>Add New</span>
                          </ButtonBase>
                        </div>
                      </div>
                    </Row>

                    <Row className="mt-5">
                      <div className="d-flex flex-wrap" style={{ gap: "2rem" }}>
                        {currentBranches.length > 0 ? (
                          currentBranches.map((el, index) => (
                            <div
                              key={el.news_id} // Ensure this key matches the unique identifier in your data
                              style={{
                                position: "relative",
                                width: "200px",
                                height: "200px",
                                borderRadius: "10px",
                                overflow: "hidden",
                                flexBasis: "auto",
                              }}
                            >
                              <Image
                                src={el.news_image}
                                style={{ width: "100%", height: "100%" }}
                                alt={el.heading}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "column wrap",
                                  position: "absolute",
                                  top: "0",
                                  left: "0",
                                  width: "100%",
                                  height: "100%",
                                  color: "white",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: ".75rem .75rem",
                                    width: "100%",

                                    background:
                                      "linear-gradient(0deg, rgba(0, 0, 0, 0) 1.86%, rgba(0, 0, 0, 0.8) 75.14%)",
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: "0",
                                      width: "90%",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {el.heading}
                                  </p>
                                  <input
                                    type="checkbox"
                                    checked={selectedItems.includes(
                                      el.news_id
                                    )}
                                    onChange={() =>
                                      handleSelectItem(el.news_id)
                                    }
                                  />
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    padding: ".75rem .75rem",
                                    width: "100%",
                                    background:
                                      "linear-gradient(0deg, rgba(0, 0, 0, 0) 1.86%, rgba(0, 0, 0, 0.8) 75.14%)",
                                  }}
                                >
                                  <ButtonBase
                                    style={{
                                      backgroundColor: "white",
                                      padding: ".25rem",
                                      borderRadius: "50%",
                                    }}
                                    onClick={() => editHandler(el)}
                                  >
                                    <Image
                                      src={editPng}
                                      width={20}
                                      height={20}
                                      alt="edit"
                                    />
                                  </ButtonBase>

                                  <ButtonBase
                                    style={{
                                      backgroundColor: "white",
                                      padding: ".25rem",
                                      borderRadius: "50%",
                                      marginLeft: ".75rem",
                                    }}
                                    onClick={() => handleDeleteClick(el)}
                                  >
                                    <Image
                                      src={deletePng}
                                      width={20}
                                      height={20}
                                      alt="delete"
                                    />
                                  </ButtonBase>
                                  {/* <Switch {...label} defaultChecked 
                                  onChange={() =>
                                    handleStatusChange(      
                                      el.news_id	,
                                      el.status
                                    )
                                  }
                                  id={ios-toggle-${index}}
                                  checked={el.status === "active"}
                                /> */}
                                  <div class="ios-toggle">
                                    <input
                                      type="checkbox"
                                      id={`ios-toggle-${index}`}
                                      checked={el.status === "active"}
                                      onChange={() =>
                                        handleStatusChange(
                                          el.news_id,
                                          el.status
                                        )
                                      }
                                    />
                                    <label for={`ios-toggle-${index}`} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No News Data found</p>
                        )}
                      </div>
                    </Row>

                    <DeleteModal
                      title="Delete"
                      body="Are You Sure You Want to Delete ?"
                      type={{ name: "Delete" }}
                      show={showDeleteModal}
                      onHide={() => setShowDeleteModal(false)}
                      onConfirm={handleDeleteConfirm}
                    />
                  </Card.Body>

                  <Card.Footer>
                  <PaginationComponent
                      totalItems={newsData.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={(newPage) => setCurrentPage(newPage)}
                    />
                  </Card.Footer>

                </>
              )}
           
              {(addButtonIsClicked || editButtonIsClicked) && (
                <AddNews data={editData || null} />
              )}
            </Card>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default News;
