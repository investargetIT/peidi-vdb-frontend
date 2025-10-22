import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/debug",
    name: "DebugLayout",
    redirect: "/debug/index",
    component: Layout,
    meta: {
      icon: "ri/bug-line",
      title: $t("pd.menus.debug"),
      showLink: true,
      rank: 101
    },
    children: [
      {
        path: "/debug/index",
        name: "Debug",
        component: () => import("@/views/debug/index.vue"),
        meta: {
          title: $t("pd.menus.debug"),
          icon: "ri/bug-line"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
