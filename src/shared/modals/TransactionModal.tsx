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
  Field,
} from "src/shared/modals/TransactionModal.styled";
import { CloseIcon } from "src/shared/ui/icons/CloseIcon";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Input } from "src/shared/ui/ui-kit/Input";
import { Select } from "src/shared/ui/ui-kit/Select";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import {
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
  type Category,
  type TransactionType,
} from "src/shared/modals/constants";
import { SELECT_VARIANTS } from "src/shared/ui/ui-kit/Select.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

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

  const todayStr = new Intl.DateTimeFormat("fr-CA").format(new Date());

  const [transactionDate, setTransactionDate] = useState(todayStr);
  const [transactionDateError, setTransactionDateError] = useState("");

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
    setTransactionDateError("");
  };

  const handleOpenChange = (toggleState: boolean) => {
    onModalToggle(toggleState);

    if (!toggleState) {
      handleClearForm();
    }
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

    return "";
  };

  const getDateError = (value: string) => {
    if (!value) {
      return "Date is required!";
    }

    if (value > todayStr) {
      return "Date cannot be in the future!";
    }

    return "";
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedTitle = title.trim();
    const normalizedAmount = Number(transactionAmount);

    const invalidTitle = !normalizedTitle;
    const amountError = getAmountError(transactionAmount);
    const invalidCategory = !selectedCategory;
    const dateError = getDateError(transactionDate);

    setTransactionAmountError(amountError);
    setHasTitleError(invalidTitle);
    setHasCategoryError(invalidCategory);
    setTransactionDateError(dateError);

    if (invalidTitle || amountError || invalidCategory || dateError) {
      return;
    }

    console.log("normalizedTitle", normalizedTitle);
    console.log("normalizedAmount", normalizedAmount);
    console.log("category", selectedCategory);
    console.log("selected date", transactionDate);
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

  const handleSetTransactionDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

    setTransactionDate(selectedDate);
    setTransactionDateError(getDateError(selectedDate));
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
                <IconButton aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Dialog.Close>
            </ModalHeader>

            <FormContainer
              id="transaction-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <Field>
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
              </Field>

              <Field>
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
                />
              </Field>

              <FieldsRow>
                <Field>
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
                    id="transaction-amount"
                    error={transactionAmountError}
                    value={transactionAmount}
                    onChange={handleSetTransactionAmount}
                    placeholder="$0.0"
                    required
                  />
                </Field>

                <Field>
                  <Typography
                    as="label"
                    htmlFor="transaction-category"
                    variant="caption"
                  >
                    Category
                  </Typography>

                  <Select
                    id="transaction-category"
                    error={
                      hasCategoryError ? "Category is required!" : ""
                    }
                    variant={SELECT_VARIANTS.field}
                    options={CATEGORY_OPTIONS[transactionType]}
                    value={selectedCategory}
                    onValueChange={handleChangeCategory}
                    placeholder={mobile ? "Category" : "Select category"}
                  />
                </Field>
              </FieldsRow>

              <Field>
                <Typography
                  as="label"
                  htmlFor="transaction-date"
                  variant="caption"
                >
                  Date
                </Typography>

                <Input
                  type="date"
                  max={todayStr}
                  id="transaction-date"
                  error={transactionDateError}
                  value={transactionDate}
                  onChange={handleSetTransactionDate}
                  required
                />
              </Field>
            </FormContainer>

            <ButtonGroup>
              <Dialog.Close asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </Dialog.Close>

              <Button type="submit" form="transaction-form">
                Add transaction
              </Button>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
