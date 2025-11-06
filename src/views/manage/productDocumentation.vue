<script setup lang="ts">
import Layout from "@/views/manage/components/layout/index.vue";
import TitleCard from "@/views/manage/components/titleCard/index.vue";
import TableCard from "@/views/manage/components/tableCard/index.vue";
import DocumentDetail from "@/views/manage/components/documentDetail/index.vue";
import DataDialog from "@/views/manage/components/dataDialog/index.vue";
import { onMounted, provide, ref } from "vue";
import type { DialogType } from "@/views/manage/components/dataDialog/index.vue";
import LinkDetail from "@/views/manage/components/linkDetail/index.vue";
import { getMilvusPage, getCommonEnum } from "@/api/vdb";
import { message } from "@/utils/message";
import { useRoute } from "vue-router";

//#region 请求数据状态枚举
const docStatusEnum = ref<any[]>([]);
// 请求数据状态
const fetchDocStatusEnum = () => {
  getCommonEnum("docStatus")
    .then((res: any) => {
      if (res?.code === 200) {
        // 处理成功逻辑
        docStatusEnum.value = res?.data || [];
      } else {
        // 处理失败逻辑
        message("请求数据状态失败", { type: "error" });
      }
    })
    .catch(() => {
      // 处理失败逻辑
      message("请求数据状态失败", { type: "error" });
    });
};
provide("docStatusEnum", docStatusEnum);
//#endregion

//#region 请求报告类型枚举
const reportTypeEnum = ref<any[]>([]);
// 请求报告类型
const fetchReportTypeEnum = () => {
  getCommonEnum("reportType")
    .then((res: any) => {
      if (res?.code === 200) {
        // 处理成功逻辑
        reportTypeEnum.value = res?.data || [];
      } else {
        // 处理失败逻辑
        message("请求报告类型失败", { type: "error" });
      }
    })
    .catch(() => {
      // 处理失败逻辑
      message("请求报告类型失败", { type: "error" });
    });
};
provide("reportTypeEnum", reportTypeEnum);
//#endregion

//#region 请求分页数据
// 分页数据加载状态
const tableLoading = ref(true);
const route = useRoute();
// 数据列表
const milvusPageList = ref<any[]>([]);

// 分页参数
const pageParams = ref({
  pageNo: 1,
  pageSize: 1000
});

// 筛选标题卡片数据
const handleTitleCardTitle = () => {
  switch (route.path) {
    case "/manage/productDocumentation":
      return {
        title: "产品文档",
        subTitle: "所有产品相关的文档向量"
      };
    case "/manage/peidiDocumentation":
      return {
        title: "佩蒂文档",
        subTitle: "佩蒂相关的文档和资料"
      };
    case "/manage/detectAndTagReport":
      return {
        title: "检测&标签报告",
        subTitle: "产品检测报告和标签相关文档"
      };
    default:
      return {
        title: "",
        subTitle: ""
      };
  }
};
// 请求分页数据
const handleReportType = () => {
  // 查看路由
  // console.log("当前路由路径:", route.path);
  switch (route.path) {
    case "/manage/productDocumentation":
      return [
        {
          searchName: "reportType",
          searchType: "equals",
          searchValue: '"产品文档"'
        }
      ];
      break;
    case "/manage/peidiDocumentation":
      return [
        {
          searchName: "reportType",
          searchType: "equals",
          searchValue: '"佩蒂文件"'
        }
      ];
      break;
    case "/manage/detectAndTagReport":
      return [
        {
          searchName: "reportType",
          searchType: "equals",
          searchValue: '"检测报告"&#&"标签审核报告"'
        }
      ];
      break;
    default:
      break;
  }
};

const fetchMilvusPage = () => {
  tableLoading.value = true;

  // 目前三个路由界面风格统一，所以根据地址判断文档类型参数
  const searchStr = JSON.stringify(handleReportType());
  getMilvusPage({
    ...pageParams.value,
    searchStr
  })
    .then((res: any) => {
      if (res?.code === 200) {
        // 处理成功逻辑
        milvusPageList.value = res?.data?.records || [];
      } else {
        // 处理失败逻辑
        message("请求分页数据失败", { type: "error" });
      }
      tableLoading.value = false;
    })
    .catch(() => {
      // 处理失败逻辑
      message("请求分页数据失败", { type: "error" });
      tableLoading.value = false;
    });
};
provide("fetchMilvusPage", fetchMilvusPage);
//#endregion

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

//#region 文件详情数据
// 文件详情数据
const documentDetailData = ref<Record<string, any>>({});
// 文件详情数据 -更新事件
const updateDocumentDetailData = row => {
  documentDetailData.value = row || {};
};
provide("updateDocumentDetailData", updateDocumentDetailData);
//#endregion

onMounted(async () => {
  await fetchReportTypeEnum();
  await fetchDocStatusEnum();
  await fetchMilvusPage();
});
</script>

<template>
  <div>
    <Layout>
      <template #left>
        <!-- 标题卡片 -->
        <TitleCard
          :title="handleTitleCardTitle().title"
          :text="handleTitleCardTitle().subTitle"
          :dataList="milvusPageList"
        />
        <!-- 数据列表卡片 -->
        <div class="mt-[25px]" />
        <TableCard :tableData="milvusPageList" :tableLoading="tableLoading" />
      </template>
      <template #right>
        <!-- 文件详情 -->
        <!-- <DocumentDetail /> -->
        <!-- 链接详情 -->
        <!-- <LinkDetail /> -->
        <el-tabs tab-position="top">
          <el-tab-pane label="文件">
            <DocumentDetail :documentDetailData="documentDetailData" />
          </el-tab-pane>
          <!-- <el-tab-pane label="链接">
            <LinkDetail />
          </el-tab-pane> -->
        </el-tabs>
      </template>
    </Layout>

    <!-- 数据详情弹窗 -->
    <DataDialog ref="dataDialogRef" />
  </div>
</template>
