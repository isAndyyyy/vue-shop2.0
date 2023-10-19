<template>
  <div>
    <!-- 面包蟹区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2.为 ECharts 准备一个定义了宽高的 DOM -->
      <div id="main" style="width: 900px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
// 导入lodash库中的_对象
import _ from 'lodash'
import { onMounted, ref } from 'vue'
import request from '@/utils/request'

const options = ref({
  title: {
    text: '用户来源'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#E9EEF3'
      }
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      boundaryGap: false
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ]
})

onMounted(async () => {
  const res = await request.get('reports/type/1')
  // if (res.meta.status !== 200) return this.$message.error('获取折线图数据失败!')
  // 4.指定图表的配置项和数据
  // const option = {
  //   title: {
  //     text: 'ECharts 入门示例'
  //   },
  //   tooltip: {},
  //   legend: {
  //     data: ['销量']
  //   },
  //   xAxis: {
  //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  //   },
  //   yAxis: {},
  //   series: [
  //     {
  //       name: '销量',
  //       type: 'bar',
  //       data: [5, 20, 36, 10, 10, 20]
  //     }
  //   ]
  // }
  // 3.基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main'))
  // 5.展示数据
  // myChart.setOption(option)
  // myChart.setOption(res.data) 直接渲染res.data将出错

  // 将API文档上的options与res.data进行合并 通过 _ 对象提供的merge()函数
  const result = _.merge(res, options.value)
  // 最后将合并后的数据进行渲染
  console.log(result)
  console.log(res)
  console.log(11)
  myChart.setOption(result)
})
</script>

<style scoped></style>
