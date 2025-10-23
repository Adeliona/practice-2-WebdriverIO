import { Given, When, Then } from "@wdio/cucumber-framework";
import { assert } from 'chai';


When(
  /^the user selects "([^\"]*)" from the language dropdown$/,
  async (language) => {
    const languageButton = await $("#language");
    await languageButton.waitForDisplayed({ timeout: 5000 });
    await languageButton.click();

    const languageOption = await $(`a.dropdown-item*=${language}`);
    await languageOption.waitForClickable({ timeout: 5000 });
    await languageOption.click();

    await browser.pause(1000);
  }
);

Then(
  /^the site interface should be displayed in the selected language$/,
  async () => {
    const nav = await $("nav");
    const navText = (await nav.getText()).toLowerCase();
    assert.include(navText, "start", "Navigation should contain 'start' text");
  }
);

Then(
  /^main navigation labels should be translated to the selected language$/,
  async () => {
    const nav = await $("nav");
    const navText = (await nav.getText()).toLowerCase();
    assert.match(navText, /produkte|kontakt|über/, "Navigation should contain German labels");
  }
);
