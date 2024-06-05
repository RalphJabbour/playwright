import {test, expect} from '@playwright/test';

test('Test with page fixture', async ({ page }) => {

    await page.goto('https://www.whatsmybrowser.org/');

    console.log("text content" , await page.title());
});

test('Other fixtures', async ({ browserName, browser, context, page }) => {

    const page1 = await context.newPage();
    const page2 = await context.newPage();
});

test('Simple assertions', async () => {
    expect(null).toBeFalsy;
    expect(2).toBeLessThan(3);
})

test('Test with simple auto-retrying', async ({page}) => {
    await page.goto('http://localhost:3000/');

    await expect(page.getByTestId('location')).toContainText('New York');

    await expect(page).toHaveTitle('Credit Association');
    await expect(page).toHaveURL('http://localhost:3000');

})