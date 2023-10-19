<template>
  <div>
    <!-- 面包蟹导航 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable @clear="getUserList"
            ><!-- query为api自带的数据查询请求 -->
            <el-button :icon="Search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible_add = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template v-slot="scope">
            <!-- 作用域插槽slot-scope 可以将父组件的数据传递给子组件 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditInfo(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="showDelInfo(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" v-model:visible="dialogVisible_add" width="50%">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!--编辑用户信息对话框 -->
    <el-dialog title="编辑用户" v-model:visible="dialogVisible_edit">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="editForm.username"
            :readonly="readOnly"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!--删除用户信息对话框 -->
    <el-dialog title="删除用户" v-model:visible="dialogVisible_delete">
      <el-form :model="delForm" ref="delFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="delForm.username" :readonly="readOnly"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="delForm.email" :readonly="readOnly"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="delForm.mobile" :readonly="readOnly"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ArrowRight, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const readOnly = ref(true)
const userList = ref([])
const addForm = ref({
  username: '',
  email: '',
  mobile: '',
  password: ''
})
const editForm = ref({
  username: '',
  email: '',
  mobile: ''
})
const delForm = ref({
  username: '',
  email: '',
  mobile: ''
})

const dialogVisible_add = ref(false)
const dialogVisible_edit = ref(false)
const dialogVisible_delete = ref(false)
// const dialogVisible_select = ref(false)

const addFormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 10,
      message: '用户名长度为3~10字符',
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
      min: 6,
      max: 15,
      message: '密码长度为6~15字符',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 15,
      message: '密码长度为6~15字符',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 15,
      message: '手机号长度为6~15字符',
      trigger: 'blur'
    }
  ]
}
const editFormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 10,
      message: '用户名长度为3~10字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: false
    }
  ],
  email: [
    {
      required: false
    }
  ],
  mobile: [
    {
      required: false
    }
  ]
}

const getUserList = () => {}
getUserList()
// const dialogcolsed = () => {
//   addFormRef.value.resetFields()
// }
</script>

<style scoped></style>
