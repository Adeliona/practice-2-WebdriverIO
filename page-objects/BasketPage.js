import { BasePage } from '../core/BasePage.js';
import { BaseElement } from '../core/elements/BaseElement.js';

export class BasketPage extends BasePage {
    constructor() {
        super();
        this.url = '/checkout';
        this.productTitle = new BaseElement('span[data-test="product-title"]');
        this.addToBasketButton = new BaseElement('#btn-add-to-cart');
        this.basketAlert = new BaseElement('[role="alert"]');
        this.basketLink = new BaseElement('a[href="/checkout"], [data-test="basket-link"]');
    }

    async addToBasket() {
        await this.addToBasketButton.waitForClickable();
        await this.addToBasketButton.click();
        await this.basketAlert.waitForDisplayed();
    }

    async navigateToBasket() {
        await this.basketLink.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(this.url),
            { timeout: 10000, timeoutMsg: "Basket page did not open" }
        );
    }

    async getProductTitle() {
        await this.productTitle.waitForDisplayed({ timeout: 10000 });
        return await this.productTitle.getText();
    }
}