import { ref } from "vue";
import { getUserByToken } from "../service/user";
 
//全局当前用户
const _user = ref({});

//return promise
export const getUser = async () => {
  if (!_user.value.id) {
    const data = await getUserByToken();
    _user.value = data;
  }
 
  return _user;
};
