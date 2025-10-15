import { Given, When, Then, Before } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { loginUser, newPhone, newName } from "../../utils/helper.js";

let generatedPhone;
let generatedName;

Before({ tags: "@loginProfile" }, async () => {
  await loginUser();
  await browser.pause(1000);
});

Given(/^the user is logged in and on the profile page$/, async () => {
  await browser.url("/account/profile");
  await $("#first_name").waitForDisplayed({ timeout: 5000 });
});

When(/^the user updates their display name and phone number$/, async () => {
  generatedPhone = newPhone();
  generatedName = newName();

  const nameField = await $("#first_name");
  const phoneField = await $("#phone");
  await browser.pause(1000);
  await nameField.clearValue();
  await nameField.setValue(generatedName);

  await phoneField.clearValue();
  await phoneField.setValue(generatedPhone);
});

When(/^saves the profile changes$/, async () => {
  const saveButton = await $('button[type="submit"]');
  await saveButton.waitForClickable({ timeout: 5000 });
  await saveButton.click();
});

Then(
  /^the page should show the message "([^\"]*)"$/,
  async (expectedMessage) => {
    const successAlert = await $(".alert-success");
    await successAlert.waitForDisplayed({ timeout: 5000 });
    const text = await successAlert.getText();
    expect(text).toContain(expectedMessage);
  }
);

Then(
  /^the updated name and phone number should be visible on the profile page$/,
  async () => {
    await browser.waitUntil(
      async () => (await $("#first_name").getValue()) === generatedName,
      {
        timeout: 10000,
        timeoutMsg: "Name field did not update with the new value",
      }
    );

    await browser.waitUntil(
      async () => (await $("#phone").getValue()) === generatedPhone,
      {
        timeout: 10000,
        timeoutMsg: "Phone field did not update with the new value",
      }
    );

    const nameValue = await $("#first_name").getValue();
    const phoneValue = await $("#phone").getValue();

    expect(nameValue).toBe(generatedName);
    expect(phoneValue).toBe(generatedPhone);
  }
);
