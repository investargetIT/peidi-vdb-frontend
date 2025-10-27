<script setup lang="ts">
import DataCard from "@/views/dashboard/components/dataCard/index.vue";
import RiDatabase2Line from "~icons/ri/database-2-line";
import RiFileTextLine from "~icons/ri/file-text-line";
import RiUser3Line from "~icons/ri/user-3-line";
import RiLineChartLine from "~icons/ri/line-chart-line";
import ChartCard from "@/views/dashboard/components/chartCard/index.vue";
import dayjs from "dayjs";

const dataCards = [
  {
    title: "向量集合总数",
    icon: RiDatabase2Line,
    value: "3",
    text: "+1 相比上月"
  },
  {
    title: "向量数据总量",
    icon: RiFileTextLine,
    value: "675",
    text: "+142 相比上月"
  },
  {
    title: "用户数量",
    icon: RiUser3Line,
    value: "3",
    text: "+0 相比上月"
  },
  {
    title: "查询次数",
    icon: RiLineChartLine,
    value: "1324",
    text: "+346 相比上月"
  }
];

const chartCards = [
  {
    name: "recentActivity",
    title: "最近活动",
    text: "过去7天的系统活动",
    option: {
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        // dayjs获取过去7天的日期数组
        data: [
          dayjs().add(-6, "d").startOf("day").format("YYYY-MM-DD"),
          dayjs().add(-5, "d").startOf("day").format("YYYY-MM-DD"),
          dayjs().add(-4, "d").startOf("day").format("YYYY-MM-DD"),
          dayjs().add(-3, "d").startOf("day").format("YYYY-MM-DD"),
          dayjs().add(-2, "d").startOf("day").format("YYYY-MM-DD"),
          dayjs().add(-1, "d").startOf("day").format("YYYY-MM-DD"),
          dayjs().startOf("day").format("YYYY-MM-DD")
        ],
        boundaryGap: false
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        }
      ]
    },
    style: {
      width: "900px"
    }
  },
  {
    name: "collectionUsage",
    title: "集合使用情况",
    text: "各集合的数据量分布",
    option: {
      legend: {
        orient: "vertical",
        left: "left"
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    },
    style: {
      width: "700px"
    }
  }
];
</script>

<template>
  <div>
    <!-- 标题 -->
    <div class="text-[20px] font-bold">系统概览</div>
    <!-- 第一层数据卡片 -->
    <div class="mt-[20px] flex items-center justify-between">
      <DataCard
        v-for="card in dataCards"
        :key="card.title"
        :title="card.title"
        :icon="card.icon"
        :value="card.value"
        :text="card.text"
        style="width: 400px"
      />
    </div>
    <!-- 第二层图表卡片 -->
    <div class="mt-[20px] flex items-center justify-between">
      <ChartCard
        v-for="card in chartCards"
        :key="card.name"
        :name="card.name"
        :title="card.title"
        :text="card.text"
        :option="card.option"
        :style="card?.style"
      />
    </div>
  </div>
</template>
