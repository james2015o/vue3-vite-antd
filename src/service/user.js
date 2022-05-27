import userApi from "../api/user";
import { setToken } from "@/store/token";

export const login = async (loginForm, app) => {
  const data = await userApi.login(loginForm, {
    okMsg: "登录成功",
  });
  if (data.token) {
    setToken(data.token);
    app.$goto("/");
  }
};
export const logout = async (app) => {
  await userApi.logout({}, { okMsg: "登出成功" });
  setToken(null);
  app.$goto("/login");
};

export const getUserByToken = async () => {
  const user = await userApi.getUserByToken({}, { useLoading: false });
  return user;
};

export const getUserList = async () => await userApi.getUerList();
