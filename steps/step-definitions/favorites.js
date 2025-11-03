import { Given, When, Then, Before } from "@wdio/cucumber-framework";
import { expect } from 'chai';
import { loginUser } from "../../utils/helper.js";
import { ProductPage } from '../../page-objects/ProductPage.js';
import { FavoritesPage } from '../../page-objects/FavoritesPage.js';

const productPage = new ProductPage();
const favoritesPage = new FavoritesPage();

Before({ tags: "@loginFavorites" }, async () => {
    await loginUser();
    await browser.pause(1000);
});

Given(
    /^the user is viewing the details page of the product "([^\"]*)"$/,
    async (productName) => {
        await productPage.navigateToProductDetails(productName);
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.include("/product/", "URL should contain product path");
    }
);

When(/^the user adds the product to their favorites$/, async () => {
    await productPage.addToFavorites();
});

When(/^the user navigates to their favorites page$/, async () => {
    await productPage.closeBannerIfVisible();
    await favoritesPage.navigateToFavorites();
});

Then(
    /^the product "([^\"]*)" should appear in the favorites list$/,
    async (productName) => {
        const favoriteProductName = await favoritesPage.getFavoriteProductName();
        expect(favoriteProductName).to.equal(productName, "Product should be in favorites list");
    }
);
