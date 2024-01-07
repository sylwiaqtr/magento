import { Page, expect } from "@playwright/test";

export class ShoppingcartPage {
  constructor(private page: Page) {}

  checkoutURL = '/checkout/cart/'

  removeItemIcon = this.page.getByTitle("Remove item");
  emptyCartInfo = this.page.locator(".cart-empty");

  async removeItemsFromShoppingCart() {
    await this.page.goto(this.checkoutURL);
    await this.page.waitForLoadState();
    const count = await this.removeItemIcon.count();
    if(count > 0){
      await expect(async () => {
        await this.page.reload();
        await this.removeItemIcon.first().click();
        await expect(this.emptyCartInfo).toBeVisible();
      }).toPass();
    }
    
  }
};
