import { Locator, Page, expect } from "@playwright/test";

export class WishlistPage {
  constructor(private page: Page) {}

  messageAlert = this.page.getByRole("alert").first();
  listOfItems = this.page.locator("li.product-item");
  removeItemIcon = this.page.getByTitle("Remove Item");
  emptyWishlistInfo = this.page.locator(".message.empty");

  async removeItemsFromWishlist() {
    await expect(async () => {
      await this.page.reload();
      await this.listOfItems.first().hover();
      await this.removeItemIcon.first().click();
      await expect(this.emptyWishlistInfo).toBeVisible();
    }).toPass();
  }
}
