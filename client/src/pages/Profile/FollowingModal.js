import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import MainContext from "../../context/MainContext";
import "./FollowModal.css";

const FollowModal = ({
  showFollowingModal,
  setShowFollowingModal,
  following,
}) => {
  const modalRef = useRef(null);

  const closeFollowingModal = (e) => {
    if (modalRef.current === e.target) {
      setShowFollowingModal(false);
    }
  };

  return (
    <>
      {showFollowingModal ? (
        <div
          className="modal-wrapper"
          ref={modalRef}
          onClick={closeFollowingModal}
        >
          <div className="modal">
            <div className="modal-content">
              <div
                onClick={() => setShowFollowingModal((prev) => !prev)}
                className="modal-exit"
              >
                X
              </div>
              <div className="following-modal-content">
                <div>
                  <h2>Following</h2>
                  <div className="">
                    <ul>
                      {following.map((follower) => (
                        <div className="follower">
                          <Link to={"/profile/" + follower.id}>
                            <div className="follower-content">
                              <div style={{ margin: "0 10px 0 0" }}>
                                <img
                                  src={
                                    follower.image
                                      ? follower.image
                                      : "https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png"
                                  }
                                  alt=""
                                />
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
