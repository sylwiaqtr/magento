import { Page, expect } from "@playwright/test";

export class TopMenuComponent{
    constructor(private page: Page) {}

    shoppingCart = this.page.getByRole('link', {name: 'My Cart'});
    cartSubTotal = this.page.locator('//div[@class="subtotal"]//span[@class="price"]');
    noOfItemsInCart = this.page.locator('//span[@class="counter-number"]');
    editCart = this.page.getByRole("link", { name: "View and Edit Cart" });
    sumOfItemsInShoppingCart = this.page.locator('span.counter-number');
    goToCheckoutButton = this.page.getByTitle('Proceed to Checkout');

    whatsNewNavItem = this.page.locator('#ui-id-3');

    womenNavItem = this.page.locator('#ui-id-4');
    womenTopsPicklist = this.page.locator('#ui-id-9');
    womenBottomsPicklist = this.page.locator('#ui-id-10');
    womenJacketsOption = this.page.locator('#ui-id-11');
    womenHoodiesOption = this.page.locator('#ui-id-12');
    womenTeesOption = this.page.locator('#ui-id-13');
    womenBrasOption = this.page.locator('#ui-id-14');
    womenPantsOption = this.page.locator('#ui-id-15');
    womenShortsOption = this.page.locator('#ui-id-16');
    
    menNavItem = this.page.locator('#ui-id-5');
    menTopPicklist = this.page.locator('#ui-id-17');
    menBottomsPicklist = this.page.locator('#ui-id-18');
    menJacketsOption = this.page.locator('#ui-id-19');
    menHoodiesOption = this.page.locator('#ui-id-20');
    menTeesOption = this.page.locator('#ui-id-21');
    menTanksOption = this.page.locator('#ui-id-22');
    menPantsOption = this.page.locator('#ui-id-23');
    menShortsOption = this.page.locator('#ui-id-24');
    
    gearNavItem = this.page.locator('#ui-id-6');
    bagsOption = this.page.locator('#ui-id-25');
    fitnessEqipmentOption = this.page.locator('#ui-id-26');
    watchesOption = this.page.locator('#ui-id-27');
    
    trainingNavItem = this.page.locator('#ui-id-7');
    videoDownloadOption = this.page.locator('#ui-id-28');

    saleNavItem = this.page.locator('#ui-id-8');

    async goToWomenJackets(){
    await this.womenNavItem.hover();
    await this.womenTopsPicklist.hover();
    await this.womenJacketsOption.click();
    await this.page.waitForLoadState();
    }

    async goToWomenPants(){
    await this.womenNavItem.hover();
    await this.womenBottomsPicklist.hover();
    await this.womenPantsOption.click();
    await this.page.waitForLoadState();
    }

    async goToMenTees(){
        await this.menNavItem.hover();
    await this.menTopPicklist.hover();
    await this.menTeesOption.click();
    await this.page.waitForLoadState();
    }

    async goToGearBags(){
        await this.gearNavItem.hover();
    await this.bagsOption.click();
    await this.page.waitForLoadState();
    }

    async goToCheckout(){
        await expect(this.sumOfItemsInShoppingCart).toContainText(/[1-9][0-9]*/, {timeout: 15000});
        await this.shoppingCart.click();
        await this.goToCheckoutButton.click();
        await this.page.waitForLoadState();
        await expect(this.page).toHaveURL('https://magento.softwaretestingboard.com/checkout/#shipping', {timeout: 5000});
      }
}