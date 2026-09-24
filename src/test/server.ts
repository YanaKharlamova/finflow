import { setupServer } from "msw/node";
import { handlers } from "src/mocks/data/handlers/handlers";

export const server = setupServer(...handlers);
