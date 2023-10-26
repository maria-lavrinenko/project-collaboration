import React, { useState } from "react";
import axios from "axios";
import "./LogInPage.css";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

function LogInPage({
  isLoggedIn,
  setIsLoggedIn,
  isOpen,
  setIsOpen,
  outline,
  setOutline,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const url = "https://gameapp-g.adaptable.app/users";

  const fetchUsersData = () => {
    axios
      .get(`${url}?password=${password}&userName=${username}`)
      .then((response) => {
        const userData = response.data[0];
        if (userData) {
          setIsLoggedIn(true);
          setOutline("4px solid green");
          startRedirectTimer();
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          setUserNotFound(true);
          setOutline("4px solid red");
          setIsOpen(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchUsersData();
  };

  const startRedirectTimer = () => {
    console.log("test");
    setTimeout(() => {
      console.log("setTimeout");
      navigate(-1);
    }, 3000);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <fieldset>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />

              <button>Login</button>

              <div className="login-response-container">
                {isLoggedIn ? (
                  <h2 className="login-response success">
                    Login complete, redirecting!
                  </h2>
                ) : userNotFound ? (
                  <div>
                    <h2 className="login-response error">User not found!</h2>
                    {isOpen && (
                      <Modal setIsOpen={setIsOpen} setOutline={setOutline} />
                    )}
                  </div>
                ) : null}
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
