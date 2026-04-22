// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SauceDemo Login Feature', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyLoginPage();
  });

  test('Verify user can login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Verify user cannot login with invalid password', async () => {
    await loginPage.login('standard_user', 'wrong_password');

    await loginPage.verifyErrorMessage(
      'Epic sadface: Username and password do not match'
    );
  });

  test('Verify user cannot login with empty username and password', async () => {
    await loginPage.login('', '');

    await loginPage.verifyErrorMessage(
      'Epic sadface: Username is required'
    );
  });

  test('Verify locked out user cannot login', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.verifyErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('Verify standard user can login using reusable method', async ({ page }) => {
    await loginPage.loginAsStandardUser();

    await expect(page).toHaveURL(/inventory/);
  });
});