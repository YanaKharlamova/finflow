import type { ReactNode } from "react";
import { Select as RadixSelect } from "radix-ui";
import {
  ArrowIcon,
  Content,
  Item,
  Trigger,
  Viewport,
  SELECT_VARIANTS,
} from "src/shared/ui/ui-kit/Select.styled";

type SelectOption = {
  value: string;
  label: ReactNode;
};

type Props = {
  options: readonly SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  id?: string;
  variant?: keyof typeof SELECT_VARIANTS;
};

export const Select = ({
  options,
  value,
  onValueChange,
  placeholder,
  ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  id,
  variant = SELECT_VARIANTS.compact,
}: Props) => {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <Trigger
        id={id}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        $variant={variant}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <ArrowIcon />
      </Trigger>

      <RadixSelect.Portal>
        <Content position="popper" side="bottom" align="end" sideOffset={3}>
          <Viewport>
            {options.map((option) => (
              <Item key={option.value} value={option.value}>
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </Item>
            ))}
          </Viewport>
        </Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
