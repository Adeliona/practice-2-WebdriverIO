import { Given, When, Then } from "@wdio/cucumber-framework";
import { generateUniqueEmail, generatePassword } from "../../utils/helper.js";

let email, password;

Given(/^the user is on the registration page$/, async () => {
  await browser.url("/auth/register");
  await browser.pause(1000);
});

When(
  /^the user submits the registration form with a valid username, email, and password$/,
  async () => {
    email = generateUniqueEmail();
    password = generatePassword();

    await $("#first_name").setValue("John");
    await $("#last_name").setValue("Doe");
    await $("#dob").setValue("1990-01-01");
    await $("#street").setValue("Main Street 1");
    await $("#postal_code").setValue("12345");
    await $("#city").setValue("Kyiv");
    await $("#state").setValue("Kyiv Region");
    await $("#country").selectByVisibleText("Ukraine");
    await $("#phone").setValue("123456789");
    await $("#email").setValue(email);
    await $("#password").setValue(password);
    await $('button[type="submit"]').click();
  }
);

Then(/^the user should be redirected to the login page$/, async () => {
  const loginForm = await $(".auth-form");
  await loginForm.waitForDisplayed({ timeout: 15000 });
});

Then(/^the login form should be displayed$/, async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/auth/login"),
    { timeout: 10000 }
  );
  await browser.pause(1000);
  expect(await $(".auth-form").isDisplayed()).toBe(true);
});
