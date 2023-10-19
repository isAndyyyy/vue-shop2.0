<template>
  <div>
    <!-- 面包蟹导航区域 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容"> </el-input>
        </el-col>
      </el-row>

      <!-- 订单列表数据 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column
          label="订单价格"
          prop="order_price"
          width="60px"
        ></el-table-column>
        <el-table-column label="是否付款" prop="pay_status" width="70px">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.pay_status === 1"
              >已付款</el-tag
            >
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="是否发货"
          prop="is_send"
          width="60px"
        ></el-table-column>
        <el-table-column label="下单时间" width="190px"> </el-table-column>
        <el-table-column label="操作" width="150px">
          <template>
            <el-button
              type="primary"
              :prefix-icon="Edit"
              size="mini"
            ></el-button>
            <el-button
              type="success"
              :prefix-icon="Location"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
// import request from '@/utils/request'
import { ArrowRight, Edit, Location } from '@element-plus/icons-vue'
import { useOrderStore } from '@/stores/index'
const useStore = useOrderStore()
// import { onMounted } from 'vue'
// const queryInfo = {
//   query: '',
//   pagenum: 1,
//   pagesize: 10
// }
const orderList = []
// const getOrderList = async () => {
//   const res = await request.get('orders', {
//     params: queryInfo
//   })
//   console.log(res)
//   orderList.values = res
//   console.log(orderList.values)
// }

// onMounted(() => {
//   getOrderList()
// })
const list = () => {
  orderList.values = useStore.getList()
  console.log(11)
  console.log(orderList.values)
}
list()
</script>

<style scoped></style>
