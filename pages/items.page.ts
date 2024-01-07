import { Locator, Page, expect } from "@playwright/test";

export class ItemsPage {
  constructor(private page: Page) {}

  listOfItems = this.page.locator("#maincontent li.item.product");
  sizeS = this.page.locator('//div[text()="S"]');
  firstColor = this.page.locator('//div[@attribute-code="color"]//div[@index="0"]');
  quantityInput = this.page.getByTitle("Qty");
  addToCartButton = this.page.getByRole("button", {name: "Add to Cart",});
  price = this.page.locator("span.price-wrapper");
  addToWishlistButton = this.page.getByLabel("Add to Wish List");
  messageBanner = this.page.getByRole("alert");
  

  async drawItem(): Promise<Locator> {
    await this.page.waitForLoadState();
    const numberOfItems = await this.listOfItems.count();
    const random = Math.floor(Math.random() * numberOfItems);
    const randomItem = this.listOfItems.nth(random);
    return randomItem;
  }

  async addToCartRandomItem(): Promise<number> {
    const randomItem = await this.drawItem();

    const sizes = randomItem.locator('div[aria-label="Size"] > div');
    const colors = randomItem.locator('div[aria-label="Color"] > div');
    const addToCart = randomItem.getByRole("button", { name: "Add to Cart" });

    await sizes.first().click({ force: true });
    await colors.first().click({ force: true });
    await randomItem.hover();
    await addToCart.click({ force: true });

    return Number(
      await randomItem
        .locator(this.price)
        .getAttribute("data-price-amount")
    );
  }

  async selectAndAddToCartRandomItem(qty: number): Promise<number> {
    const randomItem = await this.drawItem();
    const itemName = randomItem.getByRole("link").first();

    await itemName.click();
    await this.page.waitForLoadState();
    await this.sizeS.click();
    await this.firstColor.click();
    await this.quantityInput.clear();
    await this.quantityInput.fill(String(qty));
    await this.addToCartButton.click();

    return Number(
      await this.price
        .first()
        .getAttribute("data-price-amount")
    );
  }

  async addToWishlistRandomItem(): Promise<string> {
    const randomItem = await this.drawItem();
    const addToWishlist = randomItem.locator(this.addToWishlistButton);
    const itemName = await randomItem
      .locator("a.product-item-link")
      .innerText();
    await randomItem.hover();
    await addToWishlist.click();

    return itemName;
  }
};
