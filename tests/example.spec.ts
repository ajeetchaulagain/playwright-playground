import { test as base, expect } from "@playwright/test";
import { TodoPage } from "./todo";

// Extend basic test by providing a "todoPage" fixture.
const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo("item1");
    await todoPage.addToDo("item2");
    await use(todoPage);
    await todoPage.removeAll();
  },
});

test("adds todo", async ({ todoPage }) => {
  // Expect a title "to contain" a substring.
  await todoPage.addToDo("my item");
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
