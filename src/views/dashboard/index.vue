<script setup lang="ts">
import DataCard from "@/views/dashboard/components/dataCard/index.vue";
import RiDatabase2Line from "~icons/ri/database-2-line";
import RiFileTextLine from "~icons/ri/file-text-line";
import RiUser3Line from "~icons/ri/user-3-line";
import RiLineChartLine from "~icons/ri/line-chart-line";
import ChartCard from "@/views/dashboard/components/chartCard/index.vue";
import dayjs from "dayjs";
import HChartCard from "@/views/dashboard/components/hchartCard/index.vue";

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

const echartCards = [
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
          smooth: true,
          color: "#2563EB"
        }
      ]
    },
    style: {
      width: "100%"
    }
  }
];

const hchartCard = [
  {
    name: "collectionUsage",
    title: "集合使用情况",
    text: "各集合的数据量分布",
    option: {
      credits: {
        enabled: false
      },
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: ""
      },
      accessibility: {
        point: {
          valueSuffix: "%"
        }
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 35,
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          }
        }
      },
      series: [
        {
          type: "pie",
          name: "占用",
          data: [
            ["集合1", 23],
            ["集合2", 18],
            ["集合3", 12],
            ["集合4", 9],
            ["集合5", 8],
            ["集合6", 30]
          ]
        }
      ]
    },
    style: {
      width: "100%"
    }
  }
];
</script>

<template>
  <div>
    <!-- 标题 -->
    <div class="text-[20px] font-bold">系统概览</div>
    <!-- 第一层数据卡片 -->
    <div class="mt-[20px]">
      <el-row :gutter="60">
        <el-col v-for="card in dataCards" :key="card.title" :span="6">
          <DataCard
            :title="card.title"
            :icon="card.icon"
            :value="card.value"
            :text="card.text"
            style="min-width: 300px"
          />
        </el-col>
      </el-row>
    </div>
    <!-- 第二层图表卡片 -->
    <div class="mt-[20px]">
      <el-row :gutter="60">
        <el-col :span="12">
          <ChartCard
            v-for="card in echartCards"
            :key="card.name"
            :name="card.name"
            :title="card.title"
            :text="card.text"
            :option="card.option"
            :style="card?.style"
          />
        </el-col>
        <el-col :span="12">
          <HChartCard
            v-for="card in hchartCard"
            :key="card.title"
            :name="card.title"
            :title="card.title"
            :text="card.text"
            :option="card.option"
            :style="card?.style"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
