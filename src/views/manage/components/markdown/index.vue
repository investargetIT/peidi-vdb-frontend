<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MARKDOWN_EXAMPLE } from "@/views/debug/markdown/data/markdown";
import Vditor from "vditor";
import "vditor/dist/index.css";

// props
const props = defineProps({
  height: {
    type: Number,
    default: 750
  }
});

const vditor = ref();
function initVditor() {
  vditor.value = new Vditor("pridi-manage-markdown-vditor", {
    mode: "sv",
    height: props.height,
    preview: {
      actions: []
    },
    toolbarConfig: {
      hide: true
    },
    after: () => {
      vditor.value.disabledCache(); // 禁用缓存，否则会导致预览时显示缓存内容
      vditor.value.setValue(MARKDOWN_EXAMPLE);
      const vditorsv: HTMLElement = document.querySelector(
        ".peidi-manage-markdown .vditor-sv"
      );
      vditorsv.style.display = "none";
      const vditorPreview: HTMLElement = document.querySelector(
        ".peidi-manage-markdown .vditor-toolbar"
      );
      vditorPreview.style.display = "none";
    }
  });
}

onMounted(() => {
  initVditor();
});
</script>

<template>
  <div class="peidi-manage-markdown">
    <div id="pridi-manage-markdown-vditor" />
  </div>
</template>
