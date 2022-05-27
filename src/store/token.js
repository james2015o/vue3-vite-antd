import { StorageSerializers, useStorage } from "@vueuse/core";
//全局token,本地持久化
const _token = useStorage(
  import.meta.env.VITE_STORAGE_PREFIX + "-token",
  null,
  undefined,
  {
    serializer: StorageSerializers.string,
  }
);

export const getToken = () => _token;
export const setToken = (token) => {
  _token.value = token;
};


