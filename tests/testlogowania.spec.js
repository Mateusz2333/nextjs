const { test, expect } = require('@playwright/test');

test('should login and navigate to user profile page', async ({ page }) => {
  // Otwórz stronę logowania
  await page.goto('http://localhost:3000/public/user/signin');

  // Wypełnij formularz logowania
  await page.fill('#email', 'mateusz.nowak1@Microsoft.wsei.edu.pl');
  await page.fill('#password', 'password1');

  // Zatwierdź formularz
  await page.click('button[type="submit"]');

  // Poczekaj, aż strona przeładuje się po zalogowaniu
  await page.waitForLoadState('load');

  // Teraz po zalogowaniu sprawdzimy, czy użytkownik ma dostęp do strony swojego profilu
  // Spróbuj przejść na stronę profilu użytkownika
  await page.goto('http://localhost:3000/protected/user/profile');

  // Sprawdź, czy po zalogowaniu użytkownik ma dostęp do strony profilu
  await expect(page).toHaveURL('http://localhost:3000/protected/user/profile');
});
 