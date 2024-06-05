import {test, chromium} from '@playwright/test';

test('Test with page fixture', async ({ page }) => {

    await page.goto('https://www.playwright.dev/');

    console.log("text content" , await page.title());
});