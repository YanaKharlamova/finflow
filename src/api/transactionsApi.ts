import { baseApi } from "src/api/baseApi";
import type {
  TransactionsParams,
  TransactionsResponse,
} from "src/shared/types/transaction";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionsResponse, TransactionsParams>({
      query: (params) => ({
        url: "/transactions",
        params,
      }),

      providesTags: [{ type: "Transaction", id: "LIST" }],
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
