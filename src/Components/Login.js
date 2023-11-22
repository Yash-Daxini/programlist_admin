import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [login, setLogin] = useState({});
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      navigate("../login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://programlist-backend.onrender.com/user")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <div className="backgroundColorBlue login">
      <div className="container">
        <div className="text-center">
          <h2 className="py-3">Program List</h2>
        </div>
        <div className="content container backgroundColorBlueLite">
          <ToastContainer className="custom-toast-container" />
          <form className="form-group" method="post">
            <h3 class="form-title text-center font-green my-4">Sign In</h3>
            <div class="form-group">
              <label for="exampleFormControlInput1" class="form-label">
                User Name
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="User Name"
                value={login.name}
                onChange={(e) => {
                  setLogin({ ...login, name: e.target.value });
                }}
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control form-control-solid placeholder-no-fix"
                placeholder="Password"
                value={login.pass}
                onChange={(e) => {
                  setLogin({ ...login, pass: e.target.value });
                }}
              />
            </div>
            <div className="form-group text-center">
              <button
                type="submit"
                className="loginBtn rounded-3"
                onClickCapture={(e) => {
                  e.preventDefault();
                  users.map((user) => {
                    if (
                      user.user_name === login.name &&
                      user.user_password === login.pass
                    ) {
                      sessionStorage.setItem("user", JSON.stringify(user));
                      navigate("../");
                    }
                    return <></>;
                  });
                  toast.error(`Invalid User Name or Password`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }}
              >
                Login
              </button>
            </div>
          </form>
          <form class="form-group mb-3">
            <div class="form-actions text-center">
              {/* <h5>Don't Have Account ?</h5>
              <button class="signup my-3 rounded-3">Sign Up</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
