import { setupWorker } from "msw/browser";
import { transactionsHandlers } from "src/mocks/data/handlers/transactionsHandlers";

export const worker = setupWorker(...transactionsHandlers);
