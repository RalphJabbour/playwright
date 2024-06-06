import {test, expect} from '@playwright/test';

test('Recommended built-in locators examples', async ({ page }) => {
    await page.goto('');

    const firstName = page.getByLabel('First name');
    await firstName.fill('Sofia');
    await firstName.clear();

    await page.getByLabel('First name').fill('Ralph');

    await page.getByRole('button', {name: 'Register', exact: true }).click();

    const warning = page.getByText('Valid last name is required');

    await expect(warning).toBeVisible();

    const feedback = page.locator('.invalid-feedback');
    await expect(feedback).toHaveCount(3);

    for(const message of await feedback.all()){
        console.log(`${await message.textContent()}`);
    }

});

test('Validation messages reset upon refresh', async ({ page }) => {
    await page.goto('/', {timeout: 8000});

    const submit = page.getByRole('button', {name: "Register", exact: true });
    await submit.click();

    const feedback = page.locator('.invalid-feedback');
    for(const message of await feedback.all()){
        await expect(message).toBeVisible()
    }

    await page.goto('/')

    for(const message of await feedback.all()){
        await expect(message).toBeHidden()
    }

})

test('Fill test', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('First name').fill('Ralph');
    await page.getByLabel('Date of birth').fill('2024-06-05');
}) 

test('Check test', async ({ page }) => {
    await page.goto('/');

    const checkbox = page.getByRole('checkbox');
    const textarea = page.locator('#textarea');
    const message = 'msg';

    await checkbox.check();
    await textarea.fill(message);

    await expect(textarea).toHaveValue(message);
})

test('select test', async ({ page }) => {

    page.on('dialog', dialog => dialog.accept() );
    await page.goto('/savings.html');

    const deposit = page.getByTestId('deposit');
    const period = page.getByTestId('period');
    const result = page.getByTestId('result');

    await deposit.fill('100');

    await period.selectOption('6 Months');

    await expect(result).toContainText('After 6 Months you will earn $2.00 on your deposit');
    await period.selectOption({label: '1 year'});

    await expect(result).toContainText('After 1 Year you will earn $5.00 on your deposit');
})

test('check console', async ({ page }) => {
    page.on('console', (msg) => {
        console.log(msg);
        expect.soft(msg.type()).not.toEqual('Error');
    });
    page.on('pageerror', (msg) => {
        console.log(msg);
        expect.soft(msg.name).not.toEqual('error');
    });

    page.goto('/');

    await page.getByRole('button', { name: 'Register' }).click();

})

test('cookies', async ({ page }) => {
    await page.goto('/');

    console.log(await page.context().cookies());

    await page.context().addCookies([{
        name: 'cookie1',
        value: 'abc',
        url: "https://playwright.dev/"
    }]);

    console.log(await page.context().cookies());
    await page.context().clearCookies();
    console.log(await page.context().cookies());
})  

const name = 'Sofia';

test('storage - test from the ui perspective', async ({ page }) => {
    await page.goto('/');

    const input = page.getByLabel('First name');
    await input.fill(name);
    await page.reload();
    await expect(input).toHaveValue('');

    input.fill(name);
    await page.getByRole('button', { name: 'Save Input' }).click();
    await page.reload();
    await expect(input).toHaveValue(name);
    
})

test('Local Storage', async ({ page }) => {
    await page.goto('/');
    page.getByLabel('First name').fill(name);
    await page.getByRole('button', { name: 'Save Input' }).click();

    const storage = await page.context().storageState();

    console.log(storage.cookies);
    console.log(storage.origins[0].localStorage);
})

// docker quick course
// also react refresher
// rancher for going around docker becvause companu policy refuses it
// they have a central repo for docker images
// ops deploy nexus projects sp tell tem whjem it is done
// task:
// run playwright through jenkins