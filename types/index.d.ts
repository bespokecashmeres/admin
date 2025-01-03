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

export type CellType =
  | "default"
  | "phone"
  | "toggle"
  | "action"
  | "image"
  | "pdf";

export interface ColumnConfig {
  accessor: string;
  header: string;
  cellType: CellType;
  shouldTranslate?: boolean;
  showCopyButton?: boolean;
  showDeleteBtn?: boolean;
  hideEditBtn?: boolean;
}

export interface Column {
  accessor: string;
  header: string;
  cell: (value: any, row?: any) => JSX.Element;
}

export type AllowedImageFileType = "image/jpeg" | "image/png";

export type AllowedPdfFileType = "application/pdf";

export type LanguageContent = {
  language: string;
  text: string;
};

export type DropDownOptionType = { value: string; label: string; rowOrder?: number, status?: boolean; };
