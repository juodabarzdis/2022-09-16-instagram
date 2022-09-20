import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import MainContext from "../../context/MainContext";
import "./Header.css";
import NewPost from "../icons/NewPost";
import Inbox from "../icons/Inbox";
import Explore from "../icons/Explore";
import Activity from "../icons/Activity";
import AddNewPost from "../../pages/NewPost/NewPost";
import Profile from "../icons/Profile";
import InstagramLogo from "../../images/instagram-logo.png";

const Header = () => {
  const { loggedIn, userInfo, profileInfo } = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);
  const profileRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const closeModal = (e) => {
    if (profileRef.current === e.target) {
      setShowProfile(!false);
    }
  };

  const showDrop = () => {
    setShowProfile((prev) => !prev);
  };

  const logout = () => {
    Axios.get("/api/users/logout").then((resp) => {
      console.log(resp);
      navigate("/login");
    });
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (showModal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [showModal]);

  return (
    <>
      <div className="header" onClick={closeModal}>
        {showModal && (
          <AddNewPost showModal={showModal} setShowModal={setShowModal} />
        )}
        <div className="header-content">
          <div className="header-logo">
            <div>
              <Link to="/main">
                <img src={InstagramLogo} alt="instagram logo" />
              </Link>
            </div>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="header-icons">
            <div onClick={openModal} className="header-newPost">
              <NewPost />
            </div>
            <Inbox />
            <Explore />
            <Activity />
            <div className="header-profile" onClick={showDrop} ref={profileRef}>
              {loggedIn && profileInfo.image ? (
                <img src={profileInfo.image} alt="profile" />
              ) : (
                <img
                  src="https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png"
                  alt=""
                />
              )}
            </div>
            {showProfile && (
              <div className="header-profile-drop">
                <ul>
                  <Link to={"/profile/" + userInfo.id}>
                    <li>
                      <Profile /> Profile
                    </li>
                  </Link>

                  <li onClick={logout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
