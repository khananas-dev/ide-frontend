import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonElement from "../../../../components/button/ButtonElement";
import FormInput from "../../../../components/form-components/form-input/FormInput";
import LinkComponent from "../../../../components/link-component/LinkComponent";
import { ToastService } from "../../../../components/toast/ToastService";
import { DefaultUserImage } from "../../../constants/image-constants";
import loginSlice, {
  getUserProfileDetailsAPI,
  logoutUserStore,
} from "../../../store/features/auth/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./ProfileDrawerStyle.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";

interface ProfileDrawerProps {
  onClose: any;
}

function ProfileDrawer(props: ProfileDrawerProps) {
  // hooks
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  // States
  const [loading, setLoading] = useState<boolean>(false);
  // variables
  const noUserImage = DefaultUserImage;
  const { token, navModules, userDetails } = useAppSelector(
    (state) => state.auth
  );

  // effects

  // functions

  function signOutUser() {
    setLoading(true);
    setTimeout(() => {
      dispatch(logoutUserStore(userDetails.userId));
      setLoading(false);
    }, 1000);
  }

  const handleManageAccount = () => {
    props.onClose();
    setTimeout(() => {
      navigate("/profile/info");
    }, 50);
  };

  return (
    <div className="profile-drawer">
      <div className="profile-actions">
        <IconButton
          onClick={() => {
            props?.onClose();
          }}
        >
          <CancelIcon />
        </IconButton>
      </div>
      <div className="profile-upper-section">
        <div className="profile-info">
          <img
            src={userDetails?.userImage ? userDetails.userImage : noUserImage}
            className="profile-img"
            alt="noUserImage"
          />
          <h5>{userDetails.firstName + " " + userDetails.lastName}</h5>
          <LinkComponent
            className="user-email"
            target="_blank"
            to={`mailto:${userDetails.emailId}`}
          >
            {userDetails.emailId}
          </LinkComponent>
          <p className="user-role">{userDetails.roleName}</p>
        </div>
        <div className="navigate-buttons">
          <ButtonElement
            onClick={signOutUser}
            customColor="#E53935"
            buttonType="normal"
            role="secondary"
            label="Sign Out"
            loading={loading}
          />
        </div>
        <div className="user-log">
          {/* <div className="label-box">
            <FormInput
              id="last-modified-on"
              label="Profile Modified On"
              isReadOnly
              value={moment(userDetails?.lastUpdatedOn).format(
                "DD MMM YYYY, hh:mm A"
              )}
            />
          </div> */}
          <div className="label-box">
            <FormInput
              id="last-logged-in"
              label="Last Logged In"
              isReadOnly
              value={moment(userDetails?.loginDate).format(
                "DD MMM YYYY, hh:mm A"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDrawer;
