<script setup lang="ts">
import EpSelect from "~icons/ep/select";

interface BusinessLogicOption {
  label: string;
  value: boolean;
  description: string;
  isRecommend?: boolean;
}

interface Props {
  item: BusinessLogicOption;
  selectedValue?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    class="option-card"
    :class="{
      'option-card-selected': selectedValue === item.value
    }"
  >
    <div class="card-header">
      <div>
        <span class="card-title">{{ item.label }}</span>
        <el-tag v-if="item.isRecommend" type="primary" size="small"
          >推荐</el-tag
        >
      </div>
      <el-icon v-if="selectedValue === item.value" class="check-icon">
        <EpSelect />
      </el-icon>
    </div>
    <div class="card-description">{{ item.description }}</div>
  </div>
</template>

<style lang="scss" scoped>
.option-card {
  padding: 16px;
  margin: 4px;
  cursor: pointer;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.option-card:hover {
  border-color: #2563eb;
  box-shadow: 0 2px 8px rgb(64 158 255 / 10%);
}

.option-card-selected {
  background-color: #2564eb3d;
  box-shadow: 0 2px 8px rgb(64 158 255 / 20%);
}

.option-card-selected .card-title {
  font-weight: 600;
  color: #2563eb;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.card-title {
  margin-right: 8px;
  font-weight: 500;
}

.card-description {
  font-size: 12px;
  line-height: 1.4;
  color: #666;
}

.check-icon {
  color: #2563eb;
}
</style>
