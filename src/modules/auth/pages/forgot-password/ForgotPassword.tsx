import { Box } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { forgetPasswordApi } from "../../../../common/store/features/auth/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../../common/store/hooks";
import ButtonElement from "../../../../components/button/ButtonElement";

import FormInput from "../../../../components/form-components/form-input/FormInput";
import { OTPInputComponent } from "../../../../components/form-components/otp-input-component/OtpInputComponent";
import LinkComponent from "../../../../components/link-component/LinkComponent";
import ParagraphComponent from "../../../../components/paragraph-component/ParagraphComponent";
import TitleComponent from "../../../../components/title-component/TitleComponent";
import { ToastService } from "../../../../components/toast/ToastService";
import { ForgotPasswordContainer } from "./ForgotPasswordStyled";

interface ForgotPasswordProps {
  setIsForgotPassword: (arg1: boolean) => void;
}

interface ForgotPasswordFormModel {
  email: string;
}
function ForgotPassword() {
  // Store Hook
  const dispatch = useAppDispatch();
  // Variables
  const { t } = useTranslation();
  // const EmailRegex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

  // States
  const [loading, setLoading] = useState<boolean>(false);
  // const [isOtpScreen, setIsOtpScreen] = useState<boolean>(false);
  // const [email, setEmail] = useState<any>("");

  // Form Hook
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<ForgotPasswordFormModel>({
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  // Form Hook Watch
  const handleOnSubmit = (e: any) => {
    // logger.info(e);
    forgetPassword(e.email);
  };

  // Api Functions
  const forgetPassword = (payload: any) => {
    setLoading(true);
    dispatch(forgetPasswordApi(payload))
      .unwrap()
      .then(
        (value) => {
          if (value.status === "success") {
            ToastService.success(value.message);
            reset();
          } else {
            ToastService.error(value.message);
          }
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <>
      <ForgotPasswordContainer>
        <TitleComponent>{t("auth.forgotPassword.heading")}</TitleComponent>
        <form id="forget-password" onSubmit={handleSubmit(handleOnSubmit)}>
          <ParagraphComponent>
            {t("auth.forgotPassword.brief")}
          </ParagraphComponent>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: t("validation.required.label"),
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: t("validation.email.invalid.label"),
              },
            }}
            render={({ field, fieldState }) => (
              <FormInput
                id="emailid"
                isFullWidth={true}
                type="email"
                placeholder="mack.mistry@example.com"
                formField={field}
                formFieldState={fieldState}
                required={true}
              />
            )}
          />
          <div className="d-flex justify-content-between mt10">
            <Box>
              <ButtonElement
                role="primary"
                buttonType="normal"
                type="submit"
                label={t("button.send.label")}
                size="large"
                disabled={!isValid}
                loading={loading}
              />
              {/* <LinkComponent onClick={}>
                  {t("button.notReceived.label")}
                </LinkComponent> */}
            </Box>

            <LinkComponent to="/auth/login">
              {t("button.cancel.label")}
            </LinkComponent>
          </div>
        </form>
      </ForgotPasswordContainer>
    </>
  );
}

export default ForgotPassword;
