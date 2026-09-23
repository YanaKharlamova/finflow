import styled from "styled-components";
import type { theme } from "src/shared/styles/theme";

export type FlexDirection = "row" | "column";
export type FlexAlignment = "stretch" | "center" | "flex-start" | "flex-end";
export type FlexJustify =
  FlexAlignment | "space-between" | "space-around" | "space-evenly";
export type FlexGap = keyof typeof theme.spacing;

type Props = {
  $direction: FlexDirection;
  $align: FlexAlignment;
  $justify: FlexJustify;
  $gap?: FlexGap;
};

export const FlexStyled = styled.div<Props>`
  min-width: 0;
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  gap: ${({ theme, $gap }) => ($gap ? theme.spacing[$gap] : 0)};
`;
