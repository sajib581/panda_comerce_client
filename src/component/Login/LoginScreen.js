import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoggedInContext } from "../../App";
import Nav from "../Shared/Nav/Nav";
import login_svg from "./img/login.svg";
import wave from "./img/wavev.png";
import "./logincss.css";

const LoginScreen = () => {
  let history = useHistory();
  let location = useLocation();

  const [logedInUser, setlogedInUser] = useContext(LoggedInContext);
  if (logedInUser.role === "admin" || logedInUser.role === "user") {
    history.push("/");
  }

  let { from } = location.state || { from: { pathname: "/" } };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.errors) {
          const jwtToken = data.jsonWebToken;
          localStorage.setItem("jwtToken", jwtToken);
          setlogedInUser(data.userData)
          // Show Successs Toast
          toast.success("Login Successfull! ", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          if (["admin" , "user"].includes(data.userData.role) ) {
            history.replace(from);
          }         
          
        } else {
          //Show Failed Toast
          toast.error("Failed to Login", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Nav />
      <Image className="wave" src={wave} />

      <div className="containera">
        <div className="imga">
          <Image src={login_svg} />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Member Login</h1>
            {/* {error && <h4>{error}</h4>} */}
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="div">
                <input
                  {...register("username")}
                  type="text"
                  className="inputa"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="inputa"
                  placeholder="Password"
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </div>
            </div>

            <input type="submit" className="btna" value="Login" />
            
            <Link className="createAcc" to="/register">
              Create your Account
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
