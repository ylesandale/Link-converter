import axios from "axios";

export const instance = axios.create({ baseURL: "http://localhost:5000" });

export const onRegisterUser = (obj: LoginObj) => {
  return instance.post("/api/auth/register", obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const onLoginUser = (obj: LoginObj) => {
  return instance.post("/api/auth/login", obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const onCreateLink = (obj: string, token: string | null) => {
  return instance.post(
    "/api/link/generate",
    { from: obj },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const onGetLink = (id: string, token: string) => {
  return instance.get(`/api/link/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const onGetAllLinks = (token: string) => {
  return instance.get("/api/link/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
