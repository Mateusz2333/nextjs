const { test, expect } = require('@playwright/test');

test('should redirect unauthenticated users to login page', async ({ page }) => {
  // Spróbuj przejść do strony, która wymaga bycia zalogowanym
  await page.goto('http://localhost:3000/protected/user/profile');

  // Sprawdź, czy po próbie przejścia na stronę chronioną użytkownik zostaje przekierowany na stronę logowania
  await expect(page).toHaveURL('http://localhost:3000/public/user/signin?returnUrl=/protected/user/profile');
});
