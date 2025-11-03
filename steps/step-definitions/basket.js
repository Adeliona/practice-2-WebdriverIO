import { Given, When, Then } from "@wdio/cucumber-framework";
import { assert } from "chai";
import { ProductPage } from "../../page-objects/ProductPage.js";
import { BasketPage } from "../../page-objects/BasketPage.js";

const productPage = new ProductPage();
const basketPage = new BasketPage();
let selectedProductName;

Given(/^the user is on the product listing page$/, async () => {
  console.log("Navigating to the product listing page");
  await productPage.open();
  await productPage.waitForProductList();
});

When(/^the user clicks on a product name$/, async () => {
  selectedProductName = await productPage.clickOnFirstProduct();
});

When(/^the user adds the product to the basket$/, async () => {
  await basketPage.addToBasket();
});

When(/^the user navigates to the basket$/, async () => {
  await basketPage.navigateToBasket();
  const currentUrl = await browser.getUrl();
  assert.include(currentUrl, "/checkout", "URL should contain checkout path");
});

Then(
  /^the basket should list the selected product with correct details$/,
  async () => {
    const basketProductName = await basketPage.getProductTitle();
    assert.include(
      basketProductName,
      selectedProductName,
      "Basket should contain the selected product name"
    );
  }
);
