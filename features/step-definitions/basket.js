import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";

let selectedProductName;

Given(/^the user is on the product listing page$/, async () => {
  console.log("Navigating to the product listing page");
  await browser.url("/");

  const productCard = $(".card-title");
  await productCard.waitForDisplayed({ timeout: 5000 });
  await browser.pause(1000);
});

When(/^the user clicks on a product name$/, async () => {
  const firstProduct = $(".card-title");
  await firstProduct.waitForDisplayed({ timeout: 5000 });

  selectedProductName = (await firstProduct.getText()).trim();

  await firstProduct.click();
});

When(/^the user adds the product to the basket$/, async () => {
  const addToBasketBtn = $("#btn-add-to-cart");
  await addToBasketBtn.waitForDisplayed({ timeout: 5000 });
  await addToBasketBtn.click();

  const basketAlert = $('[role="alert"]');
  await basketAlert.waitForDisplayed({ timeout: 5000 });
});

When(/^the user navigates to the basket$/, async () => {
  const basketBtn = $('a[href="/checkout"], [data-test="basket-link"]');
  await basketBtn.waitForClickable({ timeout: 5000 });
  await basketBtn.click();

  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/checkout"),
    { timeout: 10000, timeoutMsg: "Basket page did not open" }
  );

  const currentUrl = await browser.getUrl();
  expect(currentUrl).toContain("/checkout");
});

Then(
  /^the basket should list the selected product with correct details$/,
  async () => {
    const basketProduct = $('span[data-test="product-title"]');
    await basketProduct.waitForDisplayed({ timeout: 10000 });
    const basketProductName = (await basketProduct.getText()).trim();

    expect(basketProductName).toContain(selectedProductName);
  }
);
