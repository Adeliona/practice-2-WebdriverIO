import { Given, When, Then } from "@wdio/cucumber-framework";
import { should } from 'chai';
should();


When(/^the user clicks on a product name or image$/, async () => {
  const firstProduct = $(".card-title");
  await firstProduct.waitForDisplayed({ timeout: 5000 });
  await firstProduct.click();
});

Then(/^the user should be taken to the product details page$/, async () => {
  const currentUrl = await browser.getUrl();
  ("/product/", "URL should contain product path");
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

    const nameText = await name.getText();
    const descriptionText = await description.getText();
    const priceText = await price.getText();

    nameText.should.not.be.empty;
    descriptionText.should.not.be.empty;
    priceText.should.match(/^\$\d+/, "Price should start with $ followed by digits");
  }
);
