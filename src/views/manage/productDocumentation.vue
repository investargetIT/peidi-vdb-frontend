<script setup lang="ts">
import Layout from "@/views/manage/components/layout/index.vue";
import TitleCard from "@/views/manage/components/titleCard/index.vue";
import TableCard from "@/views/manage/components/tableCard/index.vue";
import DocumentDetail from "@/views/manage/components/documentDetail/index.vue";
import DataDialog from "@/views/manage/components/dataDialog/index.vue";
import { provide, ref } from "vue";
import type { DialogType } from "@/views/manage/components/dataDialog/index.vue";

//#region 数据详情弹窗逻辑
// 数据详情弹窗方法接口
export interface DataDialogMethods {
  showDataDialog: (type: DialogType) => void;
  initDataDialog: (data: Record<string, any>) => void;
}

const dataDialogRef = ref<typeof DataDialog>();

// 数据详情弹窗 -显示事件
const showDataDialog = (type: DialogType = "add") => {
  // 组件功能尽量解耦，这边对add类型进行初始化是为了给form一个空的快照，不然会影响resetFields方法
  if (type === "add") {
    initDataDialog(null);
  }
  dataDialogRef.value?.showDataDialog(type);
};
// 数据详情弹窗 -初始化事件
const initDataDialog = (data: Record<string, any>) => {
  dataDialogRef.value?.initDataDialog(data);
};
// 数据详情弹窗方法集合
const dataDialogMethods = (): DataDialogMethods => {
  return {
    showDataDialog,
    initDataDialog
  };
};
// 使用 vue-provide 提供方法给子组件
provide<DataDialogMethods>("dataDialogMethods", dataDialogMethods());
//#endregion
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

    <!-- 数据详情弹窗 -->
    <DataDialog ref="dataDialogRef" />
  </div>
</template>
