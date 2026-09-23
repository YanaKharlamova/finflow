import { forwardRef, type ButtonHTMLAttributes } from "react";
import {
  ButtonStyled,
  type ButtonSize,
  type ButtonVariant,
} from "src/shared/ui/ui-kit/Button.styled";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shimmer?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "primary",
      size = "default",
      type = "button",
      shimmer = false,
      disabled,
      ...props
    },
    ref,
  ) => (
    <ButtonStyled
      {...props}
      ref={ref}
      type={type}
      aria-hidden={shimmer || props["aria-hidden"]}
      disabled={shimmer || disabled}
      $variant={variant}
      $size={size}
      $shimmer={shimmer}
    />
  ),
);

Button.displayName = "Button";
