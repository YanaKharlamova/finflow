import type { ReactNode } from "react";
import {
  TypographyText,
  type TypographyVariant,
} from "src/shared/ui/ui-kit/Typography.styled";

type TypographyProps = {
  variant?: TypographyVariant;
  as?: "p" | "span" | "label";
  htmlFor?: string;
  id?: string;
  children: ReactNode;
};

export const Typography = ({
  variant = "pageTitle",
  as,
  htmlFor,
  children,
  id,
}: TypographyProps) => (
  <TypographyText
    id={id}
    as={as}
    {...(as === "label" ? { htmlFor } : {})}
    $variant={variant}
  >
    {children}
  </TypographyText>
);
