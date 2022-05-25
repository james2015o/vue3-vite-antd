import { POST, GET, PUT, DELETE } from ".";

const userApi = {
  login: (params, option) => POST("/user/login", params, option),
  logout: (params, option) => POST("/user/logout", params, option),
  getUserByToken: (params, option) => GET("/user/getByToken", params, option),
  testSessionGone: (params, option) => GET("/test/sessiongone", params, option),
};

export default userApi;
