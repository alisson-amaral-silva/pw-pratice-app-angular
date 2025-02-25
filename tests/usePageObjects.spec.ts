import test from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test('navigate to form page', async ({ page }) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test('parametrized methods', async ({ page }) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formLayoutsPage();
  await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(
    'email@email.com',
    'M1234',
    'Option 1',
  );

  await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(
    'John Doe',
    'johndoe@example.com',
    true,
  );

  await pm.navigateTo().datePickerPage();

  await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(1);

  await pm.onDatePickerPage().selectDatepickerWithRangeFromToday(1, 2);
});
