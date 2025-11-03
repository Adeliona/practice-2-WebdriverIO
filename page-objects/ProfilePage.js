import { BasePage } from "../core/BasePage.js";
import { BaseElement } from "../core/elements/BaseElement.js";

export class ProfilePage extends BasePage {
  constructor() {
    super();
    this.url = "/account/profile";
    this.firstNameInput = new BaseElement("#first_name");
    this.phoneInput = new BaseElement("#phone");
    this.saveButton = new BaseElement('button[type="submit"]');
    this.successAlert = new BaseElement(".alert-success");
    this.pageTitle = new BaseElement('[data-test="page-title"]');
  }

  async navigateToProfile() {
    await this.open();
    await this.firstNameInput.waitForDisplayed({ timeout: 5000 });
  }

  async updateProfileName(name) {
    await this.firstNameInput.waitForDisplayed();
    await this.firstNameInput.clearValue();
    await this.firstNameInput.setValue(name);
  }

  async updateProfilePhone(phone) {
    await this.phoneInput.waitForDisplayed();
    await this.phoneInput.clearValue();
    await this.phoneInput.setValue(phone);
  }

  async saveChanges() {
    await this.saveButton.waitForClickable({ timeout: 5000 });
    await this.saveButton.click();
  }

  async getSuccessMessage() {
    await this.successAlert.waitForDisplayed({ timeout: 5000 });
    return await this.successAlert.getText();
  }

  async getPageTitle() {
    await this.pageTitle.waitForDisplayed({ timeout: 10000 });
    return await this.pageTitle.getText();
  }

  async getCurrentName() {
    return await this.firstNameInput.getValue();
  }

  async getCurrentPhone() {
    return await this.phoneInput.getValue();
  }
}
