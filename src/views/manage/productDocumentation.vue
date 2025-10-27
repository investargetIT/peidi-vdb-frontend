<script setup lang="ts">
import Layout from "@/views/manage/components/layout/index.vue";
import TitleCard from "@/views/manage/components/titleCard/index.vue";
import TableCard from "@/views/manage/components/tableCard/index.vue";
import DocumentDetail from "@/views/manage/components/documentDetail/index.vue";
</script>

<template>
  <div>
    <Layout>
      <template #left>
        <!-- 标题卡片 -->
        <TitleCard title="产品文档" text="这里是产品文档的介绍" />
        <!-- 数据列表卡片 -->
        <div class="mt-[25px]" />
        <TableCard />
      </template>
      <template #right>
        <!-- 文件详情 -->
        <DocumentDetail />
      </template>
    </Layout>
  </div>
</template>
