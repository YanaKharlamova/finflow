import { Dialog } from "radix-ui";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  IconButton,
  ModalHeader,
  FormContainer,
  SelectionContainer,
  SelectionItem,
  ButtonGroup,
  FieldsRow,
} from "src/shared/modals/TransactionModal.styled";
import { CloseIcon } from "src/shared/ui/icons/CloseIcon";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Input } from "src/shared/ui/ui-kit/Input";
import { DateInput } from "src/shared/ui/ui-kit/DateInput";
import { Select } from "src/shared/ui/ui-kit/Select";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useAddTransactionMutation } from "src/api/transactionsApi";

import {
  AMOUNT_PATTERN,
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
} from "src/shared/modals/constants";
import { SELECT_VARIANTS } from "src/shared/ui/ui-kit/Select.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import type { Category, TransactionType } from "src/shared/types/transaction";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { formatLocalDate } from "src/shared/helpers/formatLocalDate";
import { isValidTransactionDate } from "src/shared/helpers/isValidTransactionDate";

type Props = {
  open: boolean;
  onModalToggle: (open: boolean) => void;
};

export const TransactionModal = ({ open, onModalToggle }: Props) => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TRANSACTION_TYPES.expense,
  );
  const [title, setTitle] = useState("");
  const [hasTitleError, setHasTitleError] = useState(false);

  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionAmountError, setTransactionAmountError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [hasCategoryError, setHasCategoryError] = useState(false);

  const todayStr = formatLocalDate(new Date());

  const [transactionDate, setTransactionDate] = useState(todayStr);

  const [addTransaction, { isError, isLoading, reset }] =
    useAddTransactionMutation();

  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  const handleClearForm = () => {
    setTitle("");
    setHasTitleError(false);
    setTransactionType(TRANSACTION_TYPES.expense);
    setTransactionAmount("");
    setTransactionAmountError("");
    setSelectedCategory("");
    setHasCategoryError(false);
    setTransactionDate(todayStr);
  };

  const closeModal = () => {
    onModalToggle(false);
    handleClearForm();
    reset();
  };

  const handleOpenChange = (toggleState: boolean) => {
    if (!toggleState) {
      if (!isLoading) {
        closeModal();
      }

      return;
    }

    onModalToggle(true);
  };

  const handleSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const nextTitle = e.target.value;

    setTitle(nextTitle);

    if (hasTitleError && nextTitle.trim()) {
      setHasTitleError(false);
    }
  };

  const handleTypeChange = (type: string) => {
    setTransactionType(type as TransactionType);
    setSelectedCategory("");
    setHasCategoryError(false);
  };

  const getAmountError = (value: string) => {
    const amount = Number(value);

    if (!value) {
      return "Amount is required";
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return "Enter a positive amount";
    }

    if (!AMOUNT_PATTERN.test(value)) {
      return "Use up to 2 decimal places";
    }

    return "";
  };

  const getDateError = (value: string) => {
    if (!value) {
      return "Date is required!";
    }

    if (!isValidTransactionDate(value)) {
      return "Enter a valid date!";
    }

    if (value > todayStr) {
      return "Date cannot be in the future!";
    }

    return "";
  };

  const transactionDateError = getDateError(transactionDate);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedTitle = title.trim();
    const normalizedAmount = Number(transactionAmount);

    const invalidTitle = !normalizedTitle;
    const amountError = getAmountError(transactionAmount);
    const invalidCategory = !selectedCategory;

    setTransactionAmountError(amountError);
    setHasTitleError(invalidTitle);
    setHasCategoryError(invalidCategory);

    if (
      invalidTitle ||
      amountError ||
      invalidCategory ||
      transactionDateError
    ) {
      return;
    }

    try {
      await addTransaction({
        title: normalizedTitle,
        amount: normalizedAmount,
        category: selectedCategory,
        date: transactionDate,
        type: transactionType,
      }).unwrap();

      closeModal();
    } catch {
      return;
    }
  };

  const handleSetTransactionAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const newAmountInput = e.currentTarget.value;

    setTransactionAmount(newAmountInput);

    const error = getAmountError(newAmountInput);
    setTransactionAmountError(error);
  };

  const handleChangeCategory = (category: Category) => {
    setSelectedCategory(category);
    setHasCategoryError(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                <Typography variant="title">Add transaction</Typography>
              </ModalTitle>

              <Dialog.Close asChild>
                <IconButton aria-label="close" disabled={isLoading}>
                  <CloseIcon />
                </IconButton>
              </Dialog.Close>
            </ModalHeader>

            <FormContainer
              id="transaction-form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Flex direction="column" gap="xs">
                <Typography variant="caption" id="transaction-type-label">
                  Type
                </Typography>

                <SelectionContainer
                  value={transactionType}
                  onValueChange={handleTypeChange}
                  orientation="horizontal"
                  aria-labelledby="transaction-type-label"
                >
                  <SelectionItem value={TRANSACTION_TYPES.income}>
                    <Typography variant="bodyText">Income</Typography>
                  </SelectionItem>

                  <SelectionItem value={TRANSACTION_TYPES.expense} $danger>
                    <Typography variant="bodyText">Expense</Typography>
                  </SelectionItem>
                </SelectionContainer>
              </Flex>

              <Flex direction="column" gap="xs">
                <Typography
                  as="label"
                  htmlFor="transaction-title"
                  variant="caption"
                >
                  Title
                </Typography>

                <Input
                  id="transaction-title"
                  error={hasTitleError ? "Title is required!" : ""}
                  value={title}
                  onChange={handleSetTitle}
                  placeholder={
                    transactionType === TRANSACTION_TYPES.expense
                      ? "e.g. Grocery shopping"
                      : "e.g. Monthly salary"
                  }
                  required
                  reserveErrorSpace
                />
              </Flex>

              <FieldsRow>
                <Flex direction="column" gap="xs">
                  <Typography
                    as="label"
                    htmlFor="transaction-amount"
                    variant="caption"
                  >
                    Amount
                  </Typography>

                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    id="transaction-amount"
                    error={transactionAmountError}
                    value={transactionAmount}
                    onChange={handleSetTransactionAmount}
                    placeholder="$0.0"
                    required
                    reserveErrorSpace
                  />
                </Flex>

                <Flex direction="column" gap="xs">
                  <Typography
                    as="label"
                    htmlFor="transaction-category"
                    variant="caption"
                  >
                    Category
                  </Typography>

                  <Select
                    id="transaction-category"
                    error={hasCategoryError ? "Category is required!" : ""}
                    variant={SELECT_VARIANTS.field}
                    options={CATEGORY_OPTIONS[transactionType]}
                    value={selectedCategory}
                    onValueChange={handleChangeCategory}
                    placeholder={mobile ? "Category" : "Select category"}
                    reserveErrorSpace
                  />
                </Flex>
              </FieldsRow>

              <Flex direction="column" gap="xs">
                <Typography
                  as="label"
                  htmlFor="transaction-date"
                  variant="caption"
                >
                  Date
                </Typography>

                <DateInput
                  id="transaction-date"
                  error={transactionDateError}
                  value={transactionDate}
                  onValueChange={setTransactionDate}
                  required
                  reserveErrorSpace
                />
              </Flex>
            </FormContainer>

            <Flex aria-live="polite" justify="center">
              {isError ? (
                <Typography color="danger" variant="caption">
                  Something went wrong! Please try again.
                </Typography>
              ) : null}
            </Flex>

            <ButtonGroup gap="xs">
              <Dialog.Close asChild>
                <Button type="button" variant="secondary" disabled={isLoading}>
                  Cancel
                </Button>
              </Dialog.Close>

              <Button
                type="submit"
                form="transaction-form"
                disabled={isLoading}
              >
                Add transaction
              </Button>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
