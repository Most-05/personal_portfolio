const { chromium } = require('@playwright/test');
const path = require('path');

async function capture() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

    // Desktop Screenshot
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(indexPath, { waitUntil: 'networkidle' });
    
    // Trigger scroll through whole page to activate all AOS animations
    await page.evaluate(async () => {
        for (let i = 0; i < document.body.scrollHeight; i += 200) {
            window.scrollTo(0, i);
            await new Promise(r => setTimeout(r, 50));
        }
    });
    await page.waitForTimeout(600);

    // Scroll to contact area to verify transition from experience to contact
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    await page.screenshot({ path: path.resolve(__dirname, '../test-results/desktop-contact.png') });

    // Mobile Screenshot
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(async () => {
        for (let i = 0; i < document.body.scrollHeight; i += 200) {
            window.scrollTo(0, i);
            await new Promise(r => setTimeout(r, 50));
        }
    });
    await contact.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.resolve(__dirname, '../test-results/mobile-contact.png') });

    await browser.close();
    console.log('Screenshots captured successfully with AOS triggers');
}

capture().catch(err => {
    console.error(err);
    process.exit(1);
});
