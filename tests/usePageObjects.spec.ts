import test from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test('navigate to form page', async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test('parametrized methods', async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.toLocaleLowerCase().replace(' ','')}${faker.number.int({ max: 90 })}@test.com`;

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      randomEmail,
      'M1234',
      'Option 1',
    );

  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      true,
    );

  await pm.navigateTo().datePickerPage();

  await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(1);

  await pm.onDatePickerPage().selectDatepickerWithRangeFromToday(1, 2);
});
