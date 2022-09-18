import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert/Alert";
import MainContext from "./context/MainContext";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";

function App() {
  const [alert, setAlert] = useState({
    message: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    email: "",
    image: "",
    role: "",
  });

  const contextValues = {
    alert,
    setAlert,
    loggedIn,
    setLoggedIn,
    userInfo,
    setUserInfo,
  };

  useEffect(() => {
    Axios.get("/api/users/check-auth").then((res) => {
      console.log(res);
      setLoggedIn(true);
      setUserInfo(res.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Alert />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
