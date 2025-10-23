import { Given, When, Then } from "@wdio/cucumber-framework";
//import { expect } from "@wdio/globals";

Given(/^the user is on the main page$/, async () => {
  await browser.url("/");
  await browser.pause(1000);
});