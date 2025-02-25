import { expect, Page } from '@playwright/test';

export class DatePickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder('Form Picker');
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday,
    );

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDateFromToday: number,
  ) {
    const calendarInputField = this.page.getByPlaceholder('Range Picker');
    await calendarInputField.click();
    const dateToAssertStart =
      await this.selectDateInTheCalendar(startDayFromToday, true);

    const dateToAssertEnd =
      await this.selectDateInTheCalendar(endDateFromToday, true);

    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalendar(
    numberOfDaysFromToday: number,
    isRange: boolean = false,
  ) {
    let date = new Date();

    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString('En-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator('nb-calendar-view-mode')
      .textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();

      calendarMonthAndYear = await this.page
        .locator('nb-calendar-view-mode')
        .textContent();
    }
    if (isRange)
      await this.page
        .locator('[class="range-cell day-cell ng-star-inserted"]')
        .getByText(expectedDate, { exact: true })
        .click();
    else
      await this.page
        .locator('[class="day-cell ng-star-inserted"]')
        .getByText(expectedDate, { exact: true })
        .click();

    return dateToAssert;
  }
}
