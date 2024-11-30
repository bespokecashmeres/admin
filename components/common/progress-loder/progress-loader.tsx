"use client";
import { COOKIES, FULL_PATH_ROUTES, ROUTES } from "@/constants";
import {
  setAdminUserDetailsState,
  setWholeSalerUserDetailsState,
} from "@/framework/redux/reducers";
import { LoggedInUser } from "@/types/index";
import { CommonSliceTypes } from "@/types/redux";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../loader";

const ProgressLoader = () => {
  const { loading } = useSelector((state: CommonSliceTypes) => state.common);
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathName.includes(`/${ROUTES.admin}`)) {
      const userDetails = Cookies.get(COOKIES.admin);
      if (userDetails) {
        const user = JSON.parse(userDetails) as LoggedInUser;
        dispatch(setAdminUserDetailsState(user));
        if (
          pathName.includes(FULL_PATH_ROUTES.adminAuthSignin)
        ) {
          router.replace(FULL_PATH_ROUTES.adminDashboard);
        }
      } 
      // else {
      //   router.replace(`/${ROUTES.admin}/${ROUTES.auth}/${ROUTES.signin}`);
      // }
    } else {
      const userDetails = Cookies.get(COOKIES.ws);
      if (userDetails) {
        const user = JSON.parse(userDetails) as LoggedInUser;
        dispatch(setWholeSalerUserDetailsState(user));
        if (
          pathName.includes(FULL_PATH_ROUTES.wsAuthSignin)
        ) {
          router.replace(FULL_PATH_ROUTES.wsDashboard);
        }
      } 
      // else {
      //   router.replace(`/${ROUTES.ws}/${ROUTES.auth}/${ROUTES.signin}`);
      // }
    }
  }, [pathName]);

  return <Fragment>{loading && <Loading />}</Fragment>;
};

export default ProgressLoader;
