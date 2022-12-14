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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const closeModal = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setShowProfile(false);
    }
  };

  const showDrop = () => {
    setShowProfile((prev) => !prev);
  };

  // close drop when clicking outside of it
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowProfile((prev) => !prev);
    }
  };

  const handleSearchBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setSearch("");
    }
  };

  const logout = () => {
    Axios.get("/api/users/logout").then((resp) => {
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
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  useEffect(() => {
    Axios.get("/api/users/search/" + search).then((res) => {
      setSearchResults(res.data);
    });
  }, [search]);

  return (
    <>
      <div ref={profileRef} className="header" onClick={closeModal}>
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
          <div
            className="header-search"
            tabIndex="-1"
            onBlur={handleSearchBlur}
          >
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
            />
            {search !== "" && (
              <div className="header-search-results">
                <ul>
                  {searchResults.map((user) => (
                    <li key={user.id}>
                      <Link to={"/profile/" + user.id}>
                        <div className="header-search-result-row">
                          <img src={user.image} alt="" />
                          <p>{user.username}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="header-icons">
            <div onClick={openModal} className="header-newPost">
              <NewPost />
            </div>
            <Inbox />
            <Link to="/explore">
              <Explore />
            </Link>
            <Activity />
            <div
              className="header-profile"
              tabIndex="-1"
              onClick={showDrop}
              onBlur={handleBlur}
              ref={profileRef}
            >
              {loggedIn && profileInfo.image ? (
                <img src={profileInfo.image} alt="profile" />
              ) : (
                <img
                  src="https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png"
                  alt=""
                />
              )}
              {showProfile && (
                <div className="header-profile-drop">
                  <ul>
                    <Link to={"/profile/" + userInfo.id}>
                      <li>
                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: "8px" }}>
                            <Profile />
                          </div>
                          <div> Profile</div>
                        </div>
                      </li>
                    </Link>

                    <li onClick={logout}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
