<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import RowCol from "@/views/manage/components/dataDialog/rowCol.vue";
import { FormInstance, FormRules } from "element-plus";

const props = defineProps({
  // 保存回调函数
  saveCallback: {
    type: Function as PropType<(data: FormData) => void>,
    default: () => {},
    required: true
  },
  // 取消回调函数
  cancelCallback: {
    type: Function as PropType<() => void>,
    default: () => {},
    required: true
  },
  // 表单数据
  formData: {
    // 不强制数据类型，组件自己遍历对象得到表单字段
    type: Object,
    default: () => {}
  }
});

// 当前选择的表单类别
const selectedForm = ref("t-basic");
const formRef = ref<FormInstance>();

/**
 * 表单字段规划 - 按类别分组
 *
 * 基本信息 (t-basic)
 * - 文档标题: 文档的名称
 * - 文档描述: 文档的详细说明
 * - 文档类型: 文档的分类类型
 * - 文档路径: 文档存储路径
 * - 报告日期: 文档生成日期
 * - 到期日期: 文档有效期截止日期
 * - 语言: 文档使用的语言
 * - 文档状态: 文档当前状态（草稿/发布/归档等）
 *
 * 产品信息 (t-product)
 * - 产品名称/系列名: 产品名称或系列名称
 * - 品牌: 产品品牌
 * - SKU/料号: 产品唯一标识码
 * - 规格/净含量: 产品规格参数
 * - 批次/LOT: 生产批次号
 *
 * 系统信息 (t-system)
 * - 报告编号/唯一文件号: 系统生成的唯一标识
 * - 来源系统: 文档来源系统名称
 * - 文档版本号: 文档版本信息
 * - 文件哈希(完整性校验): 文件完整性校验值
 * - 访问控制: 文档访问权限设置
 *
 * 扩展信息 (t-extend)
 * - 自定义标签: 用户自定义标签
 * - 标准/法规编号: 相关标准或法规编号
 * - 入库时间: 文档入库时间戳
 * - 扩展元数据(JSON格式): 额外的元数据信息
 */

// 表单数据类型定义
interface FormData {
  // 基本信息
  documentTitle: string; // 文档标题
  documentDescription: string; // 文档描述
  documentType: string; // 文档类型
  documentPath: string; // 文档路径
  reportDate: string; // 报告日期
  expiryDate: string; // 到期日期
  language: string; // 语言
  documentStatus: string; // 文档状态

  // 产品信息
  productName: string; // 产品名称/系列名
  brand: string; // 品牌
  sku: string; // SKU/料号
  specification: string; // 规格/净含量
  batchLot: string; // 批次/LOT

  // 系统信息
  reportNumber: string; // 报告编号/唯一文件号
  sourceSystem: string; // 来源系统
  documentVersion: string; // 文档版本号
  fileHash: string; // 文件哈希(完整性校验)
  accessControl: string; // 访问控制

  // 扩展信息
  customTags: string; // 自定义标签
  standardNumber: string; // 标准/法规编号
  storageTime: string; // 入库时间
  extendedData: string; // 扩展元数据(JSON格式)
}

const form = reactive<FormData>({
  // 基本信息
  documentTitle: "",
  documentDescription: "",
  documentType: "",
  documentPath: "",
  reportDate: "",
  expiryDate: "",
  language: "",
  documentStatus: "",

  // 产品信息
  productName: "",
  brand: "",
  sku: "",
  specification: "",
  batchLot: "",

  // 系统信息
  reportNumber: "",
  sourceSystem: "",
  documentVersion: "",
  fileHash: "",
  accessControl: "",

  // 扩展信息
  customTags: "",
  standardNumber: "",
  storageTime: "",
  extendedData: ""
});

const formRules = reactive<FormRules<FormData>>({
  documentTitle: [
    { required: true, message: "请输入文档标题", trigger: "blur" }
  ],
  documentDescription: [
    {
      required: true,
      message: "请输入文档描述",
      trigger: "blur"
    }
  ],
  documentType: [
    { required: true, message: "请输入文档类型", trigger: "blur" }
  ],
  documentPath: [{ required: true, message: "请输入文档路径", trigger: "blur" }]
});

// 表单清空操作
const clearForm = () => {
  // console.log("清空表单数据");
  // 遍历表单数据，将所有字段设为空字符串
  formRef.value?.resetFields();
};

// 处理保存操作
const handleSave = () => {
  // 校验表单数据
  formRef.value?.validate(valid => {
    if (valid) {
      console.log("表单数据有效，执行保存操作");
    } else {
      // 表单数据无效，提示用户
      console.log("表单数据无效，提示用户");
      // 目前只有基本信息需要必填，所有跳到基本信息
      selectedForm.value = "t-basic";
    }
  });
};
// 处理取消操作
const handleCancel = () => {
  clearForm();
  // 执行取消回调函数
  props.cancelCallback();
};

// 监听formData变化，如果newVal不为空，则在newVal中遍历出form对象里存在的字段，赋值给form
watch(
  () => props.formData,
  (newVal, oldVal) => {
    // 只有在formData真正发生变化时才更新
    if (newVal !== oldVal) {
      // console.log("formData变化，先清空form再更新");

      // 先清空form
      Object.keys(form).forEach(key => {
        form[key] = "";
      });

      // 如果newVal不为空，则赋值给form
      if (newVal && Object.keys(newVal).length > 0) {
        Object.keys(form).forEach(key => {
          if (
            newVal[key] !== undefined &&
            newVal[key] !== null &&
            newVal[key] !== ""
          ) {
            form[key] = newVal[key];
          }
        });
      }
    }
  },
  { deep: true, immediate: true }
);

defineExpose({
  clearForm
});
</script>

<template>
  <!-- 表单类别选择 -->
  <div>
    <el-radio-group v-model="selectedForm">
      <el-radio-button label="基本信息" value="t-basic" />
      <el-radio-button label="产品信息" value="t-product" />
      <el-radio-button label="系统信息" value="t-system" />
      <el-radio-button label="扩展信息" value="t-extend" />
    </el-radio-group>
  </div>

  <!-- 信息表单 -->
  <div class="mt-[20px]">
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="form"
      label-width="auto"
      label-position="top"
      :rules="formRules"
    >
      <!-- 类别 -基本信息 -->
      <div v-show="selectedForm === 't-basic'">
        <el-form-item label="文档标题" prop="documentTitle">
          <el-input v-model="form.documentTitle" placeholder="输入文档标题" />
        </el-form-item>
        <el-form-item label="文档描述" prop="documentDescription">
          <el-input
            v-model="form.documentDescription"
            type="textarea"
            placeholder="输入文档描述内容"
          />
        </el-form-item>

        <RowCol>
          <template #left>
            <el-form-item label="文档类型" prop="documentType">
              <el-input
                v-model="form.documentType"
                placeholder="如：MSDS, TDS, COA"
              />
            </el-form-item>
          </template>
          <template #right>
            <el-form-item label="文档路径" prop="documentPath">
              <el-input
                v-model="form.documentPath"
                placeholder="/path/to/document.pdf"
              />
            </el-form-item>
          </template>
        </RowCol>

        <RowCol>
          <template #left
            ><el-form-item label="报告日期" prop="reportDate">
              <el-date-picker
                v-model="form.reportDate"
                type="date"
                format="YYYY/MM/DD"
                placeholder="年/月/日"
              />
            </el-form-item>
          </template>
          <template #right
            ><el-form-item label="到期日期" prop="expiryDate">
              <el-date-picker
                v-model="form.expiryDate"
                type="date"
                format="YYYY/MM/DD"
                placeholder="年/月/日"
              />
            </el-form-item>
          </template>
        </RowCol>

        <RowCol>
          <template #left>
            <el-form-item label="语言" prop="language">
              <el-select v-model="form.language" placeholder="选择语言">
                <el-option label="中文" value="zh" />
                <el-option label="英文" value="en" />
              </el-select>
            </el-form-item>
          </template>
          <template #right>
            <el-form-item label="文档状态" prop="documentStatus">
              <el-select
                v-model="form.documentStatus"
                placeholder="选择文档状态"
              >
                <el-option label="有效" value="valid" />
                <el-option label="草稿" value="draft" />
                <el-option label="已过期" value="expired" />
              </el-select> </el-form-item
          ></template>
        </RowCol>
      </div>

      <!-- 类别 -产品信息 -->
      <div v-show="selectedForm === 't-product'">
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="输入产品名称" />
        </el-form-item>

        <RowCol>
          <template #left>
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="form.brand" placeholder="输入品牌名称" />
            </el-form-item>
          </template>
          <template #right>
            <el-form-item label="SKU/料号" prop="sku">
              <el-input
                v-model="form.sku"
                placeholder="输入SKU编号"
              /> </el-form-item
          ></template>
        </RowCol>

        <RowCol>
          <template #left>
            <el-form-item label="规格/净含量" prop="specification">
              <el-input
                v-model="form.specification"
                placeholder="如: 1L, 500ml"
              />
            </el-form-item>
          </template>
          <template #right>
            <el-form-item label="批次/LOT" prop="batchLot">
              <el-input
                v-model="form.batchLot"
                placeholder="输入批次号"
                type="number"
              />
            </el-form-item>
          </template>
        </RowCol>
      </div>

      <!-- 类别 -系统信息 -->
      <div v-show="selectedForm === 't-system'">
        <el-form-item label="报告编号/唯一文件号" prop="reportNumber">
          <el-input v-model="form.reportNumber" placeholder="输入报告编号" />
        </el-form-item>

        <RowCol>
          <template #left>
            <el-form-item label="来源系统" prop="sourceSystem">
              <el-input
                v-model="form.sourceSystem"
                placeholder="如: PLM, CRM, QMS"
              />
            </el-form-item>
          </template>
          <template #right>
            <el-form-item label="文档版本" prop="documentVersion">
              <el-input
                v-model="form.documentVersion"
                placeholder="如: v1.0, v2.1"
              /> </el-form-item
          ></template>
        </RowCol>

        <el-form-item label="文件哈希(完整性校验)" prop="fileHash">
          <el-input
            v-model="form.fileHash"
            placeholder="文件的MD5或SHA256哈希值"
          />
        </el-form-item>
        <el-form-item label="访问控制" prop="accessControl">
          <el-input
            v-model="form.accessControl"
            placeholder="如: engineering/manufacturing, public"
          />
        </el-form-item>
      </div>

      <!-- 类别 -扩展信息 -->
      <div v-show="selectedForm === 't-extend'">
        <el-form-item label="自定义标签" prop="customTags">
          <el-input
            v-model="form.customTags"
            placeholder="使用逗号分隔多个标签"
          />
          <div class="text-[12px] text-[#71717a]">
            例如: safety,chemicals,msds
          </div>
        </el-form-item>
        <el-form-item label="标准/法规编号" prop="standardNumber">
          <el-input
            v-model="form.standardNumber"
            placeholder="如: GB/T 16483-2008, ISO 9001:2015"
          />
        </el-form-item>
        <el-form-item label="入库时间" prop="storageTime">
          <el-date-picker
            v-model="form.storageTime"
            type="datetime"
            format="YYYY/MM/DD HH:mm"
            placeholder="年/月/日 --:--"
          />
        </el-form-item>
        <el-form-item label="扩展元数据" prop="extendedData">
          <el-input
            v-model="form.extendedData"
            type="textarea"
            placeholder='{"key": "value"}'
          />
          <div class="text-[12px] text-[#71717a]">输入有效的JSON格式数据</div>
        </el-form-item>
      </div>

      <!-- 提交按钮 -->
      <el-form-item>
        <div class="w-[100%] mt-[20px] flex justify-end">
          <el-button size="large" @click="handleCancel">取消</el-button>
          <el-button size="large" type="primary" @click="handleSave"
            >保存</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-radio-button__inner) {
  padding-right: 25px;
  padding-left: 25px;
  font-size: 14px;
  font-weight: bold;
  color: #09090b;
}

:deep(.el-form-item__label) {
  color: #09090b;
}
</style>
