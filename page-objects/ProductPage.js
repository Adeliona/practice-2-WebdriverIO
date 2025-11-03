import { BasePage } from '../core/BasePage.js';
import { BaseElement } from '../core/elements/BaseElement.js';

export class ProductPage extends BasePage {
    constructor() {
        super();
        this.url = '/';
        this.productCard = new BaseElement('.card-title');
        this.productName = new BaseElement('[data-test="product-name"]');
        this.productDescription = new BaseElement('#description');
        this.productPrice = new BaseElement('.price-section');
        this.addToCartButton = new BaseElement('[data-test="add-to-cart"]');
        this.addToFavoritesButton = new BaseElement('[data-test="add-to-favorites"]');
        this.bannerCloseButton = new BaseElement('[data-test="alert-close"], .toast-close');
    }

    async waitForProductList() {
        await this.productCard.waitForDisplayed({ timeout: 5000 });
        await this.productCard.waitForClickable({ timeout: 2000 });
    }

    async clickOnFirstProduct() {
        await this.productCard.waitForDisplayed({ timeout: 5000 });
        const productName = await this.productCard.getText();
        await this.productCard.click();
        
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes("/product/"),
            { timeout: 5000, timeoutMsg: "Product page did not open after click" }
        );
        
        return productName.trim();
    }

    async navigateToProductDetails(productName) {
        await browser.url("/");
        const productLink = new BaseElement(`a*=${productName}`);
        await productLink.waitForDisplayed({ timeout: 5000 });
        await productLink.click();
        
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes("/product/"),
            { timeout: 5000, timeoutMsg: "Product details page did not load" }
        );
    }

    async addToFavorites() {
        await this.addToFavoritesButton.waitForClickable({ timeout: 5000 });
        await this.addToFavoritesButton.click();
        await browser.pause(1000);
    }

    async closeBannerIfVisible() {
        if (await this.bannerCloseButton.isExisting() && await this.bannerCloseButton.isDisplayed()) {
            await this.bannerCloseButton.click();
        }
    }

    async verifyProductDetails() {
        await this.productName.waitForDisplayed({ timeout: 5000 });
        await this.productDescription.waitForDisplayed({ timeout: 5000 });
        await this.productPrice.waitForDisplayed({ timeout: 5000 });
        await this.addToCartButton.waitForDisplayed({ timeout: 5000 });

        const nameText = await this.productName.getText();
        const descriptionText = await this.productDescription.getText();
        const priceText = await this.productPrice.getText();

        return {
            name: nameText,
            description: descriptionText,
            price: priceText
        };
    }
}