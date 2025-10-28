<script setup lang="ts">
import { inject, ref } from "vue";
import DataBlock from "./dataBlock.vue";
import Search from "~icons/ep/search";
import RiAddLargeLine from "~icons/ri/add-large-line";
import DataTable from "./dataTable.vue";
import type { DataDialogMethods } from "@/views/manage/productDocumentation.vue";

const dataBlocks = [
  {
    title: "总数据量",
    value: Number(156).toLocaleString(),
    color: "#155dfc"
  },
  {
    title: "向量维度",
    value: Number(384).toLocaleString(),
    color: "#00a63e"
  },
  {
    title: "有效数据",
    value: Number(133).toLocaleString(),
    color: "#9810fa"
  },
  {
    title: "最后更新",
    value: "2023年11月20日",
    color: "#f54900"
  }
];

const dataSearch = ref("");

// 数据详情弹窗方法
const dataDialogMethods = inject<DataDialogMethods>("dataDialogMethods");

// 处理添加数据点击事件
const handleAddDataClick = () => {
  dataDialogMethods?.showDataDialog("add");
};
</script>

<template>
  <el-card shadow="never">
    <!-- 数据概览 -->
    <div>
      <div class="text-[18px] font-bold text-[#09090B]">A1-数据概览</div>
      <div class="flex items-center justify-between mt-[20px]">
        <DataBlock
          v-for="block in dataBlocks"
          :key="block.title"
          :title="block.title"
          :value="block.value"
          :color="block.color"
          :style="{ width: '20%' }"
        />
      </div>
      <!-- 数据列表 -->
      <div class="mt-[30px]">
        <!-- 数据列表-标题&搜索框&添加数据 -->
        <div class="flex items-center justify-between mb-[20px]">
          <div class="text-[18px] font-bold text-[#09090B]">A2-数据列表</div>
          <div class="flex items-center">
            <div class="w-[250px] mr-[10px]">
              <el-input
                v-model="dataSearch"
                class="responsive-input"
                placeholder="搜索向量数据..."
                :prefix-icon="Search"
              />
            </div>
            <el-button
              type="primary"
              :icon="RiAddLargeLine"
              @click="handleAddDataClick"
              >添加数据</el-button
            >
          </div>
        </div>
        <!-- 数据列表-表格 -->
        <DataTable />
      </div>
    </div>
  </el-card>
</template>
