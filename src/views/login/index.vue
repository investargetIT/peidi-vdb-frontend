<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { message } from "@/utils/message";

const router = useRouter();
const { t } = useI18n();

onMounted(() => {
  useUserStoreHook()
    .loginByUsername({
      username: "admin",
      password: "admin123"
    })
    .then(res => {
      if (res.success) {
        // 获取后端路由
        return initRouter().then(() => {
          router.push(getTopMenu(true).path).then(() => {
            message(t("login.pureLoginSuccess"), { type: "success" });
          });
        });
      } else {
        message(t("login.pureLoginFail"), { type: "error" });
      }
    });
});
</script>

<template>
  <div class="peidi-login-container">
    <div class="pridi-loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.peidi-login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @keyframes loading-shake {
    0% {
      transform: rotate(-5deg);
    }

    15% {
      transform: rotate(8deg);
    }

    30% {
      transform: rotate(-7deg);
    }

    45% {
      transform: rotate(6deg);
    }

    60% {
      transform: rotate(-4deg);
    }

    75% {
      transform: rotate(3deg);
    }

    90% {
      transform: rotate(-2deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  .pridi-loader {
    width: 200px;
    height: 200px;
    background-image: url("@/assets/login/loading.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transform-origin: center center;
    animation: loading-shake 1.5s ease-in-out infinite;
  }
}
</style>
