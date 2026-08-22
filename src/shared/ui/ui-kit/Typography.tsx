import type { ReactNode } from "react";
import {
  TypographyText,
  type TypographyVariant,
} from "src/shared/ui/ui-kit/Typography.styled";

type TypographyProps = {
  variant?: TypographyVariant;
  children: ReactNode;
};

export const Typography = ({
  variant = "pageTitle",
  children,
}: TypographyProps) => {
  return <TypographyText $variant={variant}>{children}</TypographyText>;
};
