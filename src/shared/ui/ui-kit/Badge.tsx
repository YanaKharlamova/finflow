import type { HTMLAttributes } from "react";
import {
  BadgeStyled,
  type BadgeVariant,
} from "src/shared/ui/ui-kit/Badge.styled";

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export const Badge = ({ variant = "primary", ...props }: Props) => (
  <BadgeStyled $variant={variant} {...props} />
);
