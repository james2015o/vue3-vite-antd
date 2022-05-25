import { StorageSerializers, useStorage } from "@vueuse/core";
//全局tabs,本地持久化
const _tabs = useStorage(
  import.meta.env.VITE_STORAGE_PREFIX + "-tabs",
  [],
  sessionStorage,
  {
    serializer: StorageSerializers.object,
  }
);

//新加入的路由设为当前tab
//被删除的是当前tab就选下一个为当前tab
export const activeKey = useStorage(
  import.meta.env.VITE_STORAGE_PREFIX + "-tab-activeKey",
  null,
  sessionStorage,
  {
    serializer: StorageSerializers.string,
  }
);

export const getTabs = () => _tabs;
export const setTabs = (tabs) => {
  _tabs.value = tabs;
};
//tab ：路由
export const addTab = (tab) => {
  const index = _tabs.value.findIndex((t) => t.name === tab.name);
  if (tab.matched.length > 0) {
    if (index > -1) {
      _tabs.value.splice(index, 1, tab);
    } else {
      _tabs.value.push(tab);
    }    
  }
};

//remove by key,返回被删除key的index
export const removeTab = (key) => {
  const index = _tabs.value.findIndex((t) => t.name === key);

  if (index > -1) {
    _tabs.value.splice(index, 1);
  }
  
  return index;
};

export const clearTab = () => {
  _tabs.value = [];
};
