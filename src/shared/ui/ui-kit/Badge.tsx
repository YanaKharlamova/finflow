import type { HTMLAttributes } from "react";
import {
  BadgeStyled,
  type BadgeVariant,
} from "src/shared/ui/ui-kit/Badge.styled";

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  shimmer?: boolean;
};

export const Badge = ({
  variant = "primary",
  shimmer = false,
  ...props
}: Props) => (
  <BadgeStyled
    {...props}
    aria-hidden={shimmer || props["aria-hidden"]}
    $variant={variant}
    $shimmer={shimmer}
  />
);
