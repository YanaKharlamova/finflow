import type { ComponentPropsWithoutRef } from "react";
import { ErrorMessage } from "src/shared/ui/ui-kit/FormControl.styled";
import { InputStyled } from "src/shared/ui/ui-kit/Input.styled";

type Props = ComponentPropsWithoutRef<"input"> & {
  error?: string;
  reserveErrorSpace?: boolean;
};

export const Input = ({ error, reserveErrorSpace, id, ...props }: Props) => {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <>
      <InputStyled
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />

      {error || reserveErrorSpace ? (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      ) : null}
    </>
  );
};
