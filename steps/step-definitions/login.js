import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from 'chai';
import { registerNewUser } from "../../utils/helper.js";
import { LoginPage } from '../../page-objects/LoginPage.js';
import { ProfilePage } from '../../page-objects/ProfilePage.js';

const loginPage = new LoginPage();
const profilePage = new ProfilePage();

Given(/^the user is on the login page$/, async () => {
    await loginPage.open();
    await loginPage.waitForLoginFormDisplayed();
});

When(/^the user logs in with a valid username and password$/, async () => {
    const { email, password } = await registerNewUser();
    await browser.pause(2000); // Wait for registration to complete
    await loginPage.login(email, password);
});

Then(/^the user should be redirected to their profile page$/, async () => {
    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl();
            return url.toLowerCase().includes('account');
        },
        { timeout: 10000, timeoutMsg: 'Expected URL to contain "account" after login' }
    );
    
    const currentUrl = await browser.getUrl();
    expect(currentUrl.toLowerCase()).to.include("account", "URL should contain 'account' after login");
});

Then(/^the profile page should display the user's account$/, async () => {
    const titleText = await profilePage.getPageTitle();
    expect(titleText).to.include("My account", "Page title should contain 'My account'");
});
