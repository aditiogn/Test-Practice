// pages/LoginPage.js
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  // Navigate to login page
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Verify login page loaded
  async verifyLoginPage() {
    await expect(this.loginLogo).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  // Login action
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Login with standard user
  async loginAsStandardUser() {
    await this.login('standard_user', 'secret_sauce');
  }

  // Verify login failed
  async verifyErrorMessage(message) {
    await expect(this.errorMessage).toContainText(message);
  }
}