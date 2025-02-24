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

  const allBoxes = page.getByRole('checkbox');
  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test('list and dropdown', async ({ page }) => {
  const dropdownMenu = page.locator('ngx-header nb-select');
  await dropdownMenu.click();

  page.getByRole('list');
  page.getByRole('listitem');

  // const optionList = page.getByRole('list').locator('nb-option')
  const optionList = page.locator('nb-option-list nb-option');
  await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);

  await optionList.filter({ hasText: 'Cosmic' }).click();

  const header = page.locator('nb-layout-header');
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');
});

test('tooltips', async ({ page }) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Tooltip').click();

  const tooltipCard = page.locator('nb-card', {
    hasText: 'Tooltip Placements',
  });
  await tooltipCard.getByRole('button', { name: 'Top' }).hover();

  page.getByRole('tooltip'); //if you have a role tooltip created
  const tooltip = await page.locator('nb-tooltip').textContent();
  expect(tooltip).toEqual('This is a tooltip');
});

test('dialogs', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  page.on('dialog', (dialog) => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?');
    dialog.accept();
  });

  await page
    .getByRole('table')
    .locator('tr', { hasText: 'mdo@gmail.com' })
    .locator('.nb-trash')
    .click();

  await expect(page.locator('table tr').first()).not.toHaveText(
    'mdo@gmail.com',
  );
});

test('web tables', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  // 1 get the row by any test in this row
  const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });
  await targetRow.locator('.nb-edit').click();

  await page.locator('input-editor').getByPlaceholder('Age').clear();
  await page.locator('input-editor').getByPlaceholder('Age').fill('35');

  await page.locator('.nb-checkmark').click();

  // 2 get the row basedon the value in the specific column
  await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
  const targetRowById = page
    .getByRole('row', { name: '11' })
    .filter({ has: page.locator('td').nth(1).getByText('11') });

  await targetRowById.locator('.nb-edit').click();
  await page.locator('input-editor').getByPlaceholder('E-mail').clear();
  await page
    .locator('input-editor')
    .getByPlaceholder('E-mail')
    .fill('test@test.com');
  await page.locator('.nb-checkmark').click();

  await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');

  // 3 test filter of the table
  const ages = ['20', '30', '40', '200'];

  for (let age of ages) {
    await page.locator('input-filter').getByPlaceholder('Age').clear();
    await page.locator('input-filter').getByPlaceholder('Age').fill(age);

    await page.waitForTimeout(500);

    const ageRows = page.locator('tbody tr');

    for (let row of await ageRows.all()) {
      const cellValue = await row.locator('td').last().textContent();

      if (age == '200')
        expect(await page.getByRole('table').textContent()).toContain(
          'No data found',
        );
      else expect(cellValue).toEqual(age);
    }
  }
});

test('datepicker', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();

  const calendarInputField = page.getByPlaceholder('Form Picker');
  await calendarInputField.click();

  let date = new Date();

  date.setDate(date.getDate() + 14);
  const expectedDate = date.getDate().toString();
  const expectedMonthShot = date.toLocaleString('En-US', { month: 'short' });
  const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page
    .locator('nb-calendar-view-mode')
    .textContent();
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();

    calendarMonthAndYear = await page
      .locator('nb-calendar-view-mode')
      .textContent();
  }

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click();

  await expect(calendarInputField).toHaveValue(dateToAssert);
});
