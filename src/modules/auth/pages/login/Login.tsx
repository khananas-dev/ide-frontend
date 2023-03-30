import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import loginSlice, {
  getUserProfileDetailsAPI,
  // getUserNavDetailsAPI,
  // getUserProfileDetailsAPI,
  loginUserAPI,
} from "../../../../common/store/features/auth/loginSlice";

import { useAppDispatch, useAppSelector } from "../../../../common/store/hooks";
import ButtonElement from "../../../../components/button/ButtonElement";

import FormInput from "../../../../components/form-components/form-input/FormInput";
import InputCheckBox from "../../../../components/form-components/input-checkbox/InputCheckBox";
import LinkComponent from "../../../../components/link-component/LinkComponent";
import ParagraphComponent from "../../../../components/paragraph-component/ParagraphComponent";
import TitleComponent from "../../../../components/title-component/TitleComponent";
import { ToastService } from "../../../../components/toast/ToastService";
import { LoginContainer } from "./LoginStyled";

// Form Model
class LoginFormModel {
  username!: string;
  password!: string;
}
export default function Login() {
  // Variables
  const { t } = useTranslation();
  let navigate = useNavigate();

  // Store Hook
  const dispatch = useAppDispatch();
  const { token, loading, error } = useAppSelector((state) => state.auth);

  // Form Hook
  const {
    watch,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<LoginFormModel>({
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      // isRememberMe: false,
    },
  });

  //
  // Functions
  const onSubmit = (e: any) => {
    console.log(e);

    dispatch(loginUserAPI(e))
      .unwrap()
      .then(
        (value) => {
          console.log("Logged In");
          // dispatch(loginSlice.actions.completeLoggedIn());
          // navigate("/");
          Promise.all([
            dispatch(getUserProfileDetailsAPI())
              .unwrap()
              .then((value) => {
                dispatch(loginSlice.actions.completeLoggedIn());
                navigate("/");
              }),
          ]);
        },
        (error) => {
          console.error("Error Log in", error);
        }
      );
  };

  return (
    <LoginContainer>
      <TitleComponent>Sign In</TitleComponent>
      <ParagraphComponent>Enter your details below</ParagraphComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
          }}
          render={({ field, fieldState }) => (
            <FormInput
              id="username"
              isFullWidth={true}
              label={"Username"}
              formField={field}
              formFieldState={fieldState}
              required={true}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
          }}
          render={({ field, fieldState }) => (
            <FormInput
              id="login-password"
              type="password"
              isFullWidth={true}
              label={"Password"}
              formField={field}
              formFieldState={fieldState}
              required={true}
            />
          )}
        />
        <div className="d-flex justify-content-between mb20 mt10">
          <LinkComponent to="/auth/signup">
            Don't have an account? <strong>Register</strong>
          </LinkComponent>
          {/* <LinkComponent to="/auth/forgot-password">
            Forgot Password?
          </LinkComponent> */}
        </div>

        <div className="mt10">
          <ButtonElement
            role="primary"
            buttonType="normal"
            type="submit"
            label={"Submit"}
            size="medium"
            className="mr20"
            loading={loading}
            disabled={!isValid}
          />
        </div>
      </form>
    </LoginContainer>
  );
}
