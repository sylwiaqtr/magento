import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage.page";
import { RegistrationPage } from "../pages/registration.page";
import { faker } from "@faker-js/faker";
import { email} from "../consts/consts";

test.describe("registration tests", () => {
  let homepage: Homepage;
  let registrationPage: RegistrationPage;

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const unregisteredEmail = `${firstName}${lastName}112@invalid.com`.toLowerCase();
  const password = "Examplepass1234";

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    registrationPage = new RegistrationPage(page);
    await page.goto("/");
    homepage.createAccountButton.click();
  });

  test("successful registration", async () => {
    const expectedLoginMessage = `Welcome, ${firstName} ${lastName}!`;
    const expectedThankYouMessage =
      "Thank you for registering with Main Website Store.";

    await registrationPage.register(firstName, lastName, unregisteredEmail, password);

    await expect(homepage.infoForLoggedIn).toBeVisible({ timeout: 70000 });
    await expect(homepage.infoForLoggedOut).toBeHidden();
    await expect(homepage.infoForLoggedIn).toHaveText(expectedLoginMessage);
    await expect(homepage.alertMessage).toBeVisible();
    await expect(homepage.alertMessage).toHaveText(expectedThankYouMessage);
  });

  test("unsuccessful registration with registered email", async () => {
    const expectedHyperlinkLabel = "click here";
    const expectedErrorMessage = `There is already an account with this email address. If you are sure that it is your email address, ${expectedHyperlinkLabel} to get your password and access your account.`;
    const expectedHyperlink =
      "https://magento.softwaretestingboard.com/customer/account/forgotpassword/";

    await registrationPage.register(firstName, lastName, email, password);

    await expect(homepage.infoForLoggedOut).toBeVisible();
    await expect(homepage.alertMessage).toHaveText(expectedErrorMessage);
    await expect(homepage.hyperlinkAlertMessage).toHaveAttribute(
      "href",
      expectedHyperlink
    );
    await expect(homepage.hyperlinkAlertMessage).toHaveText(
      expectedHyperlinkLabel
    );
  });

  test("unsuccessful registration with too short password", async () => {
    const shortPassword = "Pass123";
    const expectedPasswordError =
      "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.";
    const expectedPasswordStrength = "Weak";

    await registrationPage.register(firstName, lastName, unregisteredEmail, shortPassword);

    await expect(registrationPage.passwordError).toBeVisible();
    await expect(registrationPage.passwordError).toHaveText(
      expectedPasswordError
    );
    await expect(registrationPage.passwordStrengthInfo).toHaveText(
      expectedPasswordStrength
    );
  });

  test("unsuccessful registration with invalid password", async () => {
    const invalidPasswords = [
      "Password",
      "password1",
      "password!",
      "PASSWORD1",
      "PASSWORD!",
      "1234567!",
    ];
    const expectedPasswordError =
      "Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.";
    const expectedPasswordStrength = "Weak";

    for (let invalidPass of invalidPasswords) {
      await registrationPage.register(firstName, lastName, unregisteredEmail, invalidPass);
      await expect(registrationPage.passwordError).toHaveText(
        expectedPasswordError
      );
      await expect(registrationPage.passwordStrengthInfo).toHaveText(
        expectedPasswordStrength
      );
    }
  });

  test("unsuccessful registration with two different passwords", async () => {
    const confirmationPassword = "Examplepass123.";
    const passwordConfirmationErrorMssg = "Please enter the same value again.";

    await registrationPage.register(
      firstName,
      lastName,
      unregisteredEmail,
      password,
      confirmationPassword
    );

    await expect(registrationPage.passwordConfirmationError).toBeVisible();
    await expect(registrationPage.passwordConfirmationError).toHaveText(
      passwordConfirmationErrorMssg
    );
  });

  test("unsuccessful registration without populating first name", async () => {
    const missingFieldErrorMssg = "This is a required field.";

    await registrationPage.registerWithoutFirstName(lastName, unregisteredEmail, password);

    await expect(registrationPage.firstNameError).toBeVisible();
    await expect(registrationPage.firstNameError).toHaveText(
      missingFieldErrorMssg
    );
  });

  test("unsuccessful registration without populating last name", async () => {
    const missingFieldErrorMssg = "This is a required field.";

    await registrationPage.registerWithoutLastName(firstName, unregisteredEmail, password);

    await expect(registrationPage.lastNameError).toBeVisible();
    await expect(registrationPage.lastNameError).toHaveText(
      missingFieldErrorMssg
    );
  });

  test("unsuccessful registration without populating email address", async () => {
    const missingFieldErrorMssg = "This is a required field.";

    await registrationPage.registerWithoutEmail(firstName, lastName, password);

    await expect(registrationPage.emailAddressError).toBeVisible();
    await expect(registrationPage.emailAddressError).toHaveText(
      missingFieldErrorMssg
    );
  });

  test("unsuccessful registration without populating password", async () => {
    const missingFieldErrorMssg = "This is a required field.";

    await registrationPage.registerWithoutPassword(
      firstName,
      lastName,
      unregisteredEmail,
      password
    );

    await expect(registrationPage.passwordError).toBeVisible();
    await expect(registrationPage.passwordError).toHaveText(
      missingFieldErrorMssg
    );
  });

  test("unsuccessful registration without populating confirmation password", async () => {
    const missingFieldErrorMssg = "This is a required field.";

    await registrationPage.registerWithoutConfirmationPassword(
      firstName,
      lastName,
      unregisteredEmail,
      password
    );

    await expect(registrationPage.passwordConfirmationError).toBeVisible();
    await expect(registrationPage.passwordConfirmationError).toHaveText(
      missingFieldErrorMssg
    );
  });
});
