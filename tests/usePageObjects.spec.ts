import test from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datepickerPage';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test('navigate to form page', async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.datePickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
});

test('parametrized methods', async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);
  const onDatepickerPage = new DatePickerPage(page);

  await navigateTo.formLayoutsPage();
  await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    'email@email.com',
    'M1234',
    'Option 1',
  );

  await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    'John Doe',
    'johndoe@example.com',
    true,
  );

  await navigateTo.datePickerPage();

  await onDatepickerPage.selectCommonDatePickerDateFromToday(1);

  await onDatepickerPage.selectDatepickerWithRangeFromToday(1, 2);
});
