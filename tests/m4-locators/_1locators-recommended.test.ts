import {test, expect} from '@playwright/test';

test('Recommended built-in locators examples', async ({ page }) => {
    await page.goto('');

    const firstName = page.getByLabel('First name');
    await firstName.fill('Sofia');
    await firstName.clear();

    await page.getByLabel('First name').fill('Ralph');
});