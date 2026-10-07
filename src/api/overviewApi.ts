import { baseApi } from "src/api/baseApi";
import type { OverviewData, PeriodValue } from "src/pages/overview/types";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<OverviewData, PeriodValue>({
      query: (period) => ({
        url: "/overview",
        params: { period },
      }),
      providesTags: [{ type: "Overview", id: "LIST" }],
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
