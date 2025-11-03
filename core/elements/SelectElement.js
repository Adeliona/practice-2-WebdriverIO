import { BaseElement } from "./BaseElement.js";

export class SelectElement extends BaseElement {
  constructor(selector) {
    super(selector);
  }

  async selectByVisibleText(text) {
    await this.waitForDisplayed();
    await this.element.selectByVisibleText(text);
  }
}
