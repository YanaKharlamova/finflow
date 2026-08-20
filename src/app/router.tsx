import { createBrowserRouter } from "react-router-dom";

import { NotFoundPage } from "src/pages/not-found/NotFoundPage";
import { OverviewPage } from "src/pages/overview/OverviewPage";
import { TransactionsPage } from "src/pages/transactions/TransactionsPage";
import { AppLayout } from "src/shared/layout/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
