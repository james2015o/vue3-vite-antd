import { StorageSerializers, useStorage } from "@vueuse/core";

const user = useStorage("user", null, undefined, {
  serializer: StorageSerializers.object,
});

export default function useUserStore() {
  const login = (username) => {
    user.value = { username };
  };
  return {
    user,
    login,
  };
}
