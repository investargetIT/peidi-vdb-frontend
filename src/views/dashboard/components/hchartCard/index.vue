<script setup lang="ts">
import { onMounted } from "vue";
import * as Highcharts from "highcharts";
import "highcharts/highcharts-3d";

// props
const props = defineProps({
  // name用于图表的初始化
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ""
  },
  text: {
    type: String,
    default: ""
  },
  option: {
    type: Object,
    default: () => ({})
  },
  style: {
    type: Object,
    default: () => ({ width: "700px" })
  }
});

const chartId = props.name + new Date().getTime();

onMounted(() => {
  const chartDom = document.getElementById(chartId);
  if (!chartDom) return;

  Highcharts.chart(chartDom, props.option);
});
</script>

<template>
  <el-card shadow="never" :style="style">
    <div class="text-[16px] font-bold text-[#09090B]">{{ title }}</div>
    <div class="text-[14px] text-[#71717a]">{{ text }}</div>
    <!-- 图表容器 id用时间戳拼接 -->
    <div :id="chartId" style="min-height: 450px" />
  </el-card>
</template>
