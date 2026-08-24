import {
  ButtonStyled,
  MobileLabel,
  TabletLabel,
  WideLabel,
} from "src/pages/transactions/AddTransactionButton.styled";

export const AddTransactionButton = () => {
  return (
    <ButtonStyled type="button">
      <MobileLabel>+</MobileLabel>
      <TabletLabel>+ Add</TabletLabel>
      <WideLabel>Add transaction</WideLabel>
    </ButtonStyled>
  );
};
