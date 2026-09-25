import { useNavigate } from "react-router-dom";

import { NotFoundIcon, Root } from "src/pages/not-found/NotFoundPage.styled";
import { PageLayout } from "src/shared/layout/PageLayout";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { Typography } from "src/shared/ui/ui-kit/Typography";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout title="Page not found" actions={null}>
      <Root direction="column" align="center" justify="center" gap="md">
        <NotFoundIcon />

        <Flex direction="column" align="center" gap="xs">
          <Typography as="h1" variant="pageTitle">
            Page not found
          </Typography>

          <Typography color="secondary" variant="bodyText">
            We couldn’t find the page you’re looking for.
          </Typography>
        </Flex>

        <Button onClick={() => navigate("/")}>Back to overview</Button>
      </Root>
    </PageLayout>
  );
};
