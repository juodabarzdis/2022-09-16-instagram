import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainContext from "../../context/MainContext";
import Axios from "axios";
import PhoneImage from "../../images/insta-phone.png";
import "./Login.css";

const Login = () => {
  const { setLoggedIn, setUserInfo, setAlert } = useContext(MainContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("/api/users/login/", form)
      .then((res) => {
        localStorage.setItem("loggedIn", "true");
        console.log(res);
        setUserInfo(res.data.response);
        setLoggedIn(true);
        setAlert(res.data.message);
        setTimeout(() => {
          return navigate("/main");
        }, 1000);
      })
      .catch((err) => {
        console.log("error:", err);
        setAlert(err.response.data);
      });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     Axios.post("/api/users/login/", form)
  //       .then((res) => {
  //         console.log(res);
  //         setAlert(res.data.message);
  //         navigate("/");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setAlert(err.response.data);
  //       });
  //   };

  return (
    <div className="login-wrapper">
      <div className="register login">
        <div className="login-left">
          <div className="login-image">
            <img src={PhoneImage} width="350px" alt="" />
          </div>
        </div>
        <div className="login-right">
          <div className="register-container login-container">
            <div className="register-logo">
              <img
                src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                alt="instagram logo"
              />
            </div>
            <div className="register-title">
              <h2>Login to see photos and videos from your friends.</h2>
            </div>
            <div className="register-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleForm}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleForm}
                />

                <div className="register-info"></div>
                <div className="">
                  <button className="btn blue-btn" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div className="register-login">
                <p>
                  Don't have an account?
                  <span>
                    <Link to="/"> Sign in</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="register-footer">
        <div className="register-footer-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            nulla necessitatibus totam voluptatum nemo doloremque omnis
            repellendus culpa enim in!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
