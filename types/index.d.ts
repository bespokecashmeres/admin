import { LOCALES } from "@/constants";

export type Locale = (typeof LOCALES)[number];

export type SortConfig = {
  key: string;
  direction: SORT_DIRECTION;
};

export type LoggedInUser = {
  _id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  token: string;
  profile_picture?: string;
  country_id?: string;
  gender?: string;
  mobile_number?: string;
};