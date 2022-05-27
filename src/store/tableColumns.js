import { StorageSerializers, useStorage } from "@vueuse/core";
//全局token,本地持久化
const _tableColumns = useStorage(
  import.meta.env.VITE_STORAGE_PREFIX + "-table-columns",
  null,
  undefined,
  {
    serializer: StorageSerializers.object,
  }
);

export const getCloumnStorage = (page) => _tableColumns.value[page];
export const setCloumnStorage = (page, columns) => {
  _tableColumns.value[page] = columns;
};
