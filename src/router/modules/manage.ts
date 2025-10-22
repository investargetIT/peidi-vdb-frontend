import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/manage",
    name: "ManageLayout",
    redirect: "/manage/index",
    component: Layout,
    meta: {
      icon: "ri/folder-5-line",
      title: $t("pd.menus.manage"),
      showLink: true,
      rank: 10
    },
    children: [
      {
        path: "/manage/index",
        name: "Manage",
        component: () => import("@/views/manage/index.vue"),
        meta: {
          title: $t("pd.menus.manage"),
          icon: "ri/folder-5-line"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
