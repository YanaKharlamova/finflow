import { createBrowserRouter } from "react-router-dom";

import { NotFoundPage } from "src/pages/not-found/NotFoundPage";
import { AppLayout } from "src/shared/layout/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { OverviewPage } =
            await import("src/pages/overview/OverviewPage");

          return { Component: OverviewPage };
        },
      },
      {
        path: "transactions",
        lazy: async () => {
          const { TransactionsPage } =
            await import("src/pages/transactions/TransactionsPage");

          return { Component: TransactionsPage };
        },
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
