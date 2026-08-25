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
  InputContainer,
  InputStyled,
  ErrorMessage,
  ButtonGroup,
} from "src/shared/modals/TransactionModal.styled";
import { CloseIcon } from "src/shared/ui/icons/CloseIcon";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Button } from "src/shared/ui/ui-kit/Button";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import {
  TRANSACTION_TYPES,
  type TransactionType,
} from "src/shared/modals/TransactionModal.constants";

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

  const handleClearForm = () => {
    setTitle("");
    setHasTitleError(false);
    setTransactionType(TRANSACTION_TYPES.expense);
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
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setHasTitleError(true);
      return;
    }

    setHasTitleError(false);
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
              <InputContainer>
                <Typography
                  variant="caption"
                  id="transaction-type-label"
                >
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
              </InputContainer>

              <InputContainer>
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
              </InputContainer>
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
