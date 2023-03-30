import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../../common/store/features/auth/loginSlice";
// import loginSlice, {
//   getUserNavDetailsAPI,
//   getUserProfileDetailsAPI,
//   loginUserAPI,
// } from "../../../../common/store/features/auth/loginSlice";

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
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  verifyNewPassword?: string;
}
export default function SignUP() {
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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      verifyNewPassword: "",
    },
  });

  // Form Hook Watch
  const passwordWatch = watch("password");
  const verifyNewPasswordWatch = watch("verifyNewPassword");
  // Functions
  const onSubmit = (e: any) => {
    console.log(e);
    let { username, email, password, lastName, firstName } = e;
    dispatch(createUser({ firstName, lastName, username, email, password }))
      .unwrap()
      .then(
        (value) => {
          ToastService.success(value?.message);
          navigate("/auth/login");
        },
        (error) => {
          console.error("Error Log in", error);
        }
      );
    // dispatch(loginUserAPI(e))
    //   .unwrap()
    //   .then(
    //     (value) => {
    //       console.log("Logged In");
    //       // Promise.all([
    //       //   dispatch(getUserProfileDetailsAPI())
    //       //     .unwrap()
    //       //     .then((value) => {
    //       //       dispatch(
    //       //         systemSlice.actions.setCurrentTheme(value.data.colourThemeId)
    //       //       );
    //       //     }),
    //       //   dispatch(getUserNavDetailsAPI()).unwrap(),
    //       //   dispatch(findAllMasterApi({ master: "product" }))
    //       //     .unwrap()
    //       //     .then((value) => {
    //       //       dispatch(systemSlice.actions.setProductsMaster(value.data));
    //       //     }),
    //       // ]).then(
    //       //   (value) => {
    //       //     dispatch(loginSlice.actions.completeLoggedIn());
    //       //     navigate("/");
    //       //   },
    //       //   (error) => {
    //       //     logger.error("Error User", error);
    //       //   }
    //       // );
    //     },
    //     (error) => {
    //       console.error("Error Log in", error);
    //     }
    //   );
  };

  return (
    <LoginContainer>
      <TitleComponent>Sign Up</TitleComponent>
      <ParagraphComponent>Enter your details below</ParagraphComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "This is required",
                },
              }}
              render={({ field, fieldState }) => (
                <FormInput
                  id="firstName"
                  isFullWidth={true}
                  label={"First Name"}
                  formField={field}
                  formFieldState={fieldState}
                  required={true}
                />
              )}
            />
          </Grid>
          <Grid item md={6}>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "This is required",
                },
              }}
              render={({ field, fieldState }) => (
                <FormInput
                  id="lastName"
                  isFullWidth={true}
                  label={"Last Name"}
                  formField={field}
                  formFieldState={fieldState}
                  required={true}
                />
              )}
            />
          </Grid>
        </Grid>
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
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
          }}
          render={({ field, fieldState }) => (
            <FormInput
              id="email"
              isFullWidth={true}
              label={"Email"}
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
            minLength: {
              value: 8,
              message:
                "Password must be Alphanumeric at least 8 character long.",
            },
          }}
          render={({ field, fieldState }) => (
            <FormInput
              id="reset-new-password"
              type="password"
              isFullWidth={true}
              formField={field}
              formFieldState={fieldState}
              required={true}
              placeholder="Must be 8 letter or more."
            />
          )}
        />
        <Controller
          name="verifyNewPassword"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
            validate: (value) =>
              value === passwordWatch || "The passwords do not match.",
          }}
          render={({ field, fieldState }) => (
            <FormInput
              id="reset-verify-new-password"
              type="password"
              isFullWidth={true}
              formField={field}
              formFieldState={fieldState}
              required={true}
              placeholder="Verify your password"
            />
          )}
        />
        <div className="d-flex justify-content-between mb20 mt10">
          <LinkComponent to="/auth/login">
            Already have an account? <strong>Sign in</strong>
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
