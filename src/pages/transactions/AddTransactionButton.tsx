import {
  ButtonStyled,
  MobileLabel,
  TabletLabel,
  WideLabel,
} from "src/pages/transactions/AddTransactionButton.styled";

type Props = {
  onModalToggle: (toggleState: boolean) => void;
};

export const AddTransactionButton = ({ onModalToggle }: Props) => {
  return (
    <ButtonStyled
      type="button"
      aria-label="Add transaction"
      onClick={() => onModalToggle(true)}
    >
      <MobileLabel>+</MobileLabel>
      <TabletLabel>+ Add</TabletLabel>
      <WideLabel>Add transaction</WideLabel>
    </ButtonStyled>
  );
};
