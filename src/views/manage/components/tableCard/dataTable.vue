<script setup lang="ts">
import EpEdit from "~icons/ep/edit";
import EpDelete from "~icons/ep/delete";

const tableData = [
  {
    // 标题 类型 产品 状态 创建时间 操作
    title: "产品A安全数据表(MSDS)",
    type: "MSDS",
    product: "产品A",
    status: "有效",
    createTime: "2023年10月16日 17:30"
  },
  {
    title: "产品B技术规格书",
    type: "TDS",
    product: "产品B",
    status: "草稿",
    createTime: "2023年09月21日 22:20"
  },
  {
    title: "产品C检验报告",
    type: "COA",
    product: "产品C",
    status: "已过期",
    createTime: "2023年09月21日 22:20"
  }
];
</script>

<template>
  <el-card shadow="never" body-style="padding: 0;">
    <el-table
      :data="tableData"
      style="width: 100%; color: #09090b"
      :header-cell-style="{ color: '#09090b' }"
    >
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="type" label="类型" width="130">
        <template #default="scope">
          <el-tag effect="plain" type="info">
            <span class="text-[#09090b]">{{ scope.row.type }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="product" label="产品" width="180" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="operation" label="操作" width="180">
        <template #default="scope">
          <el-button
            text
            bg
            size="large"
            style="width: 36px; height: 36px"
            @click="console.log(scope.row)"
          >
            <EpEdit color="#09090b" />
          </el-button>
          <el-button
            text
            bg
            size="large"
            style="width: 36px; height: 36px"
            @click="console.log(scope.row)"
          >
            <EpDelete color="#09090b" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
