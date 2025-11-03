import { BasePage } from '../core/BasePage.js';
import { BaseElement } from '../core/elements/BaseElement.js';
import { SelectElement } from '../core/elements/SelectElement.js';

export class RegistrationPage extends BasePage {
    constructor() {
        super();
        this.url = '/auth/register';
        this.firstNameInput = new BaseElement('#first_name');
        this.lastNameInput = new BaseElement('#last_name');
        this.dobInput = new BaseElement('#dob');
        this.streetInput = new BaseElement('#street');
        this.postalCodeInput = new BaseElement('#postal_code');
        this.cityInput = new BaseElement('#city');
        this.stateInput = new BaseElement('#state');
        this.countrySelect = new SelectElement('#country');
        this.phoneInput = new BaseElement('#phone');
        this.emailInput = new BaseElement('#email');
        this.passwordInput = new BaseElement('#password');
        this.submitButton = new BaseElement('button[type="submit"]');
    }

    async fillRegistrationForm({
        firstName = 'John',
        lastName = 'Doe',
        dob = '1990-01-01',
        street = 'Main Street 1',
        postalCode = '12345',
        city = 'Kyiv',
        state = 'Kyiv Region',
        country = 'Ukraine',
        phone = '123456789',
        email,
        password
    }) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.dobInput.setValue(dob);
        await this.streetInput.setValue(street);
        await this.postalCodeInput.setValue(postalCode);
        await this.cityInput.setValue(city);
        await this.stateInput.setValue(state);
        await this.countrySelect.selectByVisibleText(country);
        await this.phoneInput.setValue(phone);
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
    }

    async submitForm() {
        await this.submitButton.click();
    }
}