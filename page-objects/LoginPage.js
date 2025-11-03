import { BasePage } from "../core/BasePage.js";
import { BaseElement } from "../core/elements/BaseElement.js";

export class LoginPage extends BasePage {
  constructor() {
    super();
    this.url = "/auth/login";
    this.emailInput = new BaseElement("#email");
    this.passwordInput = new BaseElement("#password");
    this.submitButton = new BaseElement('input[data-test="login-submit"]');
    this.loginForm = new BaseElement(".auth-form");
  }

  async login(email, password) {
    await this.open();
    await this.waitForPageLoad();
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
  }

  async isLoginFormDisplayed() {
    return await this.loginForm.isDisplayed();
  }

  async waitForLoginFormDisplayed() {
    await this.loginForm.waitForDisplayed({ timeout: 15000 });
  }
}
