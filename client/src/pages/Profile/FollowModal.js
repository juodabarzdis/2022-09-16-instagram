import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import MainContext from "../../context/MainContext";
import "./FollowModal.css";

const FollowModal = ({ showModal, setShowModal, followers }) => {
  const modalRef = useRef(null);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

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

              <div className="following-modal-content">
                <div>
                  <h2>Followers</h2>
                  <div className="">
                    <ul>
                      {followers.map((follower) => (
                        <div className="follower">
                          <Link to={"/profile/" + follower.id}>
                            <div className="follower-content">
                              <div style={{ margin: "0 10px 0 0" }}>
                                <img src={follower.image} alt="" />
                              </div>
                              <div>
                                <p>{follower.username}</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FollowModal;
