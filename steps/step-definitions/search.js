import { Given, When, Then } from "@wdio/cucumber-framework";
import {should, expect, assert } from "chai";

should();

Given(/^the user is on the home page$/, async () => {
  await browser.url("/");
  await browser.pause(1000);
});

When(/^the user searches for "([^\"]*)" in the search bar$/, async (productName) => {
  const searchInput = await $("#search-query");
  await searchInput.waitForDisplayed({ timeout: 5000 });
  await searchInput.setValue(productName);

  const searchButton = await $('button[type="submit"]');
  await searchButton.click();
  await browser.pause(1000);
});

Then(/^the search results should include the product "([^\"]*)"$/, async (productName) => {
  const product = await $('[data-test="product-name"]');
  await product.waitForDisplayed({ timeout: 10000 });

  
  const productText = (await product.getText()).trim();
  expect(productText).to.contain(productName);
  productText.should.include(productName);
  assert.include(productText, productName, "Product name should match search query");
});

Then(/^the user should be able to open the product details page$/, async () => {
  const firstProduct = await $('[data-test="product-name"]');
  await firstProduct.waitForDisplayed({ timeout: 5000 });
  await firstProduct.click();

  const currentUrl = await browser.getUrl();
  expect(currentUrl).to.contain("/product/");
  currentUrl.should.include("/product/");
  assert.include(currentUrl, "/product/", "URL should contain product path");
});
