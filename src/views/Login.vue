<template>
  <div class="login-page">
    <a-form
      ref="form"
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <div class="login-page-tile">后台管理系统</div>
      <a-form-item
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <a-input placeholder="用户名" v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password placeholder="密码" v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item style="margin-bottom: 0">
        <a-button
          :loading="loading"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { login } from "../service/user";

// import loading from "../store/loading";
const _this = getCurrentInstance().ctx;

const form = ref();

const formState = reactive({
  username: "",
  password: "",
});

//提交表单且数据验证成功后回调事件
const onFinish = async (values) => {
  await login(formState, _this);

  //清空表单字段
  // form.value.resetFields();
};
//提交表单且数据验证失败后回调事件
const onFinishFailed = (errorInfo) => {
  //滚动到对应字段位置
  form.value.scrollToField(errorInfo.errorFields[0].name[0]);
};
</script>

<style lang="less" scoped>
.login-page {
  background-color: rgb(233, 232, 232);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .login-page-tile {
    color: rgb(8, 131, 232);
    font-size: 32px;
    padding: 0 24px 24px 24px;
  }
  .login-form {
    max-width: 400px;
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 36px;
  }

  .login-form-button {
    width: 100%;
  }
}
</style>
