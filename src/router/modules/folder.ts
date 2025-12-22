// import { $t } from "@/plugins/i18n";
// import { isDevEnv } from "@/utils/debug";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/folder",
    name: "FolderLayout",
    redirect: "/folder/index",
    component: Layout,
    meta: {
      icon: "ep/folder-add",
      title: "文档类型管理",
      // showLink: ,
      rank: 20
    },
    children: [
      {
        path: "/folder/index",
        name: "Folder",
        component: () => import("@/views/folder/index.vue"),
        meta: {
          title: "文档类型管理",
          icon: "ep/folder-add"
        }
      }
    ]
  },
  {
    path: "/gbi",
    name: "GBILayout",
    redirect: "/gbi/basicData",
    component: Layout,
    meta: {
      icon: "pd/gbi",
      title: "问数配置",
      // showLink: ,
      rank: 21
    },
    children: [
      {
        path: "/gbi/basicData",
        name: "GBIBasicData",
        component: () => import("@/views/gbi/basicData/index.vue"),
        meta: {
          title: "基础数据维护",
          icon: "fluent/window-wrench-32-regular"
        }
      },
      {
        path: "/gbi/businessData",
        name: "GBIBusinessData",
        component: () => import("@/views/gbi/businessData/index.vue"),
        meta: {
          title: "业务数据维护",
          icon: "fluent/window-wrench-32-regular"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
