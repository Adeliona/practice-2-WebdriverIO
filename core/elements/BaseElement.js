export class BaseElement {
  constructor(selector) {
    this.element = $(selector);
  }

  async waitForDisplayed(timeout = 5000) {
    await this.element.waitForDisplayed({ timeout });
  }

  async waitForClickable(timeout = 5000) {
    await this.element.waitForClickable({ timeout });
  }

  async click() {
    await this.waitForClickable();
    await this.element.click();
  }

  async setValue(value) {
    await this.waitForDisplayed();
    await this.element.setValue(value);
  }

  async getText() {
    await this.waitForDisplayed();
    return await this.element.getText();
  }

  async getValue() {
    await this.waitForDisplayed();
    return await this.element.getValue();
  }

  async isDisplayed() {
    return await this.element.isDisplayed();
  }

  async isExisting() {
    return await this.element.isExisting();
  }

  async clearValue() {
    await this.waitForDisplayed();
    await this.element.clearValue();
  }
}
