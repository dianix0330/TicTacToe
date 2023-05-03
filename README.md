```
/**
 * Date: 04/25/2022
 *
 * The source code contained in this listing is proprietary to
 * Great-West Financial
 *
 * Unauthorized copying, adaptation, distribution,
 * use, or display is strictly prohibited.
 * This software is Copyright 2022 Great-West Financial
 */
/**
 * @author Jacob George
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { ServiceApi } from "common-ts-types";
import { logger, appProperties, serviceBuilder } from "common-react-utils";
import { auth } from "../../auth/AuthProvider";

export interface GroupAccount {
  gaId?: string;
  planName?: string;
  description?: string;
  status?: string;
}

type GroupAccountResponse = { groupAccounts: GroupAccount[] };

enum TAGS {
  GroupAccounts = "GroupAccounts",
}

const service: ServiceApi = serviceBuilder.build("groupAccountsApi", {
  baseUrl: appProperties.getProperty("SERVICE_BASE_URL") as string,
});
const getList = (result) => {
  return result ? result.groupAccounts : undefined;
};

export const groupAccountApi = createApi({
  reducerPath: "groupAccountApi",
  baseQuery: auth.getBaseQuery(true),
  tagTypes: [TAGS.GroupAccounts],
  endpoints: (build) => ({
    getGroupAccounts: build.query<GroupAccountResponse, void>({
      query: () => {
        const api = service.methods.get();
        return { url: api.url, method: api.method };
      },
      providesTags: (result) => {
        const list = getList(result);
        return list
          ? [
              ...list.map(({ id }) => ({
                type: TAGS.GroupAccounts as const,
                id,
              })),
              { type: TAGS.GroupAccounts, id: "LIST" },
            ]
          : [{ type: TAGS.GroupAccounts, id: "LIST" }];
      },
    }),
    addGroupAccount: build.mutation<GroupAccount, Partial<GroupAccount>>({
      query: (body) => {
        logger.debug("addGroupAccount:", body);
        const api = service.methods.post();
        return { url: api.url, method: api.method, body };
      },
      invalidatesTags: [{ type: TAGS.GroupAccounts, id: "LIST" }],
    }),
    getGroupAccount: build.query<GroupAccount, string>({
      query: () => {
        const api = service.methods.get();
        return { url: api.url, method: api.method };
      },
      providesTags: (result, error, id) => [{ type: TAGS.GroupAccounts, id }],
    }),
    updateGroupAccount: build.mutation<
      void,
      Pick<GroupAccount, "gaId"> & Partial<GroupAccount>
    >({
      query: ({ gaId, ...patch }) => {
        const api = service.methods.put();
        return { url: api.url, method: api.method, body: patch };
      },
      invalidatesTags: (result, error, { gaId }) => [
        { type: TAGS.GroupAccounts, gaId },
      ],
    }),
    deleteGroupAccount: build.mutation<
      { success: boolean; id: number },
      number
    >({
      query: (id) => {
        const api = service.methods.delete();
        return { url: api.url, method: api.method };
      },
      invalidatesTags: (result, error, id) => [
        { type: TAGS.GroupAccounts, id },
      ],
    }),
  }),
});

export const {
  useGetGroupAccountsQuery,
  useGetGroupAccountQuery,
  useAddGroupAccountMutation,
  useUpdateGroupAccountMutation,
  useDeleteGroupAccountMutation,
} = groupAccountApi;

```
