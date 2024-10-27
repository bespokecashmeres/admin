"use client";

import {
  CancelLinkButton,
  FileUploadButton,
  RHFFormDropdownField,
  RHFInputField,
  RHFNumberField,
  RHFRadioGroup,
  SubmitButton,
  UserProfile,
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import { LOCAL_STORAGE, MESSAGES, ROUTES } from "@/constants";
import { UPDATE_ACCOUNT_URL } from "@/constants/apis";
import {
  setAdminUserDetailsState,
  setLoadingState,
  setWholeSalerUserDetailsState,
} from "@/framework/redux/reducers";
import { CommonSliceTypes } from "@/types/redux";
import { getAWSImageUrl, pickProperties } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type ProfileFormType = {
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  mobile_number: string;
  gender: string;
  country_id: string;
};

const AccountFormComponent = ({
  countries,
}: {
  countries: { value: string; label: string }[];
}) => {
  const pathname = usePathname();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const editData = useSelector(
    (state: CommonSliceTypes) => state.common[isAdmin ? "adminUser" : "wsUser"]
  );
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>("");
  const t = useTranslations();
  const dispatch = useDispatch();
  const methods = useForm<ProfileFormType>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      mobile_number: "",
      country_id: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (editData) {
      methods.reset({
        country_id: editData.country_id ?? "",
        email: editData.email ?? "",
        first_name: editData.first_name ?? "",
        middle_name: editData.middle_name ?? "",
        gender: editData.gender ?? "",
        last_name: editData.last_name ?? "",
        mobile_number: editData.mobile_number ?? "",
      });
      const url = editData.profile_picture ?? "";
      setProfileUrl(
        url?.startsWith("https://")
          ? url
          : url.length
          ? getAWSImageUrl(url)
          : ""
      );
    }
  }, [editData]);

  const onSubmit = async (data: ProfileFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      const formData = new FormData();
      if (selectedFile) {
        formData.append("profile_picture", selectedFile);
      }
      formData.append("email", data.email);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("middle_name", data.middle_name ?? "");
      formData.append("mobile_number", data.mobile_number);
      formData.append("country_id", data.country_id);
      formData.append("gender", data.gender);

      const registrationResponse = await (isAdmin ? adminAxiosInstance : wsAxiosInstance)({
        url: UPDATE_ACCOUNT_URL,
        method: "PATCH",
        data: formData,
      });
      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        handleClearFile();
        const userData = pickProperties(registrationResponse.data.data, [
          "_id",
          "first_name",
          "middle_name",
          "last_name",
          "gender",
          "email",
          "country_id",
          "profile_picture",
          "mobile_number",
        ]);

        localStorage.setItem(
          LOCAL_STORAGE[isAdmin ? "admin" : "ws"],
          JSON.stringify(userData)
        );
        dispatch(
          (isAdmin ? setAdminUserDetailsState : setWholeSalerUserDetailsState)(
            userData
          )
        );
      } else {
        toast.error(
          registrationResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
    } finally {
      dispatch(setLoadingState(false));
      setDisableSubmit(false);
    }
  };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  };

  useEffect(() => {
    // Cleanup the preview URL when the component unmounts or the file changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const firstName = methods.watch("first_name");
  const lastName = methods.watch("last_name");

  return (
    <FormProvider {...methods}>
      <div className="grow">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            <div className="flex justify-center items-center">
              <div className="mr-4">
                <UserProfile
                  firstName={firstName}
                  lastName={lastName}
                  profile={previewUrl || profileUrl}
                  height={64}
                  width={64}
                  fontSize="2xl"
                />
              </div>
              <FileUploadButton
                onFileChange={handleFileChange}
                onClearFile={handleClearFile}
                hasSelectedFile={!!selectedFile}
              />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <RHFInputField
                name="first_name"
                label={t("COMMON.FIRST_NAME")}
                required
              />
              <RHFInputField
                name="middle_name"
                label={t("COMMON.MIDDLE_NAME")}
              />
              <RHFInputField
                name="last_name"
                label={t("COMMON.LAST_NAME")}
                required
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
              <div className="grid gap-5 md:grid-cols-[120px_auto]">
                <RHFFormDropdownField
                  label={t("COMMON.CODE")}
                  name="country_id"
                  placeholder={t("COMMON.CODE")}
                  options={countries}
                  isClearable={false}
                  required
                />
                <RHFNumberField
                  name="mobile_number"
                  label={t("COMMON.MOBILE_NUMBER")}
                  required
                />
              </div>
              <RHFInputField
                name="email"
                label={t("COMMON.EMAIL_ADDRESS")}
                required
                type="email"
              />
            </div>
            <div>
              <RHFRadioGroup
                name="gender"
                label={t("COMMON.GENDER")}
                options={[
                  { value: "men", label: t("COMMON.MEN") },
                  { value: "women", label: t("COMMON.WOMEN") },
                ]}
                required
              />
            </div>
          </div>
          <footer>
            <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
              <div className="flex self-end gap-4">
                <CancelLinkButton
                  label={t("COMMON.CANCEL")}
                  href={`/${ROUTES[isAdmin ? "admin" : "ws"]}/${
                    ROUTES.dashboard
                  }`}
                />
                <SubmitButton
                  label={t("COMMON.SUBMIT")}
                  disabled={disableSubmit || !editData?._id}
                />
              </div>
            </div>
          </footer>
        </form>
      </div>
    </FormProvider>
  );
};

export default AccountFormComponent;
