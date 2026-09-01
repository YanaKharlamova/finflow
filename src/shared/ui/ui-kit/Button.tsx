import type { ButtonHTMLAttributes } from "react";
import {
  ButtonStyled,
  type ButtonVariant,
} from "src/shared/ui/ui-kit/Button.styled";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = ({
  variant = "primary",
  type = "button",
  ...props
}: Props) => {
  return <ButtonStyled $variant={variant} type={type} {...props} />;
};
