import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import MyVerticallyCenteredModal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
// import "./navbar.scss";

const Navbar = () => {
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false)
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        height: "60px",
        boxShadow: "0 5px 5px #ccc",
      }}
    >
      <div
        className="wrapper"
        style={{
          width: "100%",
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <div
          className="items"
          style={{ display: "flex", alignItems: "center", marginRight: "2rem" }}
        >
          <div className="item" style={{ marginRight: ".75rem" }}>
            <p
              style={{
                marginBottom: "0",
                fontFamily: "Roboto",
                fontWeight: "500",
              }}
            >
              User Name
            </p>
          </div>
          <div className="item">
            <div
              className="profile"
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              onClick={() => setModalShow(true)}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </div>
          </div>
          <MyVerticallyCenteredModal
            title="Logout"
            body="Are You Sure You Want to Logout ?"
            type={{ name: "Logout" }}
            show={modalShow}
            onHide={() => setModalShow(false)}
            onConfirm={() => {
              navigate("/")
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
