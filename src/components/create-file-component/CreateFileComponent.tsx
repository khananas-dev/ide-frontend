import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  createFileApi,
  createFolderApi,
  getAllWorkSpaceDirectoriesApi,
} from "../../common/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "../../common/store/hooks";
import ButtonElement from "../button/ButtonElement";
import FormInput from "../form-components/form-input/FormInput";
import SelectInput from "../form-components/select-input/SelectInput";
import { ToastService } from "../toast/ToastService";

interface CreateFileComponentFormModel {
  path: string;
  fileName: string;
  folderName: string;
}
function CreateFileComponent(props: {
  onClose: any;
  refreshApi: any;
  type: "file" | "folder";
}) {
  // Variables
  const dispatch = useAppDispatch();
  const { token, navModules, userDetails } = useAppSelector(
    (state) => state.auth
  );
  // States
  const [pathList, setPathList] = useState<{ path: string; name: string }[]>(
    []
  );

  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm<CreateFileComponentFormModel>({
    mode: "all",
    defaultValues: {},
  });

  //   Functions
  const onHandleSubmit = (e: CreateFileComponentFormModel) => {
    console.log("data", e);
    const { fileName, folderName, path } = e;
    switch (props?.type) {
      case "file":
        createFile({ fileName, path });
        break;
      case "folder":
        createFolder({ folderName, path });
        break;

      default:
        break;
    }
  };
  // Api Functions
  const getAllWorkSpaceDirectories = () => {
    let userId = userDetails?.userId;
    dispatch(getAllWorkSpaceDirectoriesApi(userId))
      .unwrap()
      .then(
        (res) => {
          if (res.status === "success") {
            let data: any[] = res.data?.map((item: any) => {
              return {
                path: item?.path,
                name: `~/${item?.path?.toString()?.replace("\\", "/")}`,
              };
            });
            setPathList([{ path: " ", name: "~/" }, ...data]);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };
  const createFile = (payload: any) => {
    dispatch(createFileApi(payload))
      .unwrap()
      .then(
        (res) => {
          if (res.status === "success") {
            ToastService.success(res.message);
            props?.onClose();
            refreshApi();
            reset();
          } else {
            ToastService.error(res?.message);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };
  const createFolder = (payload: any) => {
    dispatch(createFolderApi(payload))
      .unwrap()
      .then(
        (res) => {
          if (res.status === "success") {
            ToastService.success(res.message);
            props?.onClose();
            refreshApi();
            reset();
          } else {
            ToastService.error(res?.message);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };
  const refreshApi = () => {
    getAllWorkSpaceDirectories();
    props?.refreshApi();
  };
  useEffect(() => {
    getAllWorkSpaceDirectories();
  }, []);

  return (
    <Box sx={{ padding: "10px 20px" }}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {props?.type === "file" ? (
          <Controller
            name={`fileName`}
            control={control}
            rules={{
              required: {
                value: true,
                message: "This is required",
              },
            }}
            render={({ field, fieldState }) => (
              <FormInput
                id="file"
                isFullWidth={true}
                label={"File Name"}
                formField={field}
                formFieldState={fieldState}
                required={true}
              />
            )}
          />
        ) : (
          <Controller
            name={`folderName`}
            control={control}
            rules={{
              required: {
                value: true,
                message: "This is required",
              },
            }}
            render={({ field, fieldState }) => (
              <FormInput
                id="folder"
                isFullWidth={true}
                label={"Folder Name"}
                formField={field}
                formFieldState={fieldState}
                required={true}
              />
            )}
          />
        )}

        <Controller
          name="path"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
          }}
          render={({ field, fieldState }) => (
            <SelectInput
              id="path"
              formField={field}
              formFieldState={fieldState}
              required
              options={pathList}
              label="Path"
              dataKey="name"
              returnKey="path"
              isFullWidth
            />
          )}
        />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <ButtonElement
            buttonType="normal"
            role="secondary"
            label="Cancel"
            className="mr5"
            onClick={() => {
              props?.onClose();
            }}
          />
          <ButtonElement
            buttonType="normal"
            role="primary"
            type="submit"
            disabled={!isValid}
            label="Create"
          />
        </Box>
      </form>
    </Box>
  );
}

export default CreateFileComponent;
