import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/manage",
    name: "ManageLayout",
    redirect: "/manage/productDocumentation",
    component: Layout,
    meta: {
      icon: "ri/folder-5-line",
      title: $t("pd.menus.vectorDatabaseManage"),
      showLink: true,
      rank: 10
    },
    children: [
      {
        path: "/manage/productDocumentation",
        name: "ManageProductDocumentation",
        component: () => import("@/views/manage/productDocumentation.vue"),
        meta: {
          title: $t("pd.menus.productDocumentation"),
          icon: "ri/folder-line"
        }
      },
      {
        path: "/manage/peidiDocumentation",
        name: "ManagePeidiDocumentation",
        component: () => import("@/views/manage/productDocumentation.vue"),
        meta: {
          title: $t("pd.menus.peidiDocumentation"),
          icon: "ri/folder-line"
        }
      },
      {
        path: "/manage/detectAndTagReport",
        name: "ManageDetectAndTagReport",
        component: () => import("@/views/manage/productDocumentation.vue"),
        meta: {
          title: $t("pd.menus.detectAndTagReport"),
          icon: "ri/folder-line"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
