import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContextPage";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { setUserToken, setDataSaved } = useContext(DataContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // const location = useLocation();
  const [isSubmit, setIsSbmit] = useState(false);
  // const FromPage = location.state?.from?.pathname;

  const submit = async (e) => {
    e.preventDefault();

    const errorMessage = await handleSubmitLogin(password, login);
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      handleSubmitLogin(localStorageData);
    }
    // eslint-disable-next-line
  }, []);

  const API_KEY = "AIzaSyAGLR8vECaQdXrToVLOW1qR73hXdd61BCQ";
  const URL_AUTH = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  const handleSubmitLogin = async (passwordText, emailText = "") => {
    // Метод preventDefault () интерфейса Event сообщает User agent, что если событие не обрабатывается явно, его действие по умолчанию не должно выполняться так, как обычно.
    setIsSbmit(true);
    const data =
      typeof passwordText === "object"
        ? passwordText
        : {
            email: emailText,
            password: passwordText,
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
        navigate("/wrapper");
        const dataSaved = localStorage.setItem("user", JSON.stringify(data));
        setDataSaved(dataSaved);
      }

      if (userData.error) {
        setIsSbmit(false);
        return userData.error.message;
      }
      console.log(userData.registered);
    } catch (err) {}
    setIsSbmit(false);
  };
  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="">Login</label>
        <input
          type="text"
          placeholder="enter your login"
          onChange={handleChangeLogin}
        />
        <label htmlFor="">Password</label>
        <input
          type="text"
          placeholder="enter your password"
          onChange={handleChangePassword}
        />
        <button disabled={isSubmit}>Log In</button>
      </form>
      {errorMessage}
    </div>
  );
}

export default LoginForm;
