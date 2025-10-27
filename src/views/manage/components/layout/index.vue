<script setup lang="ts"></script>

<template>
  <div class="peidi-manage-layout-container">
    <!-- 左侧内容区 -->
    <div class="peidi-manage-layout-left">
      <slot name="left" />
    </div>
    <!-- 右侧内容区 -->
    <div class="peidi-manage-layout-right">
      <slot name="right" />
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
    width: 30%;
    height: 100%;
    padding-left: 20px;
    background-color: chartreuse;
  }
}
</style>
