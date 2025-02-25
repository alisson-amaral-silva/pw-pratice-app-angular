import { Page } from '@playwright/test';
import { DatePickerPage } from '../page-objects/datepickerPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { NavigationPage } from '../page-objects/navigationPage';

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutsPage: FormLayoutsPage;
  private readonly datePickerPage: DatePickerPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(page);
    this.formLayoutsPage = new FormLayoutsPage(page);
    this.datePickerPage = new DatePickerPage(page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage;
  }

  onDatePickerPage() {
    return this.datePickerPage;
  }
}
