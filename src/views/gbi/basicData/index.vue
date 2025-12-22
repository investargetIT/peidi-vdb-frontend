<script setup lang="ts">
import {
  getGbiPage,
  postGbiDelete,
  postGbiNew,
  postGbiUpdate
} from "@/api/vdb";
import { message } from "@/utils/message";
import { ElMessage, ElMessageBox } from "element-plus";
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import EiPlus from "~icons/ei/plus";
import CopyDocument from "~icons/ep/copy-document"; // 添加复制图标

interface BasicData {
  id: number | string;
  milvusId: number | string;
  field: string;
  searchSql: string;
  tableName: string;
}

const tableData = ref<BasicData[]>([
  // {
  //   id: 0,
  //   field: "",
  //   searchSql: "",
  //   tableName: ""
  // }
]);

//#region 请求逻辑
const fetchTableData = () => {
  getGbiPage({
    pageNo: 1,
    pageSize: 1000
  })
    .then((res: any) => {
      if (res.code === 200) {
        tableData.value = res.data?.records || [];
      } else {
        message(res.msg || "获取GBI数据失败", { type: "error" });
      }
    })
    .catch(err => {
      message(err.message || "获取GBI数据失败", { type: "error" });
    });
};
//#endregion

//#region 点击事件逻辑 -新增、编辑、删除
// 处理添加点击事件
const handleAddClick = () => {
  dialogFormType.value = "add";
  dialogFormVisible.value = true;
};
// 处理编辑点击事件
const handleEditClick = (row: BasicData) => {
  dialogFormType.value = "edit";

  dialogFormVisible.value = true;

  // 备份row数据
  originalRowData.value = { ...row };

  // 延迟设置编辑数据，避免覆盖初始值
  nextTick(() => {
    form.id = row.id;
    form.milvusId = row.milvusId;
    form.field = row.field;
    form.searchSql = row.searchSql;
    form.tableName = row.tableName;
  });
};
// 处理删除点击事件
const handleDeleteClick = (row: BasicData) => {
  console.log("处理删除点击事件", row);
  ElMessageBox.confirm(`确认删除ID为【${row.id}】的数据吗？`, "确认删除数据", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      postGbiDelete({
        id: row.id,
        milvusId: row.milvusId
      })
        .then((res: any) => {
          if (res.code === 200) {
            message(`ID为【${row.id}】的数据删除成功`, { type: "success" });
            fetchTableData();
          } else {
            message(res.msg || "删除GBI失败", { type: "error" });
          }
        })
        .catch(err => {
          message(err.message || "删除GBI失败", { type: "error" });
        });
    })
    .catch(() => {});
};

// 处理复制字段内容
const handleCopyField = (field: string) => {
  navigator.clipboard
    .writeText(field)
    .then(() => {
      message(`已复制到剪贴板`, { type: "success" });
    })
    .catch(() => {
      // 如果navigator.clipboard不可用，使用备用方法
      const textArea = document.createElement("textarea");
      textArea.value = field;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      message(`已复制到剪贴板`, { type: "success" });
    });
};
//#endregion

//#region 详情弹窗逻辑
// 备份row数据
const originalRowData = ref(null);
const dialogFormVisible = ref(false);
const dialogFormType = ref<"add" | "edit">("add");
const form = reactive<BasicData>({
  id: null,
  milvusId: null,
  field: "",
  searchSql: "",
  tableName: ""
});
const formRef = ref<any>(null);
const rules = reactive({
  field: [{ required: true, message: "请输入Field", trigger: "blur" }],
  searchSql: [{ required: true, message: "请输入SQL", trigger: "blur" }],
  tableName: [{ required: true, message: "请输入TableName", trigger: "blur" }]
});

const handleSave = () => {
  formRef.value.validate((valid: any) => {
    if (valid) {
      if (dialogFormType.value === "add") {
        // 新增
        postGbiNew(form)
          .then((res: any) => {
            if (res.code === 200) {
              message("新增成功", { type: "success" });
              dialogFormVisible.value = false;
              fetchTableData();
            } else {
              message(res.msg || "新增GBI失败", { type: "error" });
            }
          })
          .catch(err => {
            message(err.message || "新增GBI失败", { type: "error" });
          });
      } else {
        // 编辑
        // 编辑需要判断field是否改变，不改变就不传field参数
        const temp = { ...form };
        if (temp.field === originalRowData.value.field) {
          delete temp.field;
        }
        postGbiUpdate(temp)
          .then((res: any) => {
            if (res.code === 200) {
              message("编辑成功", { type: "success" });
              dialogFormVisible.value = false;
              fetchTableData();
            } else {
              message(res.msg || "编辑GBI失败", { type: "error" });
            }
          })
          .catch(err => {
            message(err.message || "编辑GBI失败", { type: "error" });
          });
      }
    } else {
      message("请填写完整信息", { type: "warning" });
    }
  });
};

// 监听弹窗关闭事件
watch(dialogFormVisible, (newVal: boolean) => {
  if (!newVal) {
    // 重置表单
    // console.log("重置表单");
    formRef.value.resetFields();
  }
});
//#endregion

onMounted(() => {
  fetchTableData();
});
</script>

<template>
  <div>
    <!-- 标题栏 -->
    <div class="flex justify-between items-center mb-[30px]">
      <div class="text-[20px] font-bold">基础数据维护</div>
      <div>
        <el-button type="primary" :icon="EiPlus" @click="handleAddClick"
          >添加基础数据</el-button
        >
      </div>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ color: '#000' }"
      border
    >
      <el-table-column prop="id" label="ID" :resizable="false" width="100" />
      <el-table-column
        prop="field"
        label="Field"
        :resizable="false"
        show-overflow-tooltip
      >
        <template #default="scope">
          <div class="flex items-center justify-between">
            <span class="truncate">{{ scope.row.field }}</span>
            <el-icon
              class="ml-2 cursor-pointer text-blue-500 hover:text-blue-600"
              @click="handleCopyField(scope.row.field)"
            >
              <CopyDocument />
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="searchSql"
        label="SQL"
        :resizable="false"
        show-overflow-tooltip
      >
        <template #default="scope">
          <div class="flex items-center justify-between">
            <span class="truncate">{{ scope.row.searchSql }}</span>
            <el-icon
              class="ml-2 cursor-pointer text-blue-500 hover:text-blue-600"
              @click="handleCopyField(scope.row.searchSql)"
            >
              <CopyDocument />
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="tableName" label="Table" :resizable="false" />
      <el-table-column
        prop="operation"
        label="操作"
        :resizable="false"
        width="200"
      >
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情弹窗 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="dialogFormType === 'add' ? '添加基础数据' : '编辑基础数据'"
      width="500"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="Field" prop="field">
          <el-input
            v-model="form.field"
            autocomplete="off"
            placeholder="请输入字段"
            type="textarea"
            :rows="8"
          />
        </el-form-item>
        <el-form-item label="SQL" prop="searchSql">
          <el-input
            v-model="form.searchSql"
            autocomplete="off"
            placeholder="请输入SQL"
            type="textarea"
            :rows="8"
          />
        </el-form-item>
        <el-form-item label="Table" prop="tableName">
          <el-input
            v-model="form.tableName"
            autocomplete="off"
            placeholder="请输入表"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave"> 保存 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  color: #09090b;
}
</style>
