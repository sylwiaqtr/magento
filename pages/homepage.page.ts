import { Page } from "@playwright/test";

export class Homepage{

    constructor(private page: Page){}

    signInButton = this.page.getByRole('link', {name: 'Sign In'});
    createAccountButton = this.page.getByRole('banner').getByRole('link', { name: 'Create an Account' });
    infoForLoggedOut = this.page.locator('(//span[@class="not-logged-in"])[1]');
    infoForLoggedIn = this.page.locator('(//span[@class="logged-in"])[1]');
    alertMessage = this.page.getByRole('alert').locator('div>div').first();
    hyperlinkAlertMessage = this.alertMessage.getByRole('link');
}
