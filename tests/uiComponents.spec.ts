import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});


test.describe("Form Layouts page", () => {

  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test('basic form', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: 'Using the Grid' });
    const inputEmail = basicForm.getByRole('textbox',{name: 'Email'});

    await inputEmail.fill('example@example.com');

    // generic assertion
    const inputValue = await inputEmail.inputValue();
    expect(inputValue).toEqual('example@example.com');

    // locator assertion
    await expect(inputEmail).toHaveValue('example@example.com');
  });
})
