import { formatToken, getToken } from "@/utils/auth";
import { http } from "@/utils/http";

export const commonUrlApi = (url: string) =>
  // `${"http://12.18.1.12:8091"}${url}`;
  `${"https://api.peidigroup.cn"}${url}`;

/** 获取枚举 */
// 枚举 -docStatus -reportType
export const getCommonEnum = (type: "docStatus" | "reportType") => {
  return http.request("get", commonUrlApi("/ai/common/enum"), {
    params: {
      type
    }
  });
};

/** 设置枚举 */
export const postCommonEnum = (data: any) => {
  return http.request("post", commonUrlApi("/ai/common/enum"), {
    data
  });
};

/** 删除枚举 */
export const deleteCommonEnumById = (id: string) => {
  return http.request("delete", commonUrlApi(`/ai/common/enum/${id}`));
};

/** 获取分页 */
export const getMilvusPage = (params: {
  pageNo: number;
  pageSize: number;
  searchStr?: string; // [{"searchName":"reportType","searchType":"equals","searchValue":"检测文档"}]
  sortStr?: string; // [{"sortName":"createAt","sortType":"desc"}]
}) => {
  // mock模拟
  // return http.request<any>("get", "/ai/milvus/page");
  return http.request("get", commonUrlApi("/ai/milvus/page"), {
    params: {
      pageNo: params.pageNo,
      pageSize: params.pageSize,
      searchStr: params.searchStr,
      sortStr: params.sortStr
    }
  });
};

/** 修改知识库 */
export const postMilvusUpdate = (data: Record<string, any>) => {
  return http.request("post", commonUrlApi("/ai/milvus/update"), {
    data
  });
};

/** 删除知识库 */
export const postMilvusDelete = (data: Record<string, any>) => {
  return http.request("post", commonUrlApi("/ai/milvus/delete"), {
    data
  });
};

/** 下载文件 */
export const getCommonDownload = (objectName: string) => {
  return http.request("get", commonUrlApi("/ai/common/download"), {
    params: {
      authorization: formatToken(getToken().accessToken),
      objectName
    }
  });
};

/** 获取文件url */
export const getCommonDownloadUrl = (objectName: string) => {
  return http.request("get", commonUrlApi("/ai/common/download-url"), {
    params: {
      objectName
    }
  });
};

/** 数据总览 */
export const getMilvusDashboard = () => {
  return http.request("get", commonUrlApi("/ai/milvus/dashboard"));
};

/** 获取分页gbi表 */
export const getGbiPage = (params: {
  pageNo: number;
  pageSize: number;
  searchStr?: string;
  sortStr?: string;
}) => {
  return http.request("get", commonUrlApi("/ai/gbi/table/page"), {
    params
  });
};

/** 新增gbi表 */
export const postGbiNew = (data: Record<string, any>) => {
  return http.request("post", commonUrlApi("/ai/gbi/table/new"), {
    data
  });
};

/** 修改gbi表 */
export const postGbiUpdate = (data: Record<string, any>) => {
  return http.request("post", commonUrlApi("/ai/gbi/table/update"), {
    data
  });
};

/** 删除gbi表 */
export const postGbiDelete = (data: Record<string, any>) => {
  return http.request("post", commonUrlApi("/ai/gbi/table/delete"), {
    data
  });
};

/** 分页业务逻辑解释 */
export const getGbiExplainPage = (params: {
  pageNo: number;
  pageSize: number;
  searchStr?: string;
  sortStr?: string;
}) => {
  return http.request("get", commonUrlApi("/ai/gbi/explain/page"), {
    params
  });
};

/** 新增业务逻辑解释 */
export const postGbiExplainNew = (data: Record<string, any>) => {
  return http.request("post", commonUrlApi("/ai/gbi/explain/new"), {
    data
  });
};

/** 修改业务逻辑解释 */
export const postGbiExplainUpdate = (data: Record<string, any>) => {
  return http.request("post", commonUrlApi("/ai/gbi/explain/update"), {
    data
  });
};

/** 删除业务逻辑解释 */
export const postGbiExplainDelete = (data: Record<string, any>) => {
  return http.request("post", commonUrlApi("/ai/gbi/explain/delete"), {
    data
  });
};
