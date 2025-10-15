import { Given, When, Then, Before } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { loginUser } from "../../utils/helper.js";

Before({ tags: "@loginFavorites" }, async () => {
  await loginUser();
  await browser.pause(1000);
});

Given(
  /^the user is viewing the details page of the product "([^\"]*)"$/,
  async (productName) => {
    await browser.url("/");

    const productLink = $(`a*=${productName}`);
    await productLink.waitForDisplayed({ timeout: 5000 });
    await productLink.click();

    await browser.pause(1000);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/product/");
  }
);

When(/^the user adds the product to their favorites$/, async () => {
  const addToFavoritesButton = $('[data-test="add-to-favorites"]');
  await addToFavoritesButton.waitForClickable({ timeout: 5000 });
  await addToFavoritesButton.click();
  await browser.pause(1000);
});

When(/^the user navigates to their favorites page$/, async () => {
  const bannerClose = $('[data-test="alert-close"], .toast-close');
  if ((await bannerClose.isExisting()) && (await bannerClose.isDisplayed())) {
    await bannerClose.click();
  }

  await browser.url("/account/favorites");

  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account/favorites"),
    { timeout: 10000, timeoutMsg: "Favorites page did not open" }
  );
});

Then(
  /^the product "([^\"]*)" should appear in the favorites list$/,
  async (productName) => {
    const favoriteProductTitle = $(".card-title");
    await favoriteProductTitle.waitForDisplayed({ timeout: 5000 });

    const favoriteProductName = (await favoriteProductTitle.getText()).trim();
    expect(favoriteProductName).toBe(productName);
  }
);
