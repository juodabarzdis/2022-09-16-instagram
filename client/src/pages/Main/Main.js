import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import MainContext from "../../context/MainContext";
import "./Main.css";

const Main = () => {
  const { loggedIn, userInfo } = useContext(MainContext);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    Axios.get("/api/posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="main">
      <Header />
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          image={post.image}
          caption={post.caption}
          username={userInfo.username}
          userId={userInfo.id}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ))}
    </div>
  );
};

export default Main;
