import { ref } from "vue";
import userApi from "../api/user";
//全局当前用户
const _user = ref();

export const getUser = () => {
  if (!_user.value) {
    userApi.getUserByToken({}, { useLoading: false }).then((data) => {
      _user.value = data;
    });
  }

  return _user;
};
