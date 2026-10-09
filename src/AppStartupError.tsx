import { Root } from "src/AppStartupError.styled";
import { NoResultsIcon } from "src/shared/ui/icons/NoResultsIcon";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { Typography } from "src/shared/ui/ui-kit/Typography";

export const AppStartupError = () => (
  <Root direction="column" align="center" justify="center">
    <Flex direction="column" align="center" gap="md">
      <NoResultsIcon />

      <Flex direction="column" align="center" gap="xs">
        <Typography as="h1" variant="title">
          Couldn’t load demo data
        </Typography>

        <Typography color="secondary" variant="bodyText">
          The demo API failed to start. Please reload the page and try again.
        </Typography>
      </Flex>

      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </Flex>
  </Root>
);
