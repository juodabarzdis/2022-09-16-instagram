import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../context/MainContext";
import "./Header.css";
import NewPost from "../icons/NewPost";
import Inbox from "../icons/Inbox";
import Explore from "../icons/Explore";
import Activity from "../icons/Activity";
import AddNewPost from "../../pages/NewPost/NewPost";
import Profile from "../icons/Profile";

const Header = () => {
  const { loggedIn, userInfo } = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);
  const profileRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false);
  const closeModal = (e) => {
    if (profileRef.current === e.target) {
      setShowProfile(false);
    }
  };

  // const [modalData, setModalData] = useState({
  //   name: "",
  // });

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const showDrop = () => {
    setShowProfile((prev) => !prev);
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
                <img
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                  alt="instagram logo"
                />
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
            <div className="header-profile" onClick={showDrop}>
              {loggedIn && userInfo.image ? (
                <img src={userInfo.image} alt="profile" />
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
                  <Link to="/logout">
                    <li>Logout</li>
                  </Link>
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
