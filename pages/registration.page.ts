import { Page } from "@playwright/test";

export class RegistrationPage {
  constructor(private page: Page) {}

  firstNameInput = this.page.locator("#firstname");
  lastNameInput = this.page.locator("#lastname");
  emailInput = this.page.locator("#email_address");
  passwordInput = this.page.locator("#password");
  passwordConfirmationInput = this.page.locator("#password-confirmation");
  createAccountButton = this.page.getByRole("button", {
    name: "Create an Account",
  });
  passwordStrengthInfo = this.page.locator("#password-strength-meter-label");
  passwordError = this.page.locator("#password-error");
  passwordConfirmationError = this.page.locator(
    "#password-confirmation-error"
  );
  firstNameError = this.page.locator('#firstname-error');
  lastNameError = this.page.locator('#lastname-error');
  emailAddressError = this.page.locator('#email_address-error');


  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword?: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (confirmPassword) {
      await this.passwordConfirmationInput.fill(confirmPassword);
    } else {
      await this.passwordConfirmationInput.fill(password);
    }
    await this.createAccountButton.click({ force: true });
  }

  async registerWithoutFirstName(
    lastName: string,
    email: string,
    password: string
  ) {
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordConfirmationInput.fill(password);
    await this.createAccountButton.click({ force: true });
  }

  async registerWithoutLastName(
    firstName: string,
    email: string,
    password: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordConfirmationInput.fill(password);
    await this.createAccountButton.click({ force: true });
  }

  async registerWithoutEmail(
    firstName: string,
    lastName: string,
    password: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.passwordInput.fill(password);
    await this.passwordConfirmationInput.fill(password);
    await this.createAccountButton.click({ force: true });
  }

  async registerWithoutPassword(
    firstName: string,
    lastName: string,
    email: string,
    confirmationPassword: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordConfirmationInput.fill(confirmationPassword);
    await this.createAccountButton.click({ force: true });
  }

  async registerWithoutConfirmationPassword(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.createAccountButton.click({ force: true });
  }
};
