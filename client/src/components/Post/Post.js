import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Post.css";
import "./DotsDrop.css";
import Dots from "../icons/Dots";
import Heart from "../icons/Activity";
import Comment from "../icons/Comment";
import Message from "../icons/Inbox";
import Favorite from "../icons/Favorite";
import Liked from "../icons/Liked";

const Post = (props) => {
  const inputRef = useRef(null);
  let {
    image,
    caption,
    id,
    post_userId,
    username,
    userId,
    refresh,
    setRefresh,
    author_image,
    currentUser,
    createdAt,
  } = props;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showDots, setShowDots] = useState(false);

  createdAt = new Date(createdAt).toLocaleString("lt-LT", {
    timeZone: "Europe/Vilnius",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    Axios.get("/api/posts/" + id).then((res) => {
      setComments(res.data.comments);
    });
  }, [refresh]);

  const handleForm = (e) => {
    e.preventDefault();
    inputRef.current.value = "";
    Axios.post("/api/comments/", {
      comment,
      postId: id,
      userId,
      username: currentUser,
    }).then((res) => {
      setRefresh(!refresh);
    });
  };

  useEffect(() => {
    Axios.get("/api/likes/" + id).then((res) => {
      const data = res.data;
      data.map((like) => {
        if (like.userId === userId) {
          setLiked(true);
        }
      });
      setLikes(res.data);
    });
  }, [liked]);

  const handleLike = () => {
    Axios.post("/api/likes/" + id, {
      like: 1,
      userId,
    }).then((res) => {
      setLiked(!liked);
    });
  };

  const handleImageLike = (e) => {
    if (e.detail === 2) {
      handleLike(e);
    }
  };

  const showDotsDrop = () => {
    setShowDots((prev) => !prev);
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-left">
          <div className="post-header-avatar">
            {author_image ? (
              <img src={author_image} alt="profile image" />
            ) : (
              <img
                src="https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png"
                alt="profile image"
              />
            )}
          </div>
          <div className="post-header-username">
            <Link to={"/profile/" + post_userId}>{username}</Link>
          </div>
        </div>
        <div className="post-header-right" onClick={showDotsDrop}>
          <Dots />
          {showDots && (
            <div className="header-profile-drop dots-drop">
              <ul>
                <li>Edit post</li>
                <li>Delete post</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div
        className="post-image"
        onClick={(e) => handleImageLike(e)}
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* <img src={image} alt="post" /> */}
      </div>
      <div className="post-functions">
        <div className="post-functions-left">
          <div onClick={(e) => handleLike(e)}>
            {liked ? <Liked /> : <Heart />}
          </div>
          <Comment />
          <Message />
        </div>
        <div className="post-functions-right">
          <Favorite />
        </div>
      </div>
      <div className="post-likes">
        {likes.length} {likes.length === 1 ? "like" : "likes"}
      </div>
      <div className="post-caption">
        <p>
          <span className="">{username} </span>
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
        <p>{createdAt}</p>
      </div>
      <div className="post-write-comment">
        <form onSubmit={(e) => handleForm(e)}>
          <div className="add-comment">
            <input
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              type="text"
              placeholder="Add a comment..."
              ref={inputRef}
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
