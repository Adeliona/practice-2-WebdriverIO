import { Given, When, Then } from "@wdio/cucumber-framework";
import { registerNewUser } from "../../utils/helper.js";

Given(/^the user is on the login page$/, async () => {
  await browser.url("/auth/login");
  await browser.pause(1000);
});

When(/^the user logs in with a valid username and password$/, async () => {
  const { email, password } = await registerNewUser();

  await browser.pause(1000);
  await $("#email").setValue(email);
  await $("#password").setValue(password);

  const submitButton = $('input[data-test="login-submit"]');
  await browser.pause(1000);
  await submitButton.click();
});

Then(/^the user should be redirected to their profile page$/, async () => {
  await browser.pause(1000);
  const currentUrl = await browser.getUrl();
  expect(currentUrl).toContain("/account");
});

Then(/^the profile page should display the user's account$/, async () => {
  const pageTitle = $('[data-test="page-title"]');
  await pageTitle.waitForDisplayed({ timeout: 10000 });

  const titleText = await pageTitle.getText();
  expect(titleText).toContain("My account");
});
