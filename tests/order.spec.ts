import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/sign-in.page";
import { TopMenuComponent } from "../components/top-menu.component";
import { ItemsPage } from "../pages/items.page";
import { CheckoutPages } from "../pages/checkout.pages";
import { email, password } from "../consts/consts";

test.describe("making order tests", () => {
  let signInPage: SignInPage;
  let topMenu: TopMenuComponent;
  let items: ItemsPage;
  let checkoutPages: CheckoutPages;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    topMenu = new TopMenuComponent(page);
    items = new ItemsPage(page);
    checkoutPages = new CheckoutPages(page);
    await page.goto("/");
    await signInPage.signIn(email, password);
  });

  test("successful order", async ({ page }) => {
    test.setTimeout(80000);
    
    const expectedAdress =
    /\bSylwia\b|\bSqtr\b|\bColorful\b|\bLublin, lubelskie 20-520\b|\bPoland\b|\b000000000\b/;
    const shippingCost = 5;
    const shippingMethod = "Flat Rate - Fixed";
    const orderNumberLength = 9;
    const successfullOrderText = "Thank you for your purchase!";
    let price;
    let orderTotal;
    let orderNumber;
    
    await topMenu.goToWomenJackets();
    price = await items.addToCartRandomItem();
    await topMenu.goToCheckout();

    await expect(checkoutPages.checkedShippingAddress).toHaveText(
      expectedAdress,
      { timeout: 7000 }
    );
    await expect(checkoutPages.checkedShippingMethod).toBeChecked();

    await checkoutPages.confirmShipment();

    await expect(checkoutPages.cartSubtotal).toHaveText(
      `$${price.toFixed(2)}`,
      { timeout: 5000 }
    );
    await expect(checkoutPages.shippingCost).toHaveText(
      `$${shippingCost.toFixed(2)}`
    );

    orderTotal = `$${(price + shippingCost).toFixed(2)}`;

    await expect(checkoutPages.orderTotalCost).toHaveText(orderTotal);
    await expect(checkoutPages.shippingAddress).toHaveText(expectedAdress);
    await expect(checkoutPages.shippingMethod).toHaveText(shippingMethod);

    await checkoutPages.placeOrder();

    await expect(checkoutPages.successfullOrderInfo).toHaveText(
      successfullOrderText
    );

    orderNumber = await checkoutPages.getOrderNumber();

    expect(orderNumber).toHaveLength(orderNumberLength);
  });
});
