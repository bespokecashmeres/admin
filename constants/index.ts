import CONFIG from "@/config";

export const LOCALES = ["en", "da"] as const;

export const LOCAL_STORAGE = {
  aToken: "aToken",
  admin: "admin",
  wToken: "wToken",
  ws: "ws",
} as const;


export const ROUTES = {
  admin: "admin",
  auth: "auth",
  ws: "ws",
  signin: "signin",
  signup: "signup",
  forgotPassword: "forgot-password",
  dashboard: "dashboard",
  manageUsers: "manage-users",
  users: "users",
  user: "user",
  wholeSaler: "whole-saler",
  add: "add"
} as const;

export const USER_TYPES = {
  admin: "admin",
  ws: "ws",
  user: "user"
} as const;

export const HTTP_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const APP_NAME = "Bespoke Cashemere" as const;

export const ADMIN_GENERAL_INFO = {
  email: "sales@vamenture.com",
  contact: "vamenture@gmail.com",
  logo: CONFIG.adminDomainURL + "/images/favicon.png",
  website: CONFIG.adminDomainURL,
} as const;

export const MESSAGES = {
  SUCCESS: "COMMON.SUCCESS",
  SOMETHING_WENT_WRONG: "COMMON.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN",
  LOADING: "COMMON.LOADING"
} as const;
