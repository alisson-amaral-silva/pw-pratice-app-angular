import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test('input fields', async ({ page }) => {
    const basicForm = page
      .locator('nb-card')
      .filter({ hasText: 'Using the Grid' });
    const inputEmail = basicForm.getByRole('textbox', { name: 'Email' });

    await inputEmail.fill('example@example.com');

    // generic assertion
    const inputValue = await inputEmail.inputValue();
    expect(inputValue).toEqual('example@example.com');

    // locator assertion
    await expect(inputEmail).toHaveValue('example@example.com');
  });

  test('radio buttons', async ({ page }) => {
    const basicForm = page
      .locator('nb-card')
      .filter({ hasText: 'Using the Grid' });

    // await basicForm.getByLabel('Option 1').check({ force: true });
    await basicForm
      .getByRole('radio', { name: 'Option 1' })
      .check({ force: true });

    const radioStatus = await basicForm
      .getByRole('radio', { name: 'Option 1' })
      .isChecked();

    expect(radioStatus).toBeTruthy();

    await expect(
      basicForm.getByRole('radio', { name: 'Option 1' }),
    ).toBeChecked();

    await basicForm
      .getByRole('radio', { name: 'Option 2' })
      .check({ force: true });

    await expect(
      basicForm.getByRole('radio', { name: 'Option 1' }),
    ).not.toBeChecked();
  });
});

test('checkboxes', async ({ page }) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Toastr').click();

  await page
    .getByRole('checkbox', { name: 'Hide on click' })
    .uncheck({ force: true });

  await page
    .getByRole('checkbox', { name: 'Prevent arising of duplicate toast' })
    .check({ force: true });


  const allBoxes = page.getByRole('checkbox')
  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});
