import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "./Post.css";
import Dots from "../icons/Dots";
import Heart from "../icons/Activity";
import Comment from "../icons/Comment";
import Message from "../icons/Inbox";
import Favorite from "../icons/Favorite";

const Post = (props) => {
  const { image, caption, id, username, userId, refresh, setRefresh } = props;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    Axios.get("/api/posts/" + id).then((res) => {
      setComments(res.data.comments);
    });
  }, [refresh]);

  const handleForm = (e) => {
    console.log("refresg" + refresh);
    e.preventDefault();

    Axios.post("/api/comments/", {
      comment,
      postId: id,
      userId,
      username,
    }).then((res) => {
      setRefresh(!refresh);
    });
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-left">
          <div className="post-header-avatar">
            <img
              src="https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png"
              alt="profile image"
            />
          </div>
        </div>
        <div className="post-header-right">
          <Dots />
        </div>
      </div>
      <div className="post-image">
        <img src={image} alt="" />
      </div>
      <div className="post-functions">
        <div className="post-functions-left">
          <Heart />
          <Comment />
          <Message />
        </div>
        <div className="post-functions-right">
          <Favorite />
        </div>
      </div>
      <div className="post-likes">
        <p>
          <span>100 likes</span>
        </p>
      </div>
      <div className="post-caption">
        <p>
          <span className="">Vilus </span>
          {caption}
        </p>
      </div>
      <div className="post-comments">
        {comments.map((comment) => (
          <div className="post-comment" key={comment.id}>
            <p>
              <span className="">{comment.username} </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
      <div className="post-time">
        <p>1 hour ago</p>
      </div>
      <div className="post-write-comment">
        <form onSubmit={(e) => handleForm(e)}>
          <div className="add-comment">
            <input
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              type="text"
              placeholder="Add a comment..."
            />
          </div>
          <div>
            <button>Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
