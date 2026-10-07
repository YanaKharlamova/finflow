import { setupWorker } from "msw/browser";

import { handlers } from "src/mocks/data/handlers/handlers";

export const worker = setupWorker(...handlers);
