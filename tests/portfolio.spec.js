const { test, expect } = require('@playwright/test');

test.describe('Portfolio Website', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the local server
        await page.goto('http://localhost:8080/');
    });

    test('should have the correct title and hero name', async ({ page }) => {
        await expect(page).toHaveTitle(/Portfolio/);
        const nameHeading = page.locator('h1');
        await expect(nameHeading).toContainText('Sidtisak Hanthongchai');
    });

    test('should have working smooth scrolling navigation', async ({ page }) => {
        // Click on the About menu link
        await page.click('nav a[href="#about"]');
        
        // Wait for scrolling to finish
        await page.waitForTimeout(500);

        // Check if the URL contains the hash
        expect(page.url()).toContain('#about');
        
        // Verify the About section is visible
        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeInViewport();
    });

    test('should display all 3 projects in the portfolio section', async ({ page }) => {
        // Ensure there are 3 project cards in the works section
        const projectCards = page.locator('#works h3');
        await expect(projectCards).toHaveCount(3);
        
        // Check for specific project titles
        await expect(page.locator('#works h3', { hasText: 'Srichai Property' })).toBeVisible();
        await expect(page.locator('#works h3', { hasText: 'GameStore' })).toBeVisible();
        await expect(page.locator('#works h3', { hasText: 'Property Viewing App' })).toBeVisible();
    });

    test('should display experience and education in the experience section', async ({ page }) => {
        await expect(page.locator('#experience h3', { hasText: 'Data Analyst Intern' })).toBeVisible();
        await expect(page.locator('#experience h3', { hasText: 'B.Sc. in ICT' })).toBeVisible();
    });

    test('should have a contact form with Netlify attributes', async ({ page }) => {
        const form = page.locator('form[data-netlify="true"]');
        await expect(form).toBeVisible();
        
        // Check form fields
        await expect(form.locator('input[type="text"]')).toBeVisible();
        await expect(form.locator('input[type="email"]')).toBeVisible();
        await expect(form.locator('textarea')).toBeVisible();
        await expect(form.locator('button[type="submit"]')).toBeVisible();
    });
});
