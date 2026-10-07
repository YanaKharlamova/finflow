import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { Button } from "src/shared/ui/ui-kit/Button";

type Props = {
  onModalToggle: (toggleState: boolean) => void;
  fullLabel?: boolean;
};

export const AddTransactionButton = ({
  onModalToggle,
  fullLabel = false,
}: Props) => {
  const compact = useMediaQuery(`(width < ${BREAKPOINTS.tabletLg}px)`);

  return (
    <Button
      type="button"
      aria-label="Add transaction"
      onClick={() => onModalToggle(true)}
    >
      {fullLabel || !compact ? "Add transaction" : "+"}
    </Button>
  );
};
