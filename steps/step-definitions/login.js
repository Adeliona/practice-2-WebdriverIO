import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from 'chai';
import { registerNewUser } from "../../utils/helper.js";

Given(/^the user is on the login page$/, async () => {
  await browser.url("/auth/login");
  const loginForm = $("#email, #password");
  await loginForm.waitForDisplayed({ timeout: 5000 });
});

When(/^the user logs in with a valid username and password$/, async () => {
  const { email, password } = await registerNewUser();

  await browser.pause(2000);

  const emailInput = $("#email");
  await emailInput.waitForDisplayed({ timeout: 15000 });
  await emailInput.setValue(email);

  const passwordInput = $("#password");
  await passwordInput.waitForDisplayed({ timeout: 15000 });
  await passwordInput.setValue(password);

  const submitButton = $('input[data-test="login-submit"]');
  await submitButton.waitForClickable({ timeout: 5000 });
  await submitButton.click();
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
  const pageTitle = $('[data-test="page-title"]');
  await pageTitle.waitForDisplayed({ timeout: 10000 });

  const titleText = await pageTitle.getText();
  expect(titleText).to.include("My account", "Page title should contain 'My account'");
});
