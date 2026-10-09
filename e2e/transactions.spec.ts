import { expect, test } from "@playwright/test";

test("creates a transaction through the browser", async ({ page }) => {
  const transactionTitle = "Playwright test";

  await page.goto("/");

  await expect(
    page.getByRole("banner").getByText("Overview", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add transaction" }).click();

  const dialog = page.getByRole("dialog");

  await dialog.getByLabel("Title").fill(transactionTitle);
  await dialog.getByLabel("Amount").fill("4.50");
  await dialog.getByLabel("Category").click();
  await page.getByRole("option", { name: "Food" }).click();
  await dialog.getByRole("button", { name: "Add transaction" }).click();

  await expect(dialog).not.toBeVisible();
  await page.getByRole("link", { name: "Transactions" }).click();

  await expect(page).toHaveURL(/\/transactions$/);
  await expect(page.getByText(transactionTitle)).toBeVisible();
});
