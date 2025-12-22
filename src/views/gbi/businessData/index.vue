<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import EpPlus from "~icons/ep/plus";
import Search from "~icons/ep/search";
import BusinessLogicOption from "@/views/gbi/businessData/components/businessLogicOption/index.vue";
import {
  getGbiExplainPage,
  postGbiExplainDelete,
  postGbiExplainNew,
  postGbiExplainUpdate
} from "@/api/vdb";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";

interface BusinessLogic {
  id: string;
  milvusId: string;
  gbiExplain: string;
  explainType: boolean;
}

interface BusinessLogicWithEdit extends BusinessLogic {
  isEditing: boolean; // 统一使用 isEditing
  originalData: BusinessLogic | {}; // 使用具体的类型而不是 object
}

// 业务逻辑类型选项
const businessLogicTypes = [
  {
    label: "系统智能判断",
    value: true,
    description: "将由模型根据用户问题内容进行智能判断选择性生效。",
    isRecommend: true // 推荐
  },
  {
    label: "全局类型",
    value: false,
    description: " 全局型业务逻辑对全部用户问题生效。",
    isRecommend: false
  }
];

const searchValue = ref("");
// 处理搜索参数
const handleSearchParams = () => {
  const temp = [];
  if (searchValue.value) {
    temp.push({
      searchName: "gbiExplain",
      searchType: "like",
      searchValue: searchValue.value
    });
  }
  return JSON.stringify(temp);
};

const tableData = ref<BusinessLogicWithEdit[]>([
  // {
  //   id: "1",
  //   milvusId: "1",
  //   gbiExplain:
  //     "任务系统明细的需求发起人、需求发起人主管、对接人、对接人主管、承接人、承接人主管都为…",
  //   explainType: true,
  //   isEditing: false, // 是否为编辑模式
  //   originalData: {} // 原始数据备份
  // }
]);

//#region 操作栏逻辑
// 搜索按钮点击事件
const handleSearchClick = () => {
  // console.log("搜索关键词：" + searchValue.value);
  fetchTableData();
};
//#endregion

//#region 分页相关逻辑
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

//#endregion

//#region 行内编辑相关逻辑
// 进入编辑模式
const handleEditClick = row => {
  row.isEditing = true;
  // 备份原始数据
  row.originalData = { ...row };
};

// 保存编辑
const handleSaveClick = row => {
  // row.isEditing = false;
  console.log("保存数据：", row);
  // 这里可以添加保存到后端的逻辑
  // 编辑需要判断field是否改变，不改变就不传field参数
  const temp = {
    id: row.id,
    milvusId: row.milvusId,
    gbiExplain: row.gbiExplain,
    explainType: row.explainType,
    originalData: row.originalData
  };
  if (temp.gbiExplain === temp.originalData.gbiExplain) {
    delete temp.gbiExplain;
  }
  delete temp.originalData;

  postGbiExplainUpdate(temp)
    .then((res: any) => {
      if (res.code === 200) {
        message("修改业务逻辑解释成功", { type: "success" });
        row.isEditing = false;
        // 清除备份数据
        row.originalData = {};
        fetchTableData();
      } else {
        message(res.msg || "修改业务逻辑解释失败", { type: "error" });
        // 恢复原始数据
        Object.assign(row, row.originalData);
        row.originalData = {};
        row.isEditing = false;
      }
    })
    .catch(err => {
      message(err.message || "修改业务逻辑解释失败", { type: "error" });
      // 恢复原始数据
      Object.assign(row, row.originalData);
      row.originalData = {};
      row.isEditing = false;
    });
};

// 取消编辑
const handleCancelClick = row => {
  // 恢复原始数据
  Object.assign(row, row.originalData);
  row.originalData = {};
  row.isEditing = false;
};

// 删除按钮点击事件
const handleDeleteClick = row => {
  console.log("删除行数据：", row);
  // 这里可以添加删除逻辑
  ElMessageBox.confirm(
    `确认删除ID为【${row.id}】的业务逻辑解释吗？`,
    "删除确认",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      // 确认删除
      postGbiExplainDelete({ id: row.id, milvusId: row.milvusId })
        .then((res: any) => {
          if (res.code === 200) {
            message(`ID为【${row.id}】的业务逻辑解释删除成功`, {
              type: "success"
            });
            fetchTableData();
          } else {
            message(res.msg || "删除业务逻辑解释失败", { type: "error" });
          }
        })
        .catch(err => {
          message(err.message || "删除业务逻辑解释失败", { type: "error" });
        });
    })
    .catch(() => {
      // 取消删除
    });
};
//#endregion

//#region 详情弹窗相关逻辑
const dialogFormVisible = ref(false);
const form = reactive<BusinessLogic>({
  id: "",
  milvusId: "",
  gbiExplain: "",
  explainType: null
});
const formRef = ref<any>(null);
const rules = reactive({
  gbiExplain: [
    { required: true, message: "请输入业务逻辑解释", trigger: "blur" }
  ],
  explainType: [
    { required: true, message: "请选择业务逻辑类型", trigger: "change" }
  ]
});
// 处理弹窗保存点击事件
const handleDialogSaveClick = () => {
  formRef.value.validate((valid: any) => {
    if (valid) {
      postGbiExplainNew(form)
        .then((res: any) => {
          if (res.code === 200) {
            message("新增业务逻辑解释成功", { type: "success" });
            dialogFormVisible.value = false;
            fetchTableData();
          } else {
            message(res.msg || "新增业务逻辑解释失败", { type: "error" });
          }
        })
        .catch(err => {
          message(err.message || "新增业务逻辑解释失败", { type: "error" });
        });
    }
  });
};
// 监听弹窗关闭事件
watch(dialogFormVisible, (newVal: boolean) => {
  if (!newVal) {
    // 重置表单
    formRef.value?.resetFields();
  }
});
//#endregion

//#region 请求相关逻辑
const fetchTableData = () => {
  getGbiExplainPage({
    pageNo: pagination.currentPage,
    pageSize: pagination.pageSize,
    searchStr: handleSearchParams()
  })
    .then((res: any) => {
      if (res.code === 200) {
        // 如果当前页大于总页数，重置为第一页 排除总页数为0的情况
        if (res?.data?.current > res?.data?.pages && res?.data?.pages !== 0) {
          pagination.currentPage = res?.data?.pages || 1;
          return;
        }
        // 需要给表单添加 isEditing 和 originalData 属性
        const temp = res?.data?.records || [];
        temp.forEach(item => {
          item.isEditing = false;
          item.originalData = {};
        });
        tableData.value = temp;
        // 更新分页结果
        pagination.total = res?.data?.total || 0;
      } else {
        message(res.msg || "获取业务逻辑解释失败", { type: "error" });
      }
    })
    .catch(err => {
      message(err.message || "获取业务逻辑解释失败", { type: "error" });
    });
};
//#endregion

// 监听分页参数变化
watch(
  pagination,
  (newVal: any, oldVal: any) => {
    // total更新时不触发
    if (newVal?.total === oldVal?.total) {
      return;
    }
    console.log("分页参数变化:", newVal, oldVal);
    fetchTableData();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  // fetchTableData();
});
</script>

<template>
  <div>
    <!-- 标题栏 -->
    <div class="mb-[20px]">
      <div class="text-[20px] font-bold">业务数据维护</div>
      <div class="text-[14px] text-[#666666] mt-[10px]">
        您可以将业务口径的逻辑定义、专有名词、指标计算口径等信息在此录入，帮助析言更好地理解自然语言问题中的业务知识。
      </div>
      <div class="mt-[10px]">
        <el-alert
          title="举例：本月指的是本月1日至今天的数据量汇总；咨询转化率指的是有咨询且下单成功客户数/有咨询客户数*100%，显示百分数，保留两位小数。"
          type="primary"
          show-icon
          :closable="false"
        />
      </div>
    </div>
    <!-- 操作栏 -->
    <div class="flex justify-between items-center">
      <el-input
        v-model="searchValue"
        style="max-width: 400px"
        placeholder="搜索业务逻辑关键词"
        clearable
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearchClick" />
        </template>
      </el-input>
      <div>
        <el-button
          type="primary"
          :icon="EpPlus"
          @click="dialogFormVisible = true"
          >新增逻辑解释</el-button
        >
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-class-name="'pd-gbi-business-data-header-cell'"
      :header-row-class-name="'pd-gbi-business-data-header-row'"
      class="mt-[20px] rounded-[10px]"
    >
      <el-table-column prop="id" label="ID" width="100" />

      <!-- 业务逻辑解释列 - 动态显示 -->
      <el-table-column
        prop="gbiExplain"
        label="业务逻辑解释"
        show-overflow-tooltip
      >
        <template #default="scope">
          <div v-if="!scope.row.isEditing" class="business-logic-text">
            {{ scope.row.gbiExplain }}
          </div>
          <el-input
            v-else
            v-model="scope.row.gbiExplain"
            placeholder="请输入业务逻辑解释"
            maxlength="500"
            show-word-limit
            clearable
          />
        </template>
      </el-table-column>

      <!-- 业务逻辑类型列 - 动态显示 -->
      <el-table-column prop="explainType" label="业务逻辑类型" width="200">
        <template #default="scope">
          <div v-if="!scope.row.isEditing" class="type-text">
            {{
              businessLogicTypes.find(
                item => item.value === scope.row.explainType
              )?.label || scope.row.explainType
            }}
          </div>
          <el-select
            v-else
            v-model="scope.row.explainType"
            placeholder="请选择业务逻辑类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in businessLogicTypes"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
              <BusinessLogicOption
                :item="item"
                :selected-value="scope.row.explainType"
              />
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <!-- 操作列 - 动态显示 -->
      <el-table-column prop="operation" label="操作" width="200">
        <template #default="scope">
          <div v-if="!scope.row.isEditing" class="operation-buttons">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-divider direction="vertical" />
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDeleteClick(scope.row)"
            >
              删除
            </el-button>
          </div>
          <div v-else class="edit-buttons">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleSaveClick(scope.row)"
            >
              保存
            </el-button>
            <el-divider direction="vertical" />
            <el-button
              link
              type="primary"
              size="small"
              @click="handleCancelClick(scope.row)"
            >
              取消
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格分页 -->
    <el-pagination
      v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      class="mt-[20px] flex justify-end"
      :page-sizes="[10, 30, 50, 100]"
      background
      layout="prev, pager, next, sizes"
      :total="pagination.total"
    />
    <!-- 详情弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="添加业务数据" width="500">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="业务逻辑解释" prop="gbiExplain">
          <el-input
            v-model="form.gbiExplain"
            type="textarea"
            :rows="8"
            :maxlength="500"
            show-word-limit
            placeholder="请输入业务逻辑解释"
            autocomplete="off"
            clearable
          />
        </el-form-item>
        <el-form-item label="业务逻辑类型" prop="explainType">
          <el-select
            v-model="form.explainType"
            placeholder="请选择业务逻辑类型"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in businessLogicTypes"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
              <BusinessLogicOption
                :item="item"
                :selected-value="form.explainType"
              />
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogSaveClick">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.pd-gbi-business-data-header-row) {
  & > th {
    background-color: #d7d7d8;
  }
}

:deep(.pd-gbi-business-data-header-cell) {
  color: #000;

  & > .cell {
    border-right: 2px solid #c5c5c5;
  }
  // 最后一个单元格不添加边框
  &:last-child > .cell {
    border-right: none;
  }
}

// 行内编辑样式
.business-logic-text {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  word-break: break-all;
  white-space: nowrap;
}

.type-text {
  font-weight: 500;
}

.operation-buttons,
.edit-buttons {
  display: flex;
  gap: 4px;
  align-items: center;
}

// 下拉选项卡片样式
.el-select-dropdown__item {
  height: auto !important;
  padding: 0 !important;
}
</style>
