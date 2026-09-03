import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Root } from "src/pages/overview/OverviewCard.styled";
import type { ReactNode } from "react";
import { Badge } from "src/shared/ui/ui-kit/Badge";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import type { TypographyColor } from "src/shared/ui/ui-kit/Typography.styled";

type Props = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  badgeText?: string;
  amount: string;
  currency: string;
  cardAccent?: TypographyColor;
};

export const OverviewCard = ({
  icon,
  title,
  badgeText,
  subtitle,
  amount,
  currency,
  cardAccent = "primary",
}: Props) => {
  return (
    <Root direction="column" gap="md">
      <Flex justify="space-between" align="flex-start">
        <Flex align="center" gap="sm">
          {icon}
          <Typography color="secondary" variant="subtitle">
            {title}
          </Typography>
        </Flex>

        {badgeText ? <Badge variant="tertiary">{badgeText}</Badge> : null}
      </Flex>

      <Flex direction="column" gap="sm" justify="space-between">
        <Typography variant="pageTitleSm" color={cardAccent}>
          {amount} {currency}
        </Typography>
        <Typography variant="caption" color="secondary">
          {subtitle}
        </Typography>
      </Flex>
    </Root>
  );
};
