import {
  ButtonStyled,
  MobileLabel,
  WideLabel,
} from "src/pages/transactions/AddTransactionButton.styled";

export const AddTransactionButton = () => {
  return (
    <ButtonStyled type="button">
      <MobileLabel>+ Add</MobileLabel>
      <WideLabel>Add transaction</WideLabel>
    </ButtonStyled>
  );
};
