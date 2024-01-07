import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/sign-in.page";
import { Homepage } from "../pages/homepage.page";
import { faker } from "@faker-js/faker";
import { email, password, firstName, lastName } from "../consts/consts";

test.describe("login tests", () => {
  let homepage: Homepage;
  let signInPage: SignInPage;

  const expectedErrorMessage = 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.';

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    signInPage = new SignInPage(page); 
    await page.goto("/");
    homepage.signInButton.click();
  });

  test("successful login", async () => {
    const expectedLoginMessage = `Welcome, ${firstName} ${lastName}!`;

    await signInPage.signIn(email, password);

    await expect(homepage.infoForLoggedIn).toBeVisible({ timeout: 70000 });
    await expect(homepage.infoForLoggedOut).toBeHidden();
    await expect(homepage.infoForLoggedIn).toHaveText(expectedLoginMessage);
  });

  test("unsuccessful login with invalid email", async () => {
    const invalidEmail = faker.internet.email();

    await signInPage.signIn(invalidEmail, password);

    await expect(homepage.alertMessage).toBeVisible({ timeout: 70000 });
    await expect(homepage.alertMessage).toHaveText(expectedErrorMessage);
  });

  test("unsuccessful login with invalid password", async ({ page }) => {
    const invalidPassword = `${password}1`;

    await signInPage.signIn(email, invalidPassword);

    await expect(homepage.alertMessage).toBeVisible({ timeout: 70000 });
    await expect(homepage.alertMessage).toHaveText(expectedErrorMessage);
  });
});
