import { test, expect } from '@playwright/test';

test.describe('Star Wars App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main title', async ({ page }) => {
    const title = page.getByRole('heading', { name: /characters/i });
    await expect(title).toBeVisible();
  });

  test('should search for a character', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search characters\.\.\./i);
    await searchInput.fill('Luke');
    await searchInput.press('Enter');

    // Wait for the results to update. 
    // Since it's a server action or navigation, we can check the URL or the content.
    await expect(page).toHaveURL(/.*search=Luke/);
    
    const characterName = page.getByText('Luke Skywalker');
    await expect(characterName).toBeVisible();
  });
});
