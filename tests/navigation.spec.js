const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
  // Otwórz stronę główną
  await page.goto('http://localhost:3000/');

  // Kliknij w link z tekstem "Sign In"
  await page.getByText('Sign In').click();

  // Sprawdź, czy otworzyła się strona logowania
  await expect(page).toHaveURL('http://localhost:3000/public/user/signin');

  // Sprawdź, czy na stronie logowania jest nagłówek z tekstem "Login"
  await expect(page.locator('h2')).toContainText('Login');
});
