import { expect } from "@wdio/globals";

export function generateUniqueEmail() {
  const timestamp = Date.now();
  return `user${timestamp}@example.com`;
}

export function generatePassword() {
  return `AHellOoa@${Math.floor(Math.random() * 100000)}`;
}

export function newPhone(length = 8) {
  return `380${Math.floor(100000000 + Math.random() * 900000000)}`;
}

export function newName(length = 8) {
  return `John${Math.floor(Math.random() * 1000)}`;
}

export async function registerNewUser() {
  await browser.url("/auth/register");
  const email = generateUniqueEmail();
  const password = generatePassword();
  const phoneNumber = newPhone();

  await $("#first_name").setValue("John");
  await $("#last_name").setValue("Doe");
  await $("#dob").setValue("1990-01-01");
  await $("#street").setValue("Main Street 1");
  await $("#postal_code").setValue("12345");
  await $("#city").setValue("Kyiv");
  await $("#state").setValue("Kyiv Region");
  await $("#country").selectByVisibleText("Ukraine");
  await $("#phone").setValue(phoneNumber);
  await $("#email").setValue(email);
  await $("#password").setValue(password);
  await $('button[type="submit"]').click();

  const loginForm = await $(".auth-form");
  await loginForm.waitForDisplayed({ timeout: 15000 });

  return { email, password };
}

export async function loginUser() {
  const { email, password } = await registerNewUser();
  await browser.pause(1000);

  await browser.url("/auth/login");
  await browser.pause(1000);
  const emailField = await $("#email");
  await emailField.waitForDisplayed({ timeout: 5000 });
  await emailField.setValue(email);

  const passwordField = await $("#password");
  await passwordField.waitForDisplayed({ timeout: 5000 });
  await passwordField.setValue(password);

  const submitButton = await $('input[data-test="login-submit"]');
  await submitButton.waitForClickable({ timeout: 5000 });
  await browser.pause(1000);

  await submitButton.click();

  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account"),
    {
      timeout: 10000,
      timeoutMsg: "Login did not redirect to /account",
    }
  );

  return { email, password };
}
