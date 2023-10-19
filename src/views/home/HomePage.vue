<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header class="el-header">
      <div>
        <img id="logo" src="@/assets/logo.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color=" #b6adad"
          text-color="#"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <!-- router参数为侧边栏打开路由模式 -->

          <!-- 一级菜单 -->
          <el-sub-menu
            :index="item.id + ''"
            v-for="item in useListStore.listMenu"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template v-slot:title>
              <!-- 图标 -->
              <el-icon><Grid /></el-icon>
              <!-- 文本 -->
              <span>{{ item.authName }} </span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template v-slot:title>
                <!-- 图标 -->
                <el-icon><Histogram /></el-icon>
                <!-- 文本 -->
                <span>{{ subItem.authName }} </span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getMenuListService } from '@/api/menu'
import { useListMenuStore } from '@/stores/index'
import { Grid, Histogram } from '@element-plus/icons-vue'
const router = useRouter()
const useStore = useUserStore()
const useListStore = useListMenuStore()
const logout = () => {
  useStore.removeToken()
  router.push('/login')
}

const getMenuList = async () => {
  useListStore.listMenu = await getMenuListService()
}
//getMenuList()
onMounted(() => {
  getMenuList()
})

const isCollapse = ref(false)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style>
.el-header {
  background: #0d0d0d;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  color: #fff; /*字体颜色*/
  font-size: 25px; /*字体大小*/
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
      margin-right: 600px;
      margin-top: 0;
    }
  }
}
.el-aside {
  background: #110000;
  .el-menu {
    border-left: 100px;
  }
}
.el-main {
  background: #fff;
}
.el-container {
  height: 100%;
}
#logo {
  height: 50px;
  width: 50px;
}
.toggle-button {
  background: #706a6a;
  font-size: 13px;
  line-height: 24px;
  color: black;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
