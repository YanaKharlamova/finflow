import type { ReactNode } from "react";
import { Select as RadixSelect } from "radix-ui";
import { ErrorMessage } from "src/shared/ui/ui-kit/FormControl.styled";
import {
  ArrowIcon,
  Content,
  Item,
  Trigger,
  Viewport,
  SELECT_VARIANTS,
} from "src/shared/ui/ui-kit/Select.styled";

type SelectOption<Value extends string> = {
  value: Value;
  label: ReactNode;
};

type Props<Value extends string> = {
  options: readonly SelectOption<Value>[];
  value?: Value | "";
  onValueChange: (value: Value) => void;
  placeholder?: string;
  ariaLabel?: string;
  error?: string;
  reserveErrorSpace?: boolean;
  id?: string;
  variant?: keyof typeof SELECT_VARIANTS;
};

export const Select = <Value extends string>({
  options,
  value,
  onValueChange,
  placeholder,
  ariaLabel,
  error,
  reserveErrorSpace,
  id,
  variant = SELECT_VARIANTS.compact,
}: Props<Value>) => {
  const errorId = id ? `${id}-error` : undefined;

  const handleChange = (nextValue: string) => {
    onValueChange(nextValue as Value);
  };

  return (
    <>
      <RadixSelect.Root value={value} onValueChange={handleChange}>
        <Trigger
          id={id}
          aria-label={ariaLabel}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
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

      {error || reserveErrorSpace ? (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      ) : null}
    </>
  );
};
