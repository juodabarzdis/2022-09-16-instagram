import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import MainContext from "../../context/MainContext";
import "./Main.css";

const Main = () => {
  const { loggedIn, userInfo, refresh, setRefresh } = useContext(MainContext);
  const [posts, setPosts] = useState([]);

  // if (!loggedIn) {
  //   window.location.href = "/login";
  // }

  useEffect(() => {
    Axios.get("/api/posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  return (
    <div className="main">
      <Header />
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          post_userId={post.userId}
          image={post.image}
          caption={post.caption}
          author_image={post.author_image}
          userId={userInfo.id}
          setRefresh={setRefresh}
          refresh={refresh}
          username={post.user.username}
          currentUser={userInfo.username}
          likes={post.likes}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};

export default Main;
