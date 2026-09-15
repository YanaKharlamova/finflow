import type { ButtonHTMLAttributes } from "react";
import {
  ButtonStyled,
  type ButtonVariant,
} from "src/shared/ui/ui-kit/Button.styled";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  shimmer?: boolean;
};

export const Button = ({
  variant = "primary",
  type = "button",
  shimmer = false,
  disabled,
  ...props
}: Props) => {
  return (
    <ButtonStyled
      {...props}
      type={type}
      aria-hidden={shimmer || props["aria-hidden"]}
      disabled={shimmer || disabled}
      $variant={variant}
      $shimmer={shimmer}
    />
  );
};
