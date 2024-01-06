import { Page } from "@playwright/test";

export class SignInPage {
  constructor(private page: Page) {}

  pageHeader = this.page.locator('span[data-ui-id="page-title-wrapper"]');
  registeredCustomersHeader = this.page.locator(
    "#block-customer-login-heading"
  );
  registeredCustomersInfo = this.page.locator("div.fieldset.login");
  emailLabel = this.page.locator('//label[@for="email"]');
  emailInput = this.page.locator("#email");
  passwordLabel = this.page.locator('//label[@for="pass"]');
  passwordInput = this.page.getByTitle("Password");
  signInButton = this.page.locator("#send2").first();
  forgotPasswordLink = this.page.getByRole("link", {
    name: "Forgot Your Password?",
  });
  goToSignIn = this.page.getByRole("link", { name: "Sign In" });

  async signIn(email: string, password: string) {
    await this.goToSignIn.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
