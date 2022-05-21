import axios from "axios";

import useDefaultAxios from ".";
useDefaultAxios();

const userApi = {
  login: (params) => {
    console.log(params);
    axios.post("/user/login", params);
  },
};

export default userApi;
