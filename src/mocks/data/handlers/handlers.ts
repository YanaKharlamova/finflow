import { transactionsHandlers } from "src/mocks/data/handlers/transactionsHandlers";
import { overviewHandlers } from "src/mocks/data/handlers/overviewHandlers";

export const handlers = [...transactionsHandlers, ...overviewHandlers];
