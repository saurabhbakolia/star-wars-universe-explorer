import { test, expect } from '@playwright/test';

test.describe('Star Wars Explorer', () => {
  test('should load the characters page', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is visible
    await expect(page.getByText('Characters')).toBeVisible();
    
    // Check if search bar is present
    const searchBar = page.getByPlaceholder('Search characters by name...');
    await expect(searchBar).toBeVisible();
  });

  test('should navigate to starships page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Starships navigation link
    await page.getByRole('link', { name: 'Starships' }).click();
    
    // Verify we're on the starships page
    await expect(page.getByText('Starships')).toBeVisible();
    await expect(page.getByPlaceholder('Search starships by name...')).toBeVisible();
  });

  test('should navigate to films page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Films navigation link
    await page.getByRole('link', { name: 'Films' }).click();
    
    // Verify we're on the films page
    await expect(page.getByText('Films')).toBeVisible();
  });

  test('should search for characters', async ({ page }) => {
    await page.goto('/');
    
    // Type in search bar
    const searchBar = page.getByPlaceholder('Search characters by name...');
    await searchBar.fill('Luke');
    
    // Wait for results to load (search is debounced)
    await page.waitForTimeout(500);
    
    // Verify search results appear (or no results message)
    const hasResults = await page.getByText('No characters found').isVisible().catch(() => false);
    const hasCharacters = await page.locator('[data-testid="character-card"]').count().catch(() => 0);
    
    // Either we have results or a no results message
    expect(hasResults || hasCharacters > 0).toBeTruthy();
  });
});
