import { BasePage } from '../core/BasePage.js';
import { BaseElement } from '../core/elements/BaseElement.js';

export class FavoritesPage extends BasePage {
    constructor() {
        super();
        this.url = '/account/favorites';
        this.addToFavoritesButton = new BaseElement('[data-test="add-to-favorites"]');
        this.favoriteProductTitle = new BaseElement('.card-title');
        this.bannerClose = new BaseElement('[data-test="alert-close"], .toast-close');
    }

    async navigateToFavorites() {
        await browser.url(this.url);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(this.url),
            { timeout: 10000, timeoutMsg: "Favorites page did not open" }
        );
    }

    async addToFavorites() {
        await this.addToFavoritesButton.waitForClickable({ timeout: 5000 });
        await this.addToFavoritesButton.click();
    }

    async closeBannerIfExists() {
        if (await this.bannerClose.isExisting() && await this.bannerClose.isDisplayed()) {
            await this.bannerClose.click();
        }
    }

    async getFavoriteProductName() {
        await this.favoriteProductTitle.waitForDisplayed({ timeout: 5000 });
        return await this.favoriteProductTitle.getText();
    }
}