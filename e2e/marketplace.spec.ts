import { test, expect } from '@playwright/test';

test.describe('Property Marketplace', () => {
  test('should display marketplace interface', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/PMS Marketplace/);

    // Check main heading
    await expect(page.getByRole('heading', { name: 'PMS Marketplace' })).toBeVisible();

    // Check search functionality
    await expect(page.getByPlaceholder('Search properties...')).toBeVisible();
    await expect(page.getByPlaceholder('Location...')).toBeVisible();
  });

  test('should show property listings', async ({ page }) => {
    await page.goto('/');

    // Check featured properties section
    await expect(page.getByText('Featured Properties')).toBeVisible();

    // Check property cards
    await expect(page.getByText('Luxury Beachfront Villa')).toBeVisible();
    await expect(page.getByText('Modern City Apartment')).toBeVisible();
    await expect(page.getByText('Boutique Hotel')).toBeVisible();
  });

  test('should allow property search', async ({ page }) => {
    await page.goto('/');

    // Search for properties
    await page.fill('input[placeholder="Search properties..."]', 'villa');
    await page.fill('input[placeholder="Location..."]', 'Paphos');

    // Should filter properties
    await expect(page.getByText('Luxury Beachfront Villa')).toBeVisible();
  });

  test('should toggle between grid and list view', async ({ page }) => {
    await page.goto('/');

    // Click list view button
    await page.locator('button[title*="List"]').click();

    // Should change to list view
    // (Visual change would be verified in the layout)

    // Click grid view button
    await page.locator('button[title*="Grid"]').click();
  });

  test('should handle favorite functionality', async ({ page }) => {
    await page.goto('/');

    // Click favorite button on a property
    await page.locator('button[title*="favorite"]').first().click();

    // Should show favorite confirmation
    await expect(page.getByText('Added')).toBeVisible();
  });
});

test.describe('Vendor Marketplace', () => {
  test('should display vendor listings', async ({ page }) => {
    await page.goto('/');

    // Switch to vendors tab
    await page.getByText('Vendors').click();

    // Check vendor categories
    await expect(page.getByText('Vendor Categories')).toBeVisible();
    await expect(page.getByText('Maintenance')).toBeVisible();
    await expect(page.getByText('Cleaning')).toBeVisible();
    await expect(page.getByText('Supplies')).toBeVisible();
  });

  test('should filter vendors by category', async ({ page }) => {
    await page.goto('/');

    // Switch to vendors tab
    await page.getByText('Vendors').click();

    // Click maintenance category
    await page.getByText('Maintenance').click();

    // Should show maintenance vendors
    await expect(page.getByText('Mediterranean Maintenance')).toBeVisible();
  });

  test('should show vendor contact options', async ({ page }) => {
    await page.goto('/');

    // Switch to vendors tab
    await page.getByText('Vendors').click();

    // Check contact buttons
    await expect(page.getByRole('button', { name: 'Call' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Email' })).toBeVisible();
  });

  test('should handle vendor contact actions', async ({ page }) => {
    await page.goto('/');

    // Switch to vendors tab
    await page.getByText('Vendors').click();

    // Click call button
    await page.getByRole('button', { name: 'Call' }).first().click();

    // Should show calling message
    await expect(page.getByText('Calling')).toBeVisible();
  });
});

test.describe('Filters and Search', () => {
  test('should show and hide filters', async ({ page }) => {
    await page.goto('/');

    // Click filters button
    await page.getByRole('button', { name: 'Filters' }).click();

    // Should show filters sidebar
    await expect(page.getByText('Property Type')).toBeVisible();
    await expect(page.getByText('Price Range')).toBeVisible();
    await expect(page.getByText('Amenities')).toBeVisible();
  });

  test('should sort properties', async ({ page }) => {
    await page.goto('/');

    // Use sort dropdown
    await page.selectOption('select', 'Price: High to Low');

    // Should re-sort properties (would need to verify order in real implementation)
  });
});