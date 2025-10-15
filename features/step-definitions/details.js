import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";


When(/^the user clicks on a product name or image$/, async () => {
  const firstProduct = $(".card-title");
  await firstProduct.waitForDisplayed({ timeout: 5000 });
  await firstProduct.click();
});

Then(/^the user should be taken to the product details page$/, async () => {
  const currentUrl = await browser.getUrl();
  expect(currentUrl).toContain("/product/");
});

Then(
  /^the page should display the product name, description, price, and "Add to Basket" button$/,
  async () => {
    const name = $("[data-test='product-name']");
    const description = $("#description");
    const price = $(".price-section");
    const addButton = $('[data-test="add-to-cart"]');

    await name.waitForDisplayed({ timeout: 5000 });
    await description.waitForDisplayed({ timeout: 5000 });
    await price.waitForDisplayed({ timeout: 5000 });
    await addButton.waitForDisplayed({ timeout: 5000 });

    expect(await name.getText()).not.toBe("");
    expect(await description.getText()).not.toBe("");
    expect(await price.getText()).toMatch(/^\$\d+/);
  }
);
