import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Modal.css";

const NewPost = ({ showModal, setShowModal }) => {
  const [postForm, setPostForm] = useState({
    image: "",
    caption: "",
  });
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
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // CHANGE
    const form = new FormData();

    for (const key in postForm) {
      form.append(key, postForm[key]);
    }
    // CHANGE
    Axios.post("/api/posts/", form).then((resp) =>
      setTimeout(() => {
        navigate("/main");
      }, 1000)
    );
  };

  return (
    <>
      {showModal ? (
        <div className="modal-wrapper" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <div className="modal-right">
              <div
                onClick={() => setShowModal((prev) => !prev)}
                className="modal-exit"
              >
                X
              </div>
              <div className="modal-content">
                <form action="">
                  <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" onChange={handleForm} />
                  </div>
                  <div>
                    <label htmlFor="caption">Caption</label>
                    <input type="text" name="caption" onChange={handleForm} />
                  </div>
                  <button onClick={handleSubmit}>Submit</button>
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
