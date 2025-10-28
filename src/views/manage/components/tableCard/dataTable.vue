<script setup lang="ts">
import EpEdit from "~icons/ep/edit";
import EpDelete from "~icons/ep/delete";
import { computed, inject, ref } from "vue";
import type { DataDialogMethods } from "@/views/manage/productDocumentation.vue";

const judgeStatusType = status => {
  switch (status) {
    case "有效":
      return "primary";
    case "草稿":
      return "info";
    case "已过期":
      return "danger";
    default:
      return "primary";
  }
};

let tableData = [
  {
    // -文档标题 -报告编号 -文档类型 -产品名称 -文档状态 -入库时间
    documentTitle: "产品A安全数据表(MSDS)",
    reportNumber: "MSDS-2023-001",
    documentType: "MSDS",
    productName: "产品A",
    documentStatus: "有效",
    storageTime: "2023年10月16日 17:30"
  }
];

//#region tableData 复制n份
const n = 100;
tableData = tableData.flatMap(item => Array(n).fill(item));
//#endregion

const currentPage = ref(1);
const pageSize = ref(10);
// 计算属性 -当前页数据
const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.slice(start, end);
});

const handleSizeChange = size => {
  console.log("每页条数:", size);
  pageSize.value = size;
};
const handleCurrentChange = page => {
  console.log("当前页码:", page);
  currentPage.value = page;
};

// 数据详情弹窗方法
const dataDialogMethods = inject<DataDialogMethods>("dataDialogMethods");
const handleEditClick = row => {
  console.log("编辑点击:", row);
  dataDialogMethods?.initDataDialog(row);
  dataDialogMethods?.showDataDialog("edit");
};
</script>

<template>
  <el-card shadow="never" body-style="padding: 0;">
    <!-- 表格 -->
    <el-table
      :data="currentPageData"
      style="width: 100%; color: #09090b"
      :header-cell-style="{ color: '#09090b' }"
      max-height="740px"
    >
      <el-table-column prop="documentTitle" label="标题">
        <template #default="scope">
          <p class="text-[14px] text-[#09090b] font-bold">
            {{ scope.row.documentTitle }}
          </p>
          <p class="text-[12px] text-[#71717a]">{{ scope.row.reportNumber }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="documentType" label="类型" width="130">
        <template #default="scope">
          <el-tag effect="plain" type="info">
            <span class="text-[#09090b]">{{ scope.row.documentType }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="产品" width="180" />
      <el-table-column prop="documentStatus" label="状态" width="100">
        <template #default="scope">
          <el-tag
            effect="dark"
            :type="judgeStatusType(scope.row.documentStatus)"
          >
            {{ scope.row.documentStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="storageTime" label="入库时间" width="180" />
      <el-table-column label="操作" width="130">
        <template #default="scope">
          <el-button
            text
            size="large"
            style="width: 36px; height: 36px"
            @click="handleEditClick(scope.row)"
          >
            <EpEdit color="#09090b" />
          </el-button>
          <el-button
            text
            size="large"
            style="width: 36px; height: 36px"
            @click="console.log(scope.row)"
          >
            <EpDelete color="#09090b" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="py-[10px] pl-[15px]">
      <el-pagination
        :current-page="currentPage"
        size="large"
        :page-size="pageSize"
        :page-sizes="[10, 30, 100]"
        layout="total, sizes, prev, pager, next"
        :total="tableData.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </el-card>
</template>
