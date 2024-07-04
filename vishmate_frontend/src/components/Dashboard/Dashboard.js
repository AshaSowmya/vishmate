import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import image from "../../assets/image.png";
import month from "../../assets/month.png";
import today from "../../assets/today.png";
import user_png from "../../assets/user.png";
import categoryPng from "../../assets/carbon_category.png";
import posterPng from "../../assets/poster.png";
import languagePng from "../../assets/language.png";
import week from "../../assets/week.png";
import year from "../../assets/year.png";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import EventCard from "./EventCard";
import PaymentGraph from "./PaymentGraph";
import PriceCard from "./PriceCard";
import SubscriptionCard from "./SubscriptionCard";
import UserGraph from "./UserGraph";
import UsersCard from "./UsersCard";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import axios from "axios";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [postersCount, setPostersCount] = useState(0);
  const [languageCount, setLanguageCount] = useState(0);
  const [recentRegisterData, setRecentRegisterData] = useState([]);
  const [recentPaidData, setRecentPaidData] = useState([]);

  function formatTime(time) {
    const timestamp = new Date(time);
    const currentTime = new Date();
    const differenceInMillis = currentTime - timestamp;
    const differenceInSeconds = Math.floor(differenceInMillis / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    return {
      days: differenceInDays,
      hours: differenceInHours,
      minutes: differenceInMinutes,
      seconds: differenceInSeconds,
    };
  }

  useEffect(() => {
    const fetchUsers = async () => {
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
        // console.log('Branches response:', response.data);
        setUserCount(response.data.users.length);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}/api/categoryframes`,
          {
            headers: {
              Authorization:
                "Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287",
            },
          }
        );
        setCategoryCount(response.data.categoryframe.length);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchPostersCount = async () => {
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
        setPostersCount(response.data.categorypost.length);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchPostersCount();
  }, []);

  useEffect(() => {
    const fetchLanguage = async () => {
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
        setLanguageCount(response.data.language.length);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchLanguage();
  }, []);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
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

        const data = response.data.signupdata;
        let regData = [];
        data.map((el) => {
          regData.push({
            id: el.signupdata_id,
            name: el.name,
            logonTime: formatTime(el.Updated_at),
          });
        });
        setRecentRegisterData(regData);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchRegisteredUsers();
  }, []);

  useEffect(() => {
    const fetchPaidUser = async () => {
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
        let paidData = [];
        data.map((el) => {
          paidData.push({
            id: el.customer_id,
            name: el.name,
            plan_type: el.select_plan,
            status: el.userstatus,
            logonTime: formatTime(el.updated_at),
          });
        });
        setRecentPaidData(paidData);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchPaidUser();
  }, []);

  return (
    <div className="home" style={{ display: "flex" }}>
      <Sidebar />
      <div
        className="homeContainer"
        style={{
          backgroundColor: "#f4f4f4",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Navbar />
        <Container>
          <Row className="mt-5 mx-1">
            <UsersCard
              png={user_png}
              title="Total Users"
              value={userCount}
              left="43"
            />
            <UsersCard
              png={categoryPng}
              title="Total Category"
              value={categoryCount}
              left="35"
            />
            <UsersCard
              png={posterPng}
              title="Total Posters"
              value={postersCount}
              left="38"
            />
            <UsersCard
              png={languagePng}
              title="Total Language"
              value={languageCount}
              left="35"
            />
          </Row>
          <Row className="mt-5 mx-1">
            <PriceCard png={today} title="Today Payment" value="0.0" />
            <PriceCard png={week} title="Weekly Payment" value="0.0" />
            <PriceCard png={month} title="Monthly Payment" value="0.0" />
            <PriceCard png={year} title="Yearly Payment" value="0.0" />
          </Row>
          <Row className="mt-5 mx-0">
            <PaymentGraph />
            <UserGraph />
          </Row>
          <Row className="mt-5 mx-3">
            <EventCard image={image} />
          </Row>
          <Row className="mt-5 mx-3">
            <SubscriptionCard image={image} />
          </Row>
          <Row className="my-5 mx-1">
            <Col>
              <Card
                style={{
                  margin: "0",
                  padding: "0",
                  boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc",
                }}
              >
                <Card.Header
                  as="h4"
                  className="p-3"
                  style={{
                    color: "white",
                    fontFamily: "Lora",
                    textAlign: "center",
                    background:
                      "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                  }}
                >
                  Recent Register User
                </Card.Header>
                <Card.Body
                  style={{ maxHeight: "465px", overflow: "hidden" }}
                  className="p-0 m-0"
                >
                  {recentRegisterData.map((el) => (
                    <div
                      className="d-flex p-3"
                      style={{
                        gap: "1.5rem",
                        borderBottom: "1px solid #e4e4e4",
                      }}
                    >
                      <Image
                        src={image}
                        alt="profile"
                        width={60}
                        height={60}
                        roundedCircle
                      />
                      <div className="d-flex flex-column justify-content-center align-items-start">
                        <p
                          style={{
                            margin: "0",
                            padding: "0",
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "#302b63",
                          }}
                        >
                          {el.name}
                        </p>
                        <p style={{ margin: "0", padding: "0" }}>
                          {el.logonTime.days > 0
                            ? `${el.logonTime.days} days ago`
                            : el.logonTime.hours > 0
                            ? `${el.logonTime.hours} hours ago`
                            : el.logonTime.minutes > 0
                            ? `${el.logonTime.minutes} minutes ago`
                            : `${el.logonTime.seconds} seconds ago`}
                        </p>
                      </div>
                    </div>
                  ))}
                </Card.Body>
                <Card.Footer
                  className="p-3"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "500",
                    fontFamily: "Montserrat",
                    textAlign: "center",
                    background:
                      "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                  }}
                >
                  <Link
                    to={{
                      pathname: "/Users",
                      search: "?showpaidMembers=false", // Pass the query parameter
                    }}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    View more
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  margin: "0",
                  padding: "0",
                  boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc",
                }}
              >
                <Card.Header
                  as="h4"
                  className="p-3"
                  style={{
                    color: "white",
                    fontFamily: "Lora",
                    textAlign: "center",
                    background:
                      "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                  }}
                >
                  Recent Paid User
                </Card.Header>
                <Card.Body
                  className="p-0 m-0"
                  style={{ maxHeight: "465px", overflow: "hidden" }}
                >
                  {recentPaidData.map((el) => (
                    <div
                      className="d-flex p-3"
                      style={{
                        gap: "1.5rem",
                        borderBottom: "1px solid #e4e4e4",
                      }}
                      key={el.id}
                    >
                      <Image
                        src={image}
                        alt="profile"
                        width={60}
                        height={60}
                        roundedCircle
                      />
                      <div
                        style={{ flexGrow: "1" }}
                        className="d-flex flex-column justify-content-center align-items-start"
                      >
                        <p
                          style={{
                            margin: "0",
                            padding: "0",
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "#302b63",
                          }}
                        >
                          {el.name}
                        </p>
                        <p style={{ margin: "0", padding: "0" }}>
                          {el.logonTime.days > 0
                            ? `${el.logonTime.days} days ago`
                            : el.logonTime.hours > 0
                            ? `${el.logonTime.hours} hours ago`
                            : el.logonTime.minutes > 0
                            ? `${el.logonTime.minutes} minutes ago`
                            : `${el.logonTime.seconds} seconds ago`}
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <span
                          style={{
                            background: `${
                              el.plan_type === "gold"
                                ? "linear-gradient(160deg, rgba(233, 192, 81, 1), rgba(255, 226, 141, 1), rgba(235, 198, 81, 1), rgba(185, 125, 28, 1))"
                                : "linear-gradient(to bottom, rgba(242, 242, 242, 1), rgba(255, 255, 255, 1), rgba(199, 199, 199, 1))"
                            }`,
                            padding: ".25rem 1rem",
                            borderRadius: ".25rem",
                            boxShadow: "0 0 10px #ccc, 0 0 10px #ccc",
                          }}
                        >
                          {el.plan_type === "gold" ? "2999/Y" : "299/M"}
                        </span>
                      </div>
                    </div>
                  ))}
                </Card.Body>
                <Card.Footer
                  className="p-3"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "500",
                    fontFamily: "Montserrat",
                    textAlign: "center",
                    background:
                      "linear-gradient(to bottom, rgba(15, 12, 41, 1), rgba(48, 43, 99, 1), rgba(36, 36, 62, 1))",
                  }}
                >
                  <Link
                    to={{
                      pathname: "/Users",
                      search: "?showpaidMembers=true",
                    }}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    View more
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
