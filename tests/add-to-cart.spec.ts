import { test, expect } from "@playwright/test";
import { TopMenuComponent } from "../components/top-menu.component";
import { ItemsPage } from "../pages/items.page";
import { ShoppingcartPage } from "../pages/shoppingcart.page";

test.describe("adding to cart tests", () => {
  let topMenu: TopMenuComponent;
  let itemsPage: ItemsPage;
  let shoppingCartPage: ShoppingcartPage;
 
  test.beforeEach(async ({ page }) => {
    topMenu = new TopMenuComponent(page);
    itemsPage = new ItemsPage(page);

    await page.goto("/");
  });

  test.afterEach(async ({ page }) => {
    shoppingCartPage = new ShoppingcartPage(page);
    await shoppingCartPage.removeItemsFromShoppingCart();
  });

  test("adding to cart random items", async () => {
    let price1: number;
    let price2: number;
    let sum: string;
    let expectedPrice: string;

    await topMenu.goToWomenPants();
    price1 = await itemsPage.addToCartRandomItem();

    await expect(itemsPage.messageBanner).toBeVisible({timeout: 7000});

    await topMenu.goToWomenJackets();
    price2 = await itemsPage.addToCartRandomItem();

    await expect(itemsPage.messageBanner).toBeVisible({timeout: 7000});

    sum = (price1 + price2).toFixed(2);
    expectedPrice = `$${sum}`;

    await expect(topMenu.cartSubTotal).toHaveText(expectedPrice, {
      timeout: 7000,
    });
  });

  test("adding several pieces of one item to cart", async () => {
    let price: number;
    let sum: string;
    let expectedPrice: string;
    const quantity = Math.floor(Math.random() * 20) + 1;

    await topMenu.goToMenTees();
    price = await itemsPage.selectAndAddToCartRandomItem(quantity);
    sum = (quantity * price).toFixed(2);
    expectedPrice = `$${sum}`;

    await expect(topMenu.cartSubTotal).toHaveText(expectedPrice, {
      timeout: 7000,
    });
  });
});
