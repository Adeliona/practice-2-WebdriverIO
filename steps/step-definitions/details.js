import { Given, When, Then } from "@wdio/cucumber-framework";
import { should } from 'chai';
import { ProductPage } from '../../page-objects/ProductPage.js';

const productPage = new ProductPage();

When(/^the user clicks on a product name or image$/, async () => {
    await productPage.clickOnFirstProduct();
});

Then(/^the user should be taken to the product details page$/, async () => {
    const currentUrl = await browser.getUrl();
    currentUrl.should.include("/product/", "URL should contain product path");
});

Then(
    /^the page should display the product name, description, price, and "Add to Basket" button$/,
    async () => {
        const details = await productPage.verifyProductDetails();
        
        details.name.should.not.be.empty;
        details.description.should.not.be.empty;
        details.price.should.match(/^\$\d+/, "Price should start with $ followed by digits");
    }
);
