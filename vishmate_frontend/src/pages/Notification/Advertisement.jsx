import "./News.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useRef } from "react";
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
  Switch,
} from "@mui/material";
import { Col, Form, FormControl,Image, FormLabel, Row } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import leo from './leo.png';
import editPng from "./edit.png";
import deletePng from "./trash.png";

const Advertisement = () => {
  const fileInputRef = useRef();

  const handleClick = () => {
    // Trigger the file input when the div is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle file selection (e.g., display the selected image)
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  }
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top" style={{height:"75%"}}>
          <Paper elevation={10} className="papercategory" >
            <div className="heading">
              <div className="letter">Advertisement</div>
            </div>
            <Row className="mt-3">
              <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={handleClick}>
                <ButtonBase
                  style={{
                    padding: ".4rem 1rem",
                    border: "2px solid black",
                    borderRadius: "10px",
                    marginRight: "2rem"
                  }} 
                >
                  + Add New
                </ButtonBase>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
              </div>
              
            </Row>
            <Row className="mt-5">
                      <div className="d-flex flex-wrap" style={{ gap: "2rem" }}>
                        <div
                          style={{
                            position: "relative",
                            width: "20%",
                            height: "50%",
                            marginLeft:'5%',
                            borderRadius: "10px",
                            overflow: "hidden",
                            flexBasis: "auto",
                          }}
                        >
                          <Image
                            src={leo}
                            style={{ width: "100%", height: "100%" }}
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
                            
                            <div style={{ flexGrow: "1" }}></div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                                padding: ".75rem .75rem",
                                width: "100%",
                              }}
                            >
                              <ButtonBase
                                style={{
                                  backgroundColor: "white",
                                  padding: ".25rem",
                                  borderRadius: "50%",
                                }}
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
                              >
                                <Image
                                  src={deletePng}
                                  width={20}
                                  height={20}
                                  alt="edit"
                                />
                              </ButtonBase>
                              <Switch {...label} defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
          </Paper>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Advertisement;
