import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../context/MainContext";
import "./Header.css";
import NewPost from "../icons/NewPost";
import Inbox from "../icons/Inbox";
import Explore from "../icons/Explore";
import Activity from "../icons/Activity";
import AddNewPost from "../../pages/NewPost/NewPost";

const Header = () => {
  const { loggedIn, userInfo } = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);
  const profileRef = useRef(null);

  // const [modalData, setModalData] = useState({
  //   name: "",
  // });

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
      <div className="header">
        {showModal && (
          <AddNewPost showModal={showModal} setShowModal={setShowModal} />
        )}
        <div className="header-content">
          <div className="header-logo">
            <div>
              <img
                src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                alt="instagram logo"
              />
            </div>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="header-icons">
            <div onClick={openModal}>
              <NewPost />
            </div>
            <Inbox />
            <Explore />
            <Activity />
            <div className="header-profile">
              {loggedIn && userInfo.image ? (
                <img src={userInfo.image} alt="profile" />
              ) : (
                <img
                  src="https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png"
                  alt=""
                />
              )}
            </div>
            <div ref={profileRef} className="header-profile-drop">
              <ul>
                <li>
                  <Link to="#"> Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
