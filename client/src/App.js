import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert/Alert";
import MainContext from "./context/MainContext";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import Explore from "./pages/Explore/Explore";

function App() {
  const [profileInfo, setProfileInfo] = useState({});
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
  const [refresh, setRefresh] = useState(false);

  const contextValues = {
    alert,
    setAlert,
    loggedIn,
    setLoggedIn,
    userInfo,
    setUserInfo,
    refresh,
    setRefresh,
    profileInfo,
    setProfileInfo,
  };

  useEffect(() => {
    Axios.get("/api/users/check-auth").then((res) => {
      setLoggedIn(true);
      setUserInfo(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("/api/users/user/" + userInfo.id).then((res) => {
      setProfileInfo(res.data);
    });
  }, [userInfo, refresh]);

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Alert />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/edit/:id" element={<EditProfile />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
