import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MainContext from "../../context/MainContext";
import Header from "../../components/Header/Header";
import "./EditProfile.css";
import EditPhotoModal from "./EditPhotoModal";

const EditProfile = () => {
  const { userInfo, profileInfo } = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <EditPhotoModal showModal={showModal} setShowModal={setShowModal} />
      <Header />
      <div className="profile-edit-wrapper">
        <div className="profile-edit-container">
          <div className="profile-edit-container-left"></div>
          <div className="profile-edit-container-right">
            <div className="profile-edit-container-right-title">
              <div className="profile-edit-column-left">
                {profileInfo.image ? (
                  <div
                    className="edit-profile-image"
                    style={{ backgroundImage: `url(${profileInfo.image})` }}
                  ></div>
                ) : (
                  <div
                    className="edit-profile-image"
                    style={{
                      backgroundImage:
                        'url("https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png")',
                    }}
                  ></div>
                )}
              </div>
              <div className="profile-edit-container-right-username">
                <h2>{profileInfo.username}</h2>
                <span className="span-bold-link" onClick={openModal}>
                  Change profile photo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
