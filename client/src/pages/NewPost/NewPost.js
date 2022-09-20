import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MainContext from "../../context/MainContext";
import "./Modal.css";

const NewPost = ({ showModal, setShowModal }) => {
  const { userInfo, profileImage, refresh, setRefresh } =
    useContext(MainContext);
  const [postForm, setPostForm] = useState({
    image: "",
    caption: "",
    userId: userInfo.id,
    username: userInfo.username,
    author_image: profileImage ? profileImage : "",
  });
  const [filepreview, setFilepreview] = useState("");
  const modalRef = useRef(null);
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  const navigate = useNavigate();

  const handleForm = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.files[0],
    });
    setFilepreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // CHANGE
    const form = new FormData();

    for (const key in postForm) {
      form.append(key, postForm[key]);
    }
    // CHANGE
    Axios.post("/api/posts/", form).then(
      (resp) => console.log(resp),
      setTimeout(() => {
        setShowModal(!showModal);
        setRefresh(!refresh);
      }, 1000)
    );
  };

  console.log(postForm);

  return (
    <>
      {showModal ? (
        <div className="modal-wrapper" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <div className="modal-content">
              <div
                onClick={() => setShowModal((prev) => !prev)}
                className="modal-exit"
              >
                X
              </div>
              <div className="modal-left">
                {filepreview ? (
                  <img
                    src={filepreview}
                    alt="preview"
                    className="modal-preview"
                  />
                ) : (
                  <h5>Choose a file to see preview.</h5>
                )}
              </div>

              <div className="modal-right">
                <form action="">
                  <div className="modal-input">
                    <input
                      type="file"
                      name="image"
                      onChange={(handleForm, handleFile)}
                    />
                  </div>
                  <div className="modal-caption">
                    <textarea
                      type="text"
                      name="caption"
                      onChange={handleForm}
                    />
                  </div>
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NewPost;
