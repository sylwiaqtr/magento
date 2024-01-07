import { Page, expect } from "@playwright/test";

export class WishlistPage {
  constructor(private page: Page) {}

  messageAlert = this.page.getByRole("alert").first();
  removeItemIcon = this.page.getByTitle("Remove This Item");
  emptyWishlistInfo = this.page.locator(".message.empty");

  async removeItemsFromWishlist() {
    await expect(async () => {
      await this.page.reload();
      await this.removeItemIcon.first().click();
      await expect(this.emptyWishlistInfo).toBeVisible();
    }).toPass();
  }
};
