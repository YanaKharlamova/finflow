import type { ReactNode } from "react";
import {
  TypographyText,
  type TypographyColor,
  type TypographyVariant,
} from "src/shared/ui/ui-kit/Typography.styled";

type TypographyProps = {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: "p" | "span" | "label" | "h1" | "h2" | "h3";
  htmlFor?: string;
  id?: string;
  shimmer?: boolean;
  children: ReactNode;
};

export const Typography = ({
  variant = "pageTitle",
  color = "primary",
  as,
  htmlFor,
  children,
  id,
  shimmer = false,
}: TypographyProps) => (
  <TypographyText
    id={id}
    as={as}
    aria-hidden={shimmer || undefined}
    {...(as === "label" ? { htmlFor } : {})}
    $variant={variant}
    $color={color}
    $shimmer={shimmer}
  >
    {children}
  </TypographyText>
);
