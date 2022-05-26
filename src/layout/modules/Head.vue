<template>
  <div class="logo">后台管理系统</div>
  <div class="user">
    <a-badge dot>
      <bell-outlined style="font-size: 20px; color: white" />
    </a-badge>

    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        <a-avatar
          shape="square"
          size="large"
          :style="{ backgroundColor: '#00a2ae', verticalAlign: 'middle' }"
        >
          {{ user?.nickName }}
        </a-avatar>
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">个人信息</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">修改密码</a>
          </a-menu-item>
          <a-menu-item>
            <a @click="logout(_this)">退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup>
import { BellOutlined } from "@ant-design/icons-vue";
import { logout } from "../../service/user";
import { getCurrentInstance, defineEmits } from "vue";
const _this = getCurrentInstance().ctx;
defineEmits("reload");
</script>
<script>
import { getUser } from "@/store/user";
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    getUser().then((data) => {
      this.user = data;
    });
  },
};
</script>

<style lang="less" scoped>
.logo {
  font-size: 24px;
}
.user {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
