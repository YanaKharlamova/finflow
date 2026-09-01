import type { HTMLAttributes } from "react";
import {
  FlexStyled,
  type FlexAlignment,
  type FlexDirection,
  type FlexGap,
  type FlexJustify,
} from "src/shared/ui/ui-kit/Flex.styled";

type Props = HTMLAttributes<HTMLDivElement> & {
  direction?: FlexDirection;
  align?: FlexAlignment;
  justify?: FlexJustify;
  gap?: FlexGap;
};

export const Flex = ({
  direction = "row",
  align = "stretch",
  justify = "flex-start",
  gap,
  ...props
}: Props) => (
  <FlexStyled
    $direction={direction}
    $align={align}
    $justify={justify}
    $gap={gap}
    {...props}
  />
);
