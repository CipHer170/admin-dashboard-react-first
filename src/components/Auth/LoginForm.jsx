import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContextPage";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import bkg__img from "../../assets/img/bkg_img.svg";
function LoginForm() {
  const { setUserToken } = useContext(DataContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [userChoice, setUserChoice] = useState(false);

  // const location = useLocation();
  const [isSubmit, setIsSbmit] = useState(false);
  // const FromPage = location.state?.from?.pathname;

  const submit = async (e) => {
    e.preventDefault();

    const errorMessage = await handleSubmitLogin(password, login);
    if (errorMessage) {
      setErrorMessage(errorMessage);
      alert("password or login incorrect");
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  // false
  const handleUserChoice = (e) => {
    setUserChoice(e.target.checked);
    console.log("userchoice", userChoice);
    // true
  };

  const getFromLocalStorage = () => {
    if (localStorage.getItem("user")) {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      handleSubmitLogin(localStorageData);
    }
  };

  useEffect(() => {
    getFromLocalStorage();
    // eslint-disable-next-line
  }, []);

  const API_KEY = "AIzaSyBQC9yD7ZZN9hkkeebe6EUEVO-GS5A-qxc";
  const URL_AUTH = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  const handleSubmitLogin = async (passwordText, emailText = "") => {
    // Метод preventDefault () интерфейса Event сообщает User agent, что если событие не обрабатывается явно, его действие по умолчанию не должно выполняться так, как обычно.
    setIsSbmit(true);
    const data =
      typeof passwordText === "object"
        ? { ...passwordText, returnSecureToken: true }
        : {
            email: emailText,
            password: passwordText,
            returnSecureToken: true,
          };
    try {
      const res = await fetch(URL_AUTH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const userData = await res.json();
      setUserToken(userData.idToken);
      if (userData.idToken) {
        navigate("/products");
        if (userChoice) {
          localStorage.setItem("user", JSON.stringify(data));
        }
      }

      if (userData.error) {
        setIsSbmit(false);
        return userData.error.message;
      }
      // console.log(userData.registered);
    } catch (err) {}
    setIsSbmit(false);
  };

  return (
    <div className="login">
      {/* {errorMessage} */}
      <div className="login__form">
        <h2>Welcome BAck!</h2>
        <h4>Welcome back! Please enter your details.</h4>
        <form onSubmit={submit} className="form">
          <div className="login__input ">
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="enter your login"
              onChange={handleChangeLogin}
            />
          </div>
          <div className="login__input ">
            <label htmlFor="">Password</label>
            <input
              type="text"
              placeholder="enter your password"
              onChange={handleChangePassword}
            />
          </div>
          <div className="login__checkbox">
            <div className="login__checkbox-remember">
              <input
                type="checkbox"
                id="remember"
                onChange={handleUserChoice}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/">Forgot password</a>
          </div>
          <div className="login__action">
            <button disabled={isSubmit}>Log In</button>
            <button>Sign In</button>
          </div>
        </form>
      </div>
      <div className="login__main">
        <img src={bkg__img} alt="" className="login__img" />
      </div>
    </div>
  );
}

export default LoginForm;
