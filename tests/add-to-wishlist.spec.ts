import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/sign-in.page";
import { TopMenuComponent } from "../components/top-menu.component";
import { ItemsPage } from "../pages/items.page";
import { WishlistPage } from "../pages/wishlist.page";
import { email, password } from "../consts/consts";

test.describe("adding to wishlist tests", () => {
  let signInPage: SignInPage;
  let topMenu: TopMenuComponent;
  let itemsPage: ItemsPage;
  let wishlistPage: WishlistPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    topMenu = new TopMenuComponent(page);
    itemsPage = new ItemsPage(page);
    wishlistPage = new WishlistPage(page);

    await page.goto("/");
    await signInPage.signIn(email, password);
  });

  test.afterEach(async () => {
    await wishlistPage.removeItemsFromWishlist();
  });

  test("adding accessories to wishlist", async ({ page }) => {
    let itemName: string;
    const expectedMessage =
      "has been added to your Wish List. Click here to continue shopping.";
    const url = /\/magento.softwaretestingboard.com\/wishlist\b/;

    await topMenu.goToGearBags();
    itemName = await itemsPage.addToWishlistRandomItem();

    await expect(page).toHaveURL(url);
    await expect(wishlistPage.messageAlert).toHaveText(
      `${itemName} ${expectedMessage}`
    );
  });
});
