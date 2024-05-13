const URL = "https://localhost:7264/api";
const DASHBOARD_URL = `${URL}/dashboard`;

export const appConfig = {
  BASE_URL: URL,
  REGISTER_URL: `${URL}/auth/register`,
  LOGIN_URL: `${URL}/auth/login`,
  LOCAL_STORAGE_KEY: "notesAppToken",
  DASHBOARD_USERS: `${DASHBOARD_URL}/users`,
};
