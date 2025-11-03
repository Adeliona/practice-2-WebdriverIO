import { BasePage } from '../core/BasePage.js';
import { BaseElement } from '../core/elements/BaseElement.js';

export class HeaderPage extends BasePage {
    constructor() {
        super();
        this.languageButton = new BaseElement("#language");
        this.navigationMenu = new BaseElement("nav");
    }

    async selectLanguage(language) {
        await this.languageButton.waitForDisplayed({ timeout: 5000 });
        await this.languageButton.click();

        const languageOption = new BaseElement(`a.dropdown-item*=${language}`);
        await languageOption.waitForClickable({ timeout: 5000 });
        await languageOption.click();
        await browser.pause(1000); // Wait for language change to take effect
    }

    async getNavigationText() {
        await this.navigationMenu.waitForDisplayed({ timeout: 5000 });
        return (await this.navigationMenu.getText()).toLowerCase();
    }
}