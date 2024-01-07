import { Page, expect } from "@playwright/test";
export class CheckoutPages {
  constructor(private page: Page) {}

  paymentURL = "https://magento.softwaretestingboard.com/checkout/#payment";
  orderURL =
    "https://magento.softwaretestingboard.com/checkout/onepage/success/";

  checkedShippingAddress = this.page.locator("div.selected-item");
  checkedShippingMethod = this.page.getByRole("radio");
  nextPageButton = this.page.getByRole("button", { name: "Next" });
  cartSubtotal = this.page.locator('span[data-th="Cart Subtotal"]');
  shippingCost = this.page.locator('span[data-th="Shipping"]');
  orderTotalCost = this.page.locator('[data-th="Order Total"]');
  shippingAddress = this.page.locator("div.ship-to");
  shippingMethod = this.page.locator(
    "div.ship-via div.shipping-information-content"
  );
  placeOrderButton = this.page.getByRole("button", { name: "Place Order" });
  successfullOrderInfo = this.page.locator("span.base");
  orderNumber = this.page.locator("a.order-number");

  async confirmShipment() {
    await this.nextPageButton.click();
    await expect(this.page).toHaveURL(this.paymentURL, { timeout: 6000 });
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await expect(this.page).toHaveURL(this.orderURL, { timeout: 6000 });
  }

  async getOrderNumber(): Promise<string> {
    return this.orderNumber.innerText();
  }
};
