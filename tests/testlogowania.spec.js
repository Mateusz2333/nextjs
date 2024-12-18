const { test, expect } = require('@playwright/test');

test('should login and navigate to user profile page', async ({ page }) => {
  
  await page.goto('http://localhost:3000/public/user/signin');

  await page.fill('#email', 'mateusz.nowak1@Microsoft.wsei.edu.pl');
  await page.fill('#password', 'password1');
  
  await page.click('button[type="submit"]');
  
  await page.waitForLoadState('load');
  
  await page.goto('http://localhost:3000/protected/user/profile');

  await expect(page).toHaveURL('http://localhost:3000/protected/user/profile');
});
 