import { POST, GET, PUT, DELETE } from ".";

const userApi = {
  login: (params, option) => POST("/user/login", params, option),
  getUserByToken: (params, option) => GET("/user/getByToken", params, option),
  testSessionGone: (params, option) => GET("/test/sessiongone", params, option),
};

export default userApi;
