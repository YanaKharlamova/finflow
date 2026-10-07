import { useState } from "react";
import { Popover } from "radix-ui";
import {
  useAddDemoDataMutation,
  useGetTransactionsQuery,
} from "src/api/transactionsApi";
import {
  DemoDataButtonGroup,
  DemoDataPopoverContent,
} from "src/shared/layout/PageHeader.styled";
import { InfoIcon } from "src/shared/ui/icons/InfoIcon";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Typography } from "src/shared/ui/ui-kit/Typography";

type Props = {
  compact: boolean;
};

export const DemoDataAction = ({ compact }: Props) => {
  const [infoOpen, setInfoOpen] = useState(false);

  const { data, isFetching: transactionsFetching } = useGetTransactionsQuery({
    page: 1,
    limit: 1,
  });
  const [addDemoData, { isLoading: demoDataLoading, isError }] =
    useAddDemoDataMutation();

  const hasTransactions = Boolean(data?.total);
  const showError = isError && !hasTransactions;

  const loading = demoDataLoading || transactionsFetching || hasTransactions;

  const infoText = showError
    ? "Failed to add demo data. Please try again."
    : hasTransactions
      ? "Demo data is available only when there are no transactions."
      : "Add sample transactions to explore Finflow.";

  const handleAddDemoData = () => {
    setInfoOpen(false);
    addDemoData();
  };

  return (
    <DemoDataButtonGroup role="group" aria-label="Demo data">
      <Button
        size="compact"
        variant="secondary"
        disabled={loading}
        aria-label="Add demo data"
        aria-busy={demoDataLoading}
        onClick={handleAddDemoData}
      >
        {compact ? "Demo" : "Add demo data"}
      </Button>

      <Popover.Root open={infoOpen} onOpenChange={setInfoOpen}>
        <Popover.Trigger asChild>
          <Button
            type="button"
            size="compact"
            variant={showError ? "danger" : "secondary"}
            aria-label="Demo data information"
            aria-invalid={showError}
          >
            <InfoIcon width="16" height="16" />
          </Button>
        </Popover.Trigger>

        <Popover.Portal>
          <DemoDataPopoverContent
            side="bottom"
            align="end"
            sideOffset={8}
            collisionPadding={8}
          >
            <Typography
              as="span"
              variant="caption"
              color={showError ? "danger" : "primary"}
            >
              {infoText}
            </Typography>
          </DemoDataPopoverContent>
        </Popover.Portal>
      </Popover.Root>
    </DemoDataButtonGroup>
  );
};
