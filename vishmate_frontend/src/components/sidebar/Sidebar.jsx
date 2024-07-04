import { useState } from "react";
import { NavLink } from "react-router-dom";
import img1 from "../icons/Finance.png";
import img2 from "../icons/Language.png";
import img3 from "../icons/Market.png";
import img4 from "../icons/Notification.png";
import img5 from "../icons/Setting.png";
import img6 from "../icons/Users.png";
import img7 from "../icons/arrow.png";
import img9 from "../icons/category.png";
import img8 from "../icons/dashboard.png";
import "./sidebar.scss";

const Sidebar = () => {
  const [category, setCategory] = useState(false);
  const [notification, setNotification] = useState(false);
  const [setting, setSetting] = useState(false);

  const activeClasses = ({ isActive }) => (isActive ? "active" : "");

  const toggleNotification = () => {
    setNotification(!notification);
  };
  const toggleCategory = () => {
    setCategory(!category);
  };
  const toggleSetting = () => {
    setSetting(!setting);
  };
  return (
    <div className="sidebar" style={{ minWidth: "17%", zIndex: "5",maxHeight: "100vh",overflowY: "auto" }}>
      <div className="top">
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            marginBottom: "0",
            textAlign: "center",
          }}
        >
          <span className="logo">lamadmin</span>
        </NavLink>
      </div>
      <div className="center">
        <ul>
          <NavLink to="/Dashboard" style={{ textDecoration: "none" }}>
            <li className={`${activeClasses}`}>
              <img src={img8} className="icon" />
              <span className="font">Dashboard</span>
            </li>
          </NavLink>
          <NavLink to="/Language" style={{ textDecoration: "none" }}>
            <li>
              <img src={img2} className="icon" />
              <span className="font">Language</span>
            </li>
          </NavLink>

          <li onClick={toggleCategory}>
            <img src={img9} className="icon" />
            <span className="font">Category Post</span>
          </li>
          {category && (
            <ul className="sub-list">
              <NavLink to="/Category" style={{ textDecoration: "none" }}>
                <li>
                  <img src={img7} className="icon" />
                  <span>Category</span>
                </li>
              </NavLink>
              <NavLink to="/Categoryframes" style={{ textDecoration: "none" }}>
                <li>
                  <img src={img7} className="icon" />
                  <span>Category frames</span>
                </li>
              </NavLink>
            </ul>
          )}
          <NavLink to="/Finance" style={{ textDecoration: "none" }}>
            <li>
              <img src={img1} className="icon" />
              <span>Finance Report</span>
            </li>
          </NavLink>
          <NavLink
            to={{ pathname: "/Users", search: "?showpaidMembers=true" }}
            style={{ textDecoration: "none" }}
          >
            <li>
              <img src={img6} className="icon" />
              <span>Users Report</span>
            </li>
          </NavLink>
          <NavLink to="/Marketplace" style={{ textDecoration: "none" }}>
            <li>
              <img src={img3} className="icon" />
              <span>Market Place</span>
            </li>
          </NavLink>
          <li onClick={toggleNotification}>
            <img src={img4} className="icon" />
            <span>Notification</span>
          </li>
          {notification && (
            <ul className="sub-list">
              <NavLink
                to="/Writenotification"
                style={{ textDecoration: "none" }}
              >
                <li>
                  {" "}
                  <img src={img7} className="icon" />
                  <span>Write Notification </span>
                </li>
              </NavLink>
              <NavLink to="/News" style={{ textDecoration: "none" }}>
                <li>
                  {" "}
                  <img src={img7} className="icon" />
                  <span>News Feed</span>
                </li>
              </NavLink>
              <NavLink to="/Advertisement" style={{ textDecoration: "none" }}>
                <li>
                  {" "}
                  <img src={img7} className="icon" />
                  <span>Advertisement</span>
                </li>
              </NavLink>
            </ul>
          )}
          <li onClick={toggleSetting}>
            <img src={img5} className="icon" />
            <span>Setting</span>
          </li>
          {setting && (
            <ul className="sub-list">
              <NavLink to="/AddUser" style={{ textDecoration: "none" }}>
                <li>
                  {" "}
                  <img src={img7} className="icon" />
                  <span>Add User </span>
                </li>
              </NavLink>
              <NavLink to="/UserLogin" style={{ textDecoration: "none" }}>
                <li>
                  {" "}
                  <img src={img7} className="icon" />
                  <span>User Login</span>
                </li>
              </NavLink>
              <NavLink to="/JewelRate" style={{ textDecoration: "none" }}>
                <li>
                  {" "}
                  <img src={img7} className="icon" />
                  <span>Jewel Rate</span>
                </li>
              </NavLink>
              <NavLink to="/Location" style={{ textDecoration: "none" }}>
                <li>
                  {" "}
                  <img src={img7} className="icon" />
                  <span>Location</span>
                </li>
              </NavLink>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
