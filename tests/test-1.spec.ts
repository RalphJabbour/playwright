import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Savings' }).click();
  await page.getByTestId('period').selectOption('1 Year');
  await page.getByTestId('period').selectOption('2 Years');
  await page.getByTestId('period').selectOption('6 Months');

});