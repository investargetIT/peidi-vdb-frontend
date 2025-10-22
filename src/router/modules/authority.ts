import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/authority",
    name: "AuthorityLayout",
    redirect: "/authority/index",
    component: Layout,
    meta: {
      icon: "ri/settings-3-line",
      title: $t("pd.menus.authority"),
      showLink: true,
      rank: 100
    },
    children: [
      {
        path: "/authority/index",
        name: "Authority",
        component: () => import("@/views/authority/index.vue"),
        meta: {
          title: $t("pd.menus.authority"),
          icon: "ri/settings-3-line"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
