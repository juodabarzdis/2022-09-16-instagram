import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Explore.css";
import Axios from "axios";
import Like from "../../components/icons/LikedFilled";
import Comment from "../../components/icons/comment.png";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get("/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="explore-wrapper">
        <div className="explore-grid-container">
          <div className="explore-grid">
            {posts.map((post) => (
              <div
                className="grid-image"
                key={post.id}
                style={{ backgroundImage: `url(${post.image})` }}
              >
                <div className="grid-image-overlay">
                  <div className="grid-image-overlay-content">
                    <div className="overlay-flex">
                      <div>
                        <Like />
                      </div>
                      <div>{post.likes.length}</div>
                    </div>
                    <div className="overlay-flex">
                      <div>
                        <img src={Comment} style={{ width: "22px" }} alt="" />
                      </div>
                      <div>{post.comments.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
