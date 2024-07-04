
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.scss'; // Import your CSS file
// import logo from './logo.png'; // Import your logo image
// import "@fontsource/lora"; // Defaults to weight 400
// import "@fontsource/lora/400.css"; // Specify weight
// import "@fontsource/lora/400-italic.css"; // Specify weight and style
// import "@fontsource/montserrat"; // Defaults to weight 400
// import "@fontsource/montserrat/400.css"; // Specify weight
// import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
// import axios from 'axios';
// function LoginPage({ authenticateUser }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [values, setValues] = useState({
   
//      admin_email:""  ,
//      password:"",
//   });
 
//   const [errors, setErrors] = useState({
//     admin_email:"" ,
//     password:"",
//     server: "",
//   });
 
//   const navigate = useNavigate();
 
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
 
//     setErrors({});
//     if (values.admin_email === "") {
//       setErrors((prev) => ({ ...prev, admin_email: "Email is required." }));
//       return;
//     }
//     if (values.password === "") {
//       setErrors((prev) => ({ ...prev, password: "Password is required." }));
//       return;
//     }
 
//     axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/auth/adminlogin`, values)
//       .then((res) => {
//         console.log(res.data);
 
//         if (res.data.token) {
//           localStorage.setItem("token", res.data.token);
//           localStorage.setItem("refreshToken", res.data.refreshToken);
//           localStorage.setItem("admin_email", res.data.admin_email);
     
 
//           authenticateUser();
//           navigate("/dashboard");
//         } else {
//           console.log("Login failed: Invalid response");
//           setErrors((prev) => ({
//             ...prev,
//             server: "Invalid response from server",
//           }));
//         }
//       })
//       .catch((err) => {
//         console.log(
//           "Login failed:",
//           err.response?.data || "An error occurred."
//         );
//         setErrors((prev) => ({
//           ...prev,
//           server: err.response?.data.message || "An error occurred.",
//         }));
//       });
//   };
 
//   return (
   
//     <div className="login-container">
//       <div className="background-image"></div> {/* Background image div */}
     
//       <form onSubmit={handleFormSubmit} className="login-form">
//         <img src={logo} alt="Logo" className="logo" />
//         <h2 style={{ fontSize: "40px",fontWeight: "600"}}>Sign In</h2>
 
//         <div style={{ marginBottom: "15px",fontSize: "15px",fontWeight:"400",marginTop: "10px" }}>
//           <label htmlFor="username" style={{display: "block", marginBottom:" 8px",fontFamily: "Montserrat",marginLeft:"25px",fontWeight:"600",fontSize:"15px"}}>Email ID</label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter Email ID"
       
//             onChange={(e) =>
//               setValues({ ...values, email: e.target.value })
//             }
//             required
//              style={{ width:"90%",padding: "8px",border: "1.2px solid #BBBBBB",borderRadius: "2px",color: "black",backgroundColor:"#F2F2F28A",fontFamily: "Montserrat",marginLeft:"25px"}}
//           />
//         </div>
 
//         <div  style={{ marginBottom: "15px",fontSize: "15px",fontWeight:"400",marginTop: "30px" }}>
//           <label htmlFor="password" style={{display: "block", marginBottom:" 8px",fontFamily: "Montserrat",marginLeft:"25px",fontWeight:"600",fontSize:"15px"}}>Password</label>
//           <input
//              type={showPassword ? 'text' : 'password'}
//             id="password"
//             placeholder="Enter Password"
     
//             onChange={(e) =>
//               setValues({ ...values, password: e.target.value })
//             }
//             required
//             style={{ width:"90%",padding: "8px",border: "1.2px solid #BBBBBB",borderRadius: "2px",color: "black",backgroundColor:"#F2F2F28A",fontFamily: "Montserrat",marginLeft:"25px"}}
//           />
//         </div>
 
//         <button type="submit" style={{width: "90%", padding: "10px",fontWeight: "700",border: "none",borderRadius: "4px",cursor: "pointer",marginTop: "30px",marginLeft: "23px",fontFamily: "Montserrat",color: "#302B63",background: "linear-gradient(135.73deg, #AE8625 16.01%, #F7EF8A 49.79%, #D2AC47 70.41%, rgba(237, 201, 103, 0.84) 103.75%)",fontSize:"20px", boxShadow: "0  6px 6px rgba(0, 0, 0, 0.1)"}}>Sign In</button>
//         <a>Terms of use & Privacy policy</a>
//       </form>
//     </div>
   
//   );
// };
 
// export default LoginPage;
 
 
 
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.scss'; // Import your CSS file
// import logo from './logo.png'; // Import your logo image
// import "@fontsource/lora"; // Defaults to weight 400
// import "@fontsource/lora/400.css"; // Specify weight
// import "@fontsource/lora/400-italic.css"; // Specify weight and style
// import "@fontsource/montserrat"; // Defaults to weight 400
// import "@fontsource/montserrat/400.css"; // Specify weight
// import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
// import axios from 'axios';
 
// function LoginPage({ authenticateUser }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [values, setValues] = useState({
//     admin_email: "",
//     password: "",
//   });
 
//   const [errors, setErrors] = useState({
//     admin_email: "",
//     password: "",
//     server: "",
//   });
 
//   const navigate = useNavigate();
 
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
 
//     setErrors({});
//     if (values.admin_email === "") {
//       setErrors((prev) => ({ ...prev, admin_email: "Email is required." }));
//       return;
//     }
//     if (values.password === "") {
//       setErrors((prev) => ({ ...prev, password: "Password is required." }));
//       return;
//     }
 
//     axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/auth/adminlogin`, values)
//       .then((res) => {
//         console.log('Response data:', res.data);
 
//         if (res.data.token) {
//           localStorage.setItem("token", res.data.token);
//           localStorage.setItem("refreshToken", res.data.refreshToken);
//           localStorage.setItem("admin_email", res.data.admin_email);
         
//           authenticateUser();
//           navigate("/dashboard");
//         } else {
//           console.log("Login failed: Invalid response");
//           setErrors((prev) => ({
//             ...prev,
//             server: "Invalid response from server",
//           }));
//         }
//       })
//       .catch((err) => {
//         console.log("Login failed:", err.response?.data || "An error occurred.");
//         setErrors((prev) => ({
//           ...prev,
//           server: err.response?.data.message || "An error occurred.",
//         }));
//       });
//   };
 
//   return (
//     <div className="login-container">
//       <div className="background-image"></div> {/* Background image div */}
     
//       <form onSubmit={handleFormSubmit} className="login-form">
//         <img src={logo} alt="Logo" className="logo" />
//         <h2 style={{ fontSize: "40px", fontWeight: "600" }}>Sign In</h2>
 
//         <div style={{ marginBottom: "15px", fontSize: "15px", fontWeight: "400", marginTop: "10px" }}>
//           <label htmlFor="admin_email" style={{ display: "block", marginBottom: "8px", fontFamily: "Montserrat", marginLeft: "25px", fontWeight: "600", fontSize: "15px" }}>Email ID</label>
//           <input
//             type="text"
//             id="admin_email"
//             placeholder="Enter Email ID"
//             onChange={(e) =>
//               setValues({ ...values, admin_email: e.target.value })
//             }
//             required
//             style={{ width: "90%", padding: "8px", border: "1.2px solid #BBBBBB", borderRadius: "2px", color: "black", backgroundColor: "#F2F2F28A", fontFamily: "Montserrat", marginLeft: "25px" }}
//           />
//         </div>
 
//         <div style={{ marginBottom: "15px", fontSize: "15px", fontWeight: "400", marginTop: "30px" }}>
//           <label htmlFor="password" style={{ display: "block", marginBottom: "8px", fontFamily: "Montserrat", marginLeft: "25px", fontWeight: "600", fontSize: "15px" }}>Password</label>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             id="password"
//             placeholder="Enter Password"
//             onChange={(e) =>
//               setValues({ ...values, password: e.target.value })
//             }
//             required
//             style={{ width: "90%", padding: "8px", border: "1.2px solid #BBBBBB", borderRadius: "2px", color: "black", backgroundColor: "#F2F2F28A", fontFamily: "Montserrat", marginLeft: "25px" }}
//           />
//           <input
//             type="checkbox"
//             checked={showPassword}
//             onChange={() => setShowPassword(!showPassword)}
//           /> Show Password
//         </div>
 
//         <button type="submit" style={{ width: "90%", padding: "10px", fontWeight: "700", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "30px", marginLeft: "23px", fontFamily: "Montserrat", color: "#302B63", background: "linear-gradient(135.73deg, #AE8625 16.01%, #F7EF8A 49.79%, #D2AC47 70.41%, rgba(237, 201, 103, 0.84) 103.75%)", fontSize: "20px", boxShadow: "0  6px 6px rgba(0, 0, 0, 0.1)" }}>Sign In</button>
//         {errors.server && <p style={{ color: 'red', textAlign: 'center' }}>{errors.server}</p>}
//         <a>Terms of use & Privacy policy</a>
//       </form>
//     </div>
//   );
// }
 
// export default LoginPage;
 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss'; // Import your CSS file
import logo from './logo.png'; // Import your logo image
import "@fontsource/lora"; // Defaults to weight 400
import "@fontsource/lora/400.css"; // Specify weight
import "@fontsource/lora/400-italic.css"; // Specify weight and style
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
import axios from 'axios';
 
function LoginPage({ authenticateUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    admin_email: "",
    password: "",
  });
 
  const [errors, setErrors] = useState({
    admin_email: "",
    password: "",
    server: "",
  });
 
  const navigate = useNavigate();
 
  const handleFormSubmit = (event) => {
    event.preventDefault();
 
    setErrors({});
    if (values.admin_email === "") {
      setErrors((prev) => ({ ...prev, admin_email: "Email is required." }));
      return;
    }
    if (values.password === "") {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      return;
    }
 
    axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/auth/adminlogin`, values)
      .then((res) => {
        console.log('Response data:', res.data);
 
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("admin_email", res.data.admin_email);
         
          authenticateUser();
          navigate("/dashboard");
        } else {
          console.log("Login failed: Invalid response");
          setErrors((prev) => ({
            ...prev,
            server: "Invalid response from server",
          }));
        }
      })
      .catch((err) => {
        console.log("Login failed:", err.response?.data || "An error occurred.");
        setErrors((prev) => ({
          ...prev,
          server: err.response?.data.message || "An error occurred.",
        }));
      });
  };
 
  return (
    <div className="login-container">
      <div className="background-image"></div> {/* Background image div */}
     
      <form onSubmit={handleFormSubmit} className="login-form">
        <img src={logo} alt="Logo" className="logo" />
        <h2 style={{ fontSize: "40px", fontWeight: "600" }}>Sign In</h2>
 
        <div style={{ marginBottom: "15px", fontSize: "15px", fontWeight: "400", marginTop: "10px" }}>
          <label htmlFor="admin_email" style={{ display: "block", marginBottom: "8px", fontFamily: "Montserrat", marginLeft: "25px", fontWeight: "600", fontSize: "15px" }}>Email ID</label>
          <input
            type="text"
            id="admin_email"
            placeholder="Enter Email ID"
            onChange={(e) =>
              setValues({ ...values, admin_email: e.target.value })
            }
            required
            style={{ width: "90%", padding: "8px", border: "1.2px solid #BBBBBB", borderRadius: "2px", color: "black", backgroundColor: "#F2F2F28A", fontFamily: "Montserrat", marginLeft: "25px" }}
          />
        </div>
 
        <div style={{ marginBottom: "15px", fontSize: "15px", fontWeight: "400", marginTop: "30px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "8px", fontFamily: "Montserrat", marginLeft: "25px", fontWeight: "600", fontSize: "15px" }}>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setValues({ ...values, password: e.target.value })
            }
            required
            style={{ width: "90%", padding: "8px", border: "1.2px solid #BBBBBB", borderRadius: "2px", color: "black", backgroundColor: "#F2F2F28A", fontFamily: "Montserrat", marginLeft: "25px" }}
         
          />
       
       
        </div>
 
        <button type="submit" style={{ width: "90%", padding: "10px", fontWeight: "700", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "30px", marginLeft: "23px", fontFamily: "Montserrat", color: "#302B63", background: "linear-gradient(135.73deg, #AE8625 16.01%, #F7EF8A 49.79%, #D2AC47 70.41%, rgba(237, 201, 103, 0.84) 103.75%)", fontSize: "20px", boxShadow: "0  6px 6px rgba(0, 0, 0, 0.1)" }}>Sign In</button>
        {errors.server && <p style={{ color: 'red', textAlign: 'center' }}>{errors.server}</p>}
        <a>Terms of use & Privacy policy</a>
      </form>
    </div>
  );
}
 
export default LoginPage;
 