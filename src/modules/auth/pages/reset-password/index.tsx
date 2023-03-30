import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { validateForgetPasswordToken } from "../../../../common/store/features/auth/loginSlice";
import { useAppDispatch } from "../../../../common/store/hooks";
import { useQuery } from "../../../../hooks/userQuery";
import ResetPassword from "./ResetPassword";

function ValidateForgetPasswordToken() {
  // Variables
  const query = useQuery();
  let navigate = useNavigate();
  // States
  const [showResetPasswordScreen, setShowResetPasswordScreen] =
    useState<boolean>(false);
  const [data, setData] = useState<any>();
  // Store Hook
  const dispatch = useAppDispatch();

  //   Functions
  const checkForgetPasswordToken = (id: any, token: any) => {
    // dispatch(validateForgetPasswordToken({ id, token }))
    //   .unwrap()
    //   .then(
    //     (value) => {
    //       if (value.status === "success") {
    //         setData(value.data);
    //         setShowResetPasswordScreen(true);
    //       } else {
    //         navigate("/auth/login");
    //       }
    //     },
    //     (error) => {
    //       console.error(error);
    //       navigate("/auth/login");
    //     }
    //   );
  };
  useEffect(() => {
    checkForgetPasswordToken(query.get("id"), query.get("token"));
  }, []);
  return <div>{showResetPasswordScreen && <ResetPassword data={data} />}</div>;
}

export default ValidateForgetPasswordToken;
