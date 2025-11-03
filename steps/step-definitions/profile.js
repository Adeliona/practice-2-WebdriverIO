import { Given, When, Then, Before } from "@wdio/cucumber-framework";
import { should } from 'chai';
import { loginUser, newPhone, newName } from "../../utils/helper.js";
import { ProfilePage } from '../../page-objects/ProfilePage.js';

should();

const profilePage = new ProfilePage();
let generatedPhone;
let generatedName;

Before({ tags: "@loginProfile" }, async () => {
    await loginUser();
    await browser.pause(1000);
});

Given(/^the user is logged in and on the profile page$/, async () => {
    await profilePage.navigateToProfile();
});

When(/^the user updates their display name and phone number$/, async () => {
    generatedPhone = newPhone();
    generatedName = newName();

    await browser.pause(2000); // Wait for the page to be fully loaded
    
    await profilePage.updateProfileName(generatedName);
    await profilePage.updateProfilePhone(generatedPhone);
});

When(/^saves the profile changes$/, async () => {
    await profilePage.saveChanges();
});

Then(/^the page should show the message "([^\"]*)"$/, async (expectedMessage) => {
    const message = await profilePage.getSuccessMessage();
    message.should.include(expectedMessage, "Success message should contain expected text");
});

Then(/^the updated name and phone number should be visible on the profile page$/, async () => {
    await browser.waitUntil(
        async () => (await profilePage.getCurrentName()) === generatedName,
        {
            timeout: 10000,
            timeoutMsg: "Name field did not update with the new value",
        }
    );

    await browser.waitUntil(
        async () => (await profilePage.getCurrentPhone()) === generatedPhone,
        {
            timeout: 10000,
            timeoutMsg: "Phone field did not update with the new value",
        }
    );

    const nameValue = await profilePage.getCurrentName();
    const phoneValue = await profilePage.getCurrentPhone();

    nameValue.should.equal(generatedName, "Name field should contain the new value");
    phoneValue.should.equal(generatedPhone, "Phone field should contain the new value");
});
