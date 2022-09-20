import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import "./Register.css";
import InstagramLogo from "../../images/instagram-logo.png";

const Register = () => {
  const [alert, setAlert] = useState("");
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api/users/register/", form)
      .then((res) => {
        console.log(res);
        setAlert(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data);
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-logo">
          <img src={InstagramLogo} alt="instagram logo" />
        </div>
        <div className="register-title">
          <h2>Sign up to see photos and videos from your friends.</h2>
        </div>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleForm}
            />
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleForm}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleForm}
            />
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

            <div className="register-info">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram. <span>Learn More</span>
              </p>
              <p>
                By signing up, you agree to our Terms . Learn how we collect,
                use and share your data in our Privacy Policy and how we use
                cookies and similar technology in our
                <span> Cookies Policy</span>.
              </p>
            </div>
            <div className="">
              <button className="btn blue-btn" type="submit">
                Register
              </button>
            </div>
          </form>
          <div className="register-login">
            <p>
              Have an account?
              <span>
                <Link to="/login"> Log in</Link>
              </span>
            </p>
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

export default Register;
