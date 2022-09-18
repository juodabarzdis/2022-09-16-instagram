import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Header from "../../components/Header/Header";
import "./Profile.css";
import Dots from "../../components/icons/Dots";
import MainContext from "../../context/MainContext";

const Profile = () => {
  const { loggedIn, userInfo } = useContext(MainContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    Axios.get("/api/users/user/" + id).then((res) => {
      setUser(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("/api/posts/user/" + id).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="profile-container-left">
            <div className="profile-image-container">
              <div
                className="profile-image"
                style={{ backgroundImage: `url(${user.image})` }}
              ></div>
              {/* <img src={user.image} alt="profile" /> */}
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
