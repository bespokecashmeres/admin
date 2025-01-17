"use client";

import { RHFInputField, RHFPasswordField, SubmitButton } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import {
  COOKIES,
  MESSAGES,
  ROUTES,
  USER_TYPES
} from "@/constants";
import { SIGNIN_API_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { pickProperties } from "@/utils/common.utils";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type SignInFormType = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const methods = useForm<SignInFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      const loginResponse = await (isAdmin
        ? adminAxiosInstance
        : wsAxiosInstance
      ).post(SIGNIN_API_URL, {
        ...data,
        userType: USER_TYPES[isAdmin ? "admin" : "ws"],
      });
      if (loginResponse.data.success) {
        toast.success(loginResponse.data.message || t(MESSAGES.SUCCESS));
        const result = loginResponse?.data?.data;
        const userData = pickProperties(result, [
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
        Cookies.set(COOKIES[isAdmin ? "aToken" : "wToken"], result?.token);
        Cookies.set(
          COOKIES[isAdmin ? "admin" : "ws"],
          JSON.stringify(userData)
        );
        router.replace(
          `/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.dashboard}`
        );
      } else {
        toast.error(
          loginResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
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

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <RHFInputField
              name="email"
              label={t("COMMON.EMAIL_ADDRESS")}
              required
              type="email"
            />
            <RHFPasswordField
              label={t("COMMON.PASSWORD")}
              name="password"
              required
              rules={{
                minLength: {
                  value: 8,
                  message: t("COMMON.PASSWORD_AT_LEAST_EIGHT", {
                    label: t("COMMON.PASSWORD"),
                  }),
                },
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="mr-1">
              <Link
                className="text-sm underline hover:no-underline"
                href={`/${isAdmin ? ROUTES.admin : ROUTES.ws}/${ROUTES.auth}/${
                  ROUTES.forgotPassword
                }`}
              >
                {t("FORGOT_PASSWORD.TITLE")}?
              </Link>
            </div>
            <SubmitButton label={t("SIGNIN.TITLE")} disabled={disableSubmit} />
          </div>
        </form>
      </FormProvider>

      {/* {isAdmin && (
        <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
          <SignInGoogle disabled={disableSubmit} />
        </div>
      )} */}
    </>
  );
};

export default SigninForm;
