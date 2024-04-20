const URL = "https://localhost:7264/api";

export const config = {
  BASE_URL: URL,
  REGISTER_URL: `${URL}/auth/register`,
  LOGIN_URL: `${URL}/auth/login`,
  LOCAL_STORAGE_KEY: "notesAppToken",
};
