export const BASE_URL = "https://expense-tracker-v1-pzwx.onrender.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    GET_USER_INFO: "auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/income/add",
    GET_ALL_INCOME: "/income/get",
    DELETE_INCOME: (income_id) => `/income/delete/${income_id}`,
    DOWNLOAD_INCOME: "/income/downloadexcel",
  },
  EXPENSE: {
    ADD_EXPENSE: "/expense/add",
    GET_ALL_EXPENSE: "/expense/get",
    DELETE_EXPENSE: (expense_id) => `/expense/delete/${expense_id}`,
    DOWNLOAD_EXPENSE: "/expense/downloadexcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/image/upload",
  },
};
