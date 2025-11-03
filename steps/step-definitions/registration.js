import { Given, When, Then } from "@wdio/cucumber-framework";
import { assert } from "chai";
import { generateUniqueEmail, generatePassword } from "../../utils/helper.js";
import { RegistrationPage } from "../../page-objects/RegistrationPage.js";
import { LoginPage } from "../../page-objects/LoginPage.js";

let email, password;
const registrationPage = new RegistrationPage();
const loginPage = new LoginPage();

Given(/^the user is on the registration page$/, async () => {
  await browser.url("/auth/register");
  await browser.pause(1000);
});

When(
  /^the user submits the registration form with a valid username, email, and password$/,
  async () => {
    email = generateUniqueEmail();
    password = generatePassword();
    await browser.pause(2000);

    await registrationPage.fillRegistrationForm({ email, password });
    await registrationPage.submitForm();
  }
);

Then(/^the user should be redirected to the login page$/, async () => {
  await loginPage.waitForLoginFormDisplayed();
});

Then(/^the login form should be displayed$/, async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/auth/login"),
    {
      timeout: 10000,
      timeoutMsg: "Not redirected to login page",
    }
  );
  await loginPage.waitForLoginFormDisplayed();
  const isFormDisplayed = await loginPage.isLoginFormDisplayed();
  assert.isTrue(
    isFormDisplayed,
    "Login form should be visible after registration"
  );
});
