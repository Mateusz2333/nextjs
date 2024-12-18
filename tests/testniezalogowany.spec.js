const { test, expect } = require('@playwright/test');

test('should redirect unauthenticated users to login page', async ({ page }) => {
  
  await page.goto('http://localhost:3000/protected/user/profile');

  await expect(page).toHaveURL('http://localhost:3000/public/user/signin?returnUrl=/protected/user/profile');
});
