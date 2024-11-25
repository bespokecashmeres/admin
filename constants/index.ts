import CONFIG from "@/config";
import { AllowedImageFileType, AllowedPdfFileType } from "@/types/index";
import { buildPath } from "@/utils/common.utils";

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
  users: "users",
  user: "user",
  wholeSaler: "whole-saler",
  add: "add",
  measurementType: "measurement-type",
  google: "google",
  account: "account",
  settings: "settings",
  changePassword: "change-password",
  lookbook: "lookbook",
  categories: "categories",
  mainCategory: "main-category",
  subCategory: "sub-category",
  childCategory: "child-category",
  subChildCategory: "sub-child-category",
  product: "product",
  products: "products",
  yarn: "yarn",
  productType: "product-type",
  size: "size",
  color: "color"
} as const;

export const FULL_PATH_ROUTES = {
  adminAuthSignin: buildPath(true, ROUTES.admin, ROUTES.auth, ROUTES.signin),
  categoriesChildCategory: buildPath(
    false,
    ROUTES.categories,
    ROUTES.childCategory
  ),
  categoriesMainCategory: buildPath(
    false,
    ROUTES.categories,
    ROUTES.mainCategory
  ),
  categoriesSubCategory: buildPath(
    false,
    ROUTES.categories,
    ROUTES.subCategory
  ),
  categoriesSubChildCategory: buildPath(
    false,
    ROUTES.categories,
    ROUTES.subChildCategory
  ),
  productYarn: buildPath(false, ROUTES.product, ROUTES.yarn),
  productProducts: buildPath(false, ROUTES.product, ROUTES.products),
  productProductType: buildPath(false, ROUTES.product, ROUTES.productType),
  productColor: buildPath(false, ROUTES.product, ROUTES.color),
  productSize: buildPath(false, ROUTES.product, ROUTES.size),
  usersMeasurementType: buildPath(false, ROUTES.users, ROUTES.measurementType),
  adminDashboard: buildPath(true, ROUTES.admin, ROUTES.dashboard),
  wsAuthSignin: buildPath(true, ROUTES.ws, ROUTES.auth, ROUTES.signin),
  adminCategoriesChildCategory: buildPath(
    true,
    ROUTES.admin,
    ROUTES.categories,
    ROUTES.childCategory
  ),
  adminProductYarn: buildPath(
    true,
    ROUTES.admin,
    ROUTES.product,
    ROUTES.yarn
  ),
  adminProductProducts: buildPath(
    true,
    ROUTES.admin,
    ROUTES.product,
    ROUTES.products
  ),
  adminLookbook: buildPath(true, ROUTES.admin, ROUTES.lookbook),
  adminCategoriesMainCategory: buildPath(
    true,
    ROUTES.admin,
    ROUTES.categories,
    ROUTES.mainCategory
  ),
  adminUsersMeasurementType: buildPath(
    true,
    ROUTES.admin,
    ROUTES.users,
    ROUTES.measurementType
  ),
  adminProductProductType: buildPath(
    true,
    ROUTES.admin,
    ROUTES.product,
    ROUTES.productType
  ),
  adminProductSize: buildPath(true, ROUTES.admin, ROUTES.product, ROUTES.size),
  adminProductColor: buildPath(true, ROUTES.admin, ROUTES.product, ROUTES.color),
  adminCategoriesSubCategory: buildPath(
    true,
    ROUTES.admin,
    ROUTES.categories,
    ROUTES.subCategory
  ),
  adminCategoriesSubChildCategory: buildPath(
    true,
    ROUTES.admin,
    ROUTES.categories,
    ROUTES.subChildCategory
  ),
  adminUsers: buildPath(true, ROUTES.admin, ROUTES.users),
  adminWholeSaler: buildPath(true, ROUTES.admin, ROUTES.wholeSaler),
  wsDashboard: buildPath(true, ROUTES.ws, ROUTES.dashboard),
};

export const USER_TYPES = {
  admin: "admin",
  ws: "ws",
  user: "user",
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
  LOADING: "COMMON.LOADING",
  INVALID_SLUG: "COMMON.INVALID_SLUG",
} as const;

export const IMAGE_ALLOWED_TYPES: AllowedImageFileType[] = [
  "image/jpeg",
  "image/png",
] as const;

export const PDF_ALLOWED_TYPES: AllowedPdfFileType[] = [
  "application/pdf",
] as const;

export const MAX_FILE_UPLOAD_SIZE = 10 * 1024 * 1024;

export const BIND_LANGUAGE_TRANSLATE_KEY = {
  men: "COMMON.MEN",
  women: "COMMON.WOMEN",
} as const;

export const DEFAULT_LOCALE_VALUE = LOCALES.reduce(
  (acc, lang) => ({ ...acc, [lang]: "" }),
  {}
);
