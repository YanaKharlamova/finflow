import { baseApi } from "src/api/baseApi";
import type {
  Transaction,
  TransactionsParams,
  TransactionsResponse,
} from "src/shared/types/transaction";

const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDemoData: builder.mutation<void, void>({
      query: () => ({
        url: "/transactions/demo-data",
        method: "POST",
      }),

      invalidatesTags: (_result, error) =>
        error
          ? []
          : [
              { type: "Transaction", id: "LIST" },
              { type: "Overview", id: "LIST" },
            ],
    }),
    getTransactions: builder.query<TransactionsResponse, TransactionsParams>({
      query: (params) => ({
        url: "/transactions",
        params,
      }),

      providesTags: [{ type: "Transaction", id: "LIST" }],
    }),
    addTransaction: builder.mutation<
      Transaction,
      Omit<Transaction, "id" | "currency" | "amountMinor"> & { amount: number }
    >({
      query: (params) => ({
        url: "/transactions",
        method: "POST",
        body: params,
      }),

      invalidatesTags: [
        { type: "Transaction", id: "LIST" },
        { type: "Overview", id: "LIST" },
      ],
    }),
    deleteTransaction: builder.mutation<void, Transaction["id"]>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [
        { type: "Transaction", id: "LIST" },
        { type: "Overview", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useAddDemoDataMutation,
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
