<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userLoginService } from '@/api/user'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'
// 登录对象
const loginform = ref({
  username: 'admin',
  password: '123456'
})

// 规则对象
const loginFormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 10,
      message: '长度在 5 到 10 个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 10,
      message: '长度在 5 到 10 个字符',
      trigger: 'blur'
    }
  ]
}

const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  await loginFormRef.value.validate()
  const res = await userLoginService(loginform.value)
  userStore.setToken(res.token)
  ElMessage.success('登录成功！')
  router.push('/') // 重定向到主页
}

// loginform引用
const loginFormRef = ref()
</script>
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <!-- 通过引用ref的方法重置表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginform"
        :rules="loginFormRules"
        label-width="0"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input :prefix-icon="User" v-model="loginform.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            v-model="loginform.password"
            type="password"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login_container {
  background: #0d9e6c;
  height: 100%;
}

.login_box {
  height: 300px;
  width: 450px;
  background: #f4f2f2e0;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid#eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
