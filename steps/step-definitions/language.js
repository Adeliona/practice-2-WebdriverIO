import { Given, When, Then } from "@wdio/cucumber-framework";
import { assert } from 'chai';
import { HeaderPage } from '../../page-objects/HeaderPage.js';

const headerPage = new HeaderPage();

When(/^the user selects "([^\"]*)" from the language dropdown$/, async (language) => {
    await headerPage.selectLanguage(language);
});

Then(/^the site interface should be displayed in the selected language$/, async () => {
    const navText = await headerPage.getNavigationText();
    assert.include(navText, "start", "Navigation should contain 'start' text");
});

Then(/^main navigation labels should be translated to the selected language$/, async () => {
    const navText = await headerPage.getNavigationText();
    assert.match(navText, /produkte|kontakt|über/, "Navigation should contain German labels");
});
