<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const rightLoading = ref(true);
const rightLoadingTimer = ref();

onMounted(() => {
  // 来解决右侧内容区加载时的闪烁问题
  rightLoadingTimer.value = setTimeout(() => {
    rightLoading.value = false;
  }, 1000);
});

onUnmounted(() => {
  clearTimeout(rightLoadingTimer.value);
});
</script>

<template>
  <div class="peidi-manage-layout-container">
    <!-- 左侧内容区 -->
    <div class="peidi-manage-layout-left">
      <slot name="left" />
    </div>
    <!-- 右侧内容区 -->
    <div class="peidi-manage-layout-right">
      <!-- 右侧内容区加载中 -->
      <div
        v-if="rightLoading"
        v-loading="rightLoading"
        class="h-[100px]"
        element-loading-background="transparent"
      />
      <!-- 右侧内容区加载完成 -->
      <div v-if="!rightLoading" class="peidi-manage-layout-right-content">
        <el-card shadow="never" class="h-[90vh]">
          <el-scrollbar height="100%">
            <slot name="right" />
          </el-scrollbar>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.peidi-manage-layout-container {
  display: flex;

  .peidi-manage-layout-left {
    width: 70%;
    height: 100%;
  }

  .peidi-manage-layout-right {
    position: relative;
    width: 25%;
    height: 100%;
    padding-left: 20px;

    .peidi-manage-layout-right-content {
      position: fixed;
      width: inherit;
    }
  }
}
</style>
