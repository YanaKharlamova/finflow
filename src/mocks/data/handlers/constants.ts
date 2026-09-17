import type { Currency, Transaction } from "src/shared/types/transaction";
import { SEED_TRANSACTIONS } from "src/mocks/data/seedTransactions";

export const FIRST_PAGE = 1;
export const DEFAULT_CURRENCY: Currency = "USD";
export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const transactions: Transaction[] = [...SEED_TRANSACTIONS];
