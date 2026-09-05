const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Portfolio Website Tests', () => {
    const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

    test('Desktop: should render title, sections, dark mode, and verify testimonials is removed', async ({ page }) => {
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') consoleErrors.push(msg.text());
        });

        await page.goto(indexPath);

        // 1. Verify Page Title
        await expect(page).toHaveTitle(/Portfolio/);

        // 2. Verify Hero Heading
        const firstName = page.locator('h1').first();
        const lastName = page.locator('h1').nth(1);
        await expect(firstName).toContainText('Sidtisak');
        await expect(lastName).toContainText('Hanthongchai');

        // 3. Verify Testimonials section is completely removed
        const testimonials = page.locator('#testimonials');
        await expect(testimonials).toHaveCount(0);
        await expect(page.locator('text=เสียงจากผู้ร่วมงาน')).toHaveCount(0);

        // 4. Verify Projects are displayed
        const worksSection = page.locator('#projects');
        await expect(worksSection).toBeVisible();

        // 5. Verify Contact section exists
        const contactSection = page.locator('#contact');
        await expect(contactSection).toBeVisible();

        // 6. Test Dark Mode toggle
        const htmlElement = page.locator('html');
        const themeToggle = page.locator('#theme-toggle');
        if (await themeToggle.isVisible()) {
            const initialIsDark = await htmlElement.evaluate(el => el.classList.contains('dark'));
            await themeToggle.click();
            const afterClickIsDark = await htmlElement.evaluate(el => el.classList.contains('dark'));
            expect(afterClickIsDark).toBe(!initialIsDark);
        }

        // 7. Check no critical JS console errors
        expect(consoleErrors).toEqual([]);
    });

    test('Mobile Viewport: should render smoothly on iPhone/mobile size', async ({ page }) => {
        // Set mobile viewport (iPhone 13 size: 390x844)
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(indexPath);

        // Verify Hero displays properly on mobile
        const firstName = page.locator('h1').first();
        await expect(firstName).toBeVisible();

        // Verify Testimonials is not present on mobile
        await expect(page.locator('#testimonials')).toHaveCount(0);

        // Verify Contact section is reachable and visible
        const contact = page.locator('#contact');
        await contact.scrollIntoViewIfNeeded();
        await expect(contact).toBeVisible();
    });
});
