import { LOCALES } from "@/constants";

export type Locale = (typeof LOCALES)[number];

export type SortConfig = {
  key: string;
  direction: SORT_DIRECTION;
};
