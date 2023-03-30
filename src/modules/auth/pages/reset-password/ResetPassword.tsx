import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
// import { ChangeUserPasswordNew } from "../../../../common/store/features/auth/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../../common/store/hooks";
import ButtonElement from "../../../../components/button/ButtonElement";
import FormInput from "../../../../components/form-components/form-input/FormInput";
import TitleComponent from "../../../../components/title-component/TitleComponent";
import { ToastService } from "../../../../components/toast/ToastService";
import { useQuery } from "../../../../hooks/userQuery";
import { ResetPasswordContainer } from "../forgot-password/ForgotPasswordStyled";

class ResetFormModel {
  email!: string;
  newPassword!: string;
  verifyNewPassword!: string;
}
function ResetPassword(props: { data: { emailId: string; userid: number } }) {
  // Variables
  const { t } = useTranslation();
  const query = useQuery();
  let navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(false);
  // Store Hook
  const dispatch = useAppDispatch();

  // Form Hook
  const { watch, handleSubmit, control, setValue, formState } =
    useForm<ResetFormModel>({
      mode: "all",
      defaultValues: {
        email: "",
        newPassword: "",
        verifyNewPassword: "",
      },
    });

  //   Form Hook watch
  const NewPasswordWatch = watch("newPassword");
  const VerifyNewPasswordWatch = watch("verifyNewPassword");

  // Functions
  const onSubmit = (e: any) => {
    console.log(e);
    handleChangeUserPassword(e.verifyNewPassword);
  };

  const handleDisable = () => {
    if (!formState.isValid) {
      return true;
    } else {
      if (NewPasswordWatch === VerifyNewPasswordWatch) {
        return false;
      } else {
        return true;
      }
    }
  };

  const handleChangeUserPassword = (newPassword: any) => {
    setLoading(true);
    let payload = {
      newPassword: newPassword,
      userId: props?.data?.userid,
    };
    // dispatch(ChangeUserPasswordNew(payload))
    //   .unwrap()
    //   .then(
    //     (value:any) => {
    //       console.log(value.data);
    //       if (value.status === "success") {
    //         ToastService.success(value.message);
    //         navigate("/auth/login");
    //       } else if (value.status === "error") {
    //         ToastService.error(value.message);
    //       }
    //       setLoading(false);
    //     },
    //     (error:any) => {
    //       console.error(error);
    //       setLoading(false);
    //     }
    //   );
  };
  useEffect(() => {
    setValue("email", props?.data?.emailId);
  }, [props?.data]);

  return (
    <ResetPasswordContainer>
      <TitleComponent>{t("auth.resetPassword.heading")}</TitleComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box margin={"10px 0px"}>
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
                id="reset-emailid"
                type="email"
                isFullWidth={true}
                formField={field}
                formFieldState={fieldState}
                required={true}
                placeholder="mack.mistry@example.com"
                isReadOnly
              />
            )}
          />
        </Box>
        <Controller
          name="newPassword"
          control={control}
          rules={{
            required: {
              value: true,
              message: t("validation.required.label"),
            },
            minLength: {
              value: 8,
              message: t("validation.password.min.label"),
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
              placeholder="Choose a new password"
            />
          )}
        />
        <Controller
          name="verifyNewPassword"
          control={control}
          rules={{
            required: {
              value: true,
              message: t("validation.required.label"),
            },
            // validate: (value) =>
            //   value === NewPasswordWatch ||
            //   t("validation.password.notMatch.label"),
          }}
          render={({ field, fieldState }) => (
            <FormInput
              id="reset-verify-new-password"
              type="password"
              isFullWidth={true}
              formField={field}
              formFieldState={fieldState}
              required={true}
              placeholder="Verify your new password"
            />
          )}
        />

        <ButtonElement
          role="primary"
          buttonType="normal"
          type="submit"
          label={t("button.resetPassword.label")}
          size="large"
          className="mr20 mt10"
          disabled={handleDisable()}
          loading={loading}
        />
      </form>
    </ResetPasswordContainer>
  );
}

export default ResetPassword;
