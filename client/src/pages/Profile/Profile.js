import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../components/Header/Header";
import "./Profile.css";
import Dots from "../../components/icons/Dots";
import MainContext from "../../context/MainContext";
import EditProfile from "./EditProfile";
import SettingsIcon from "../../components/icons/Settings";

const Profile = () => {
  const { loggedIn, userInfo, refresh } = useContext(MainContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    Axios.get("/api/users/user/" + id).then((res) => {
      setUser(res.data);
    });
  }, [refresh]);

  useEffect(() => {
    Axios.get("/api/posts/user/" + id).then((res) => {
      setPosts(res.data);
    });
  }, [refresh]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  // useEffect(() => {
  //   if (showModal === true) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "scroll";
  //   }
  // }, [showModal]);

  return (
    <div>
      <Header />
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="profile-container-left">
            <div className="profile-image-container">
              <div onClick={openModal}>
                {user.image ? (
                  <div
                    className="profile-image"
                    style={{ backgroundImage: `url(${user.image})` }}
                  ></div>
                ) : (
                  <div
                    className="profile-image"
                    style={{
                      backgroundImage:
                        'url("https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png")',
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
          <div className="profile-container-right">
            <div className="profile-header">
              <div>
                <h2>{user.username}</h2>
              </div>
              {loggedIn && userInfo.id === user.id ? null : (
                <div className="profile-buttons">
                  <button className="btn profile-btn">Message</button>
                  <button className="btn profile-btn btn-blue">Follow</button>
                  <button className="btn profile-btn btn-dots">
                    <Dots />
                  </button>
                </div>
              )}
              <div className="flex">
                <Link
                  to={"/profile/edit/" + id}
                  className="btn profile-btn edit-btn"
                >
                  Edit profile
                </Link>
                <SettingsIcon />
              </div>
            </div>
            <div className="profile-statistics">
              <div>
                <span className="bold">100</span> posts
              </div>
              <div>
                <span className="bold">100</span> followers
              </div>
              <div>
                <span className="bold">100</span> following
              </div>
            </div>
          </div>
        </div>
        <div className="profile-grid-container">
          <div className="profile-grid">
            {posts.map((post) => (
              <div
                className="grid-image"
                key={post.id}
                style={{ backgroundImage: `url(${post.image})` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
