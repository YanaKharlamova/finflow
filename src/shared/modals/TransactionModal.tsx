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
  InputStyled,
  ErrorMessage,
  ButtonGroup,
  FieldsRow,
  Field,
} from "src/shared/modals/TransactionModal.styled";
import { CloseIcon } from "src/shared/ui/icons/CloseIcon";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Select } from "src/shared/ui/ui-kit/Select";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import {
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
  type Category,
  type TransactionType,
} from "src/shared/modals/constants";
import { SELECT_VARIANTS } from "src/shared/ui/ui-kit/Select.styled";

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

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedTitle = title.trim();
    const normalizedAmount = Number(transactionAmount);

    const invalidTitle = !normalizedTitle;
    const amountError = getAmountError(transactionAmount);
    const invalidCategory = !selectedCategory;

    setTransactionAmountError(amountError);
    setHasTitleError(invalidTitle);
    setHasCategoryError(invalidCategory);

    if (invalidTitle || amountError || invalidCategory) {
      return;
    }

    setHasTitleError(false);
    setTransactionAmountError("");
    setHasCategoryError(false);

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

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category as Category);
    setHasCategoryError(false);
  };

  const handleSetTransactionDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

    setTransactionDate(selectedDate);
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

                <InputStyled
                  id="transaction-title"
                  aria-invalid={hasTitleError}
                  aria-describedby={hasTitleError ? "title-error" : undefined}
                  value={title}
                  onChange={handleSetTitle}
                  placeholder={
                    transactionType === TRANSACTION_TYPES.expense
                      ? "e.g. Grocery shopping"
                      : "e.g. Monthly salary"
                  }
                  required
                />

                {hasTitleError ? (
                  <ErrorMessage id="title-error" role="alert">
                    Title is required!
                  </ErrorMessage>
                ) : null}
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

                  <InputStyled
                    type="number"
                    inputMode="decimal"
                    id="transaction-amount"
                    aria-invalid={Boolean(transactionAmountError)}
                    aria-describedby={
                      transactionAmountError ? "amount-error" : undefined
                    }
                    value={transactionAmount}
                    onChange={handleSetTransactionAmount}
                    placeholder="$0.0"
                    required
                  />

                  {transactionAmountError ? (
                    <ErrorMessage id="amount-error" role="alert">
                      {transactionAmountError}
                    </ErrorMessage>
                  ) : null}
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
                    aria-describedby={
                      hasCategoryError ? "category-error" : undefined
                    }
                    variant={SELECT_VARIANTS.field}
                    options={CATEGORY_OPTIONS[transactionType]}
                    value={selectedCategory}
                    onValueChange={handleChangeCategory}
                    placeholder="Select category"
                  />

                  {hasCategoryError ? (
                    <ErrorMessage id="category-error" role="alert">
                      Category is required!
                    </ErrorMessage>
                  ) : null}
                </Field>
              </FieldsRow>

              <Field>
                <InputStyled
                  type="date"
                  id="transaction-date"
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
