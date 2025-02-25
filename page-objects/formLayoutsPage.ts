import { Page } from '@playwright/test';

export class FormLayoutsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string,
  ) {
    const basicForm = this.page
      .locator('nb-card')
      .filter({ hasText: 'Using the Grid' });

    await basicForm.getByRole('textbox', { name: 'Email' }).fill(email);
    await basicForm.getByRole('textbox', { name: 'Password' }).fill(password);

    await basicForm
      .getByRole('radio', { name: optionText })
      .check({ force: true });

    await basicForm.getByRole('button', { name: 'Sign In' }).click();
  }


  /**
   * this method will fill out the inline form with user details
   * @param name - first/last name
   * @param email - valid email for the test user
   * @param rememberMe - true/false
   */

  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean,
  ) {
    const inlineForm = this.page
      .locator('nb-card')
      .filter({ hasText: 'Inline form' });

    await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name);
    await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);

    if (rememberMe)
      await inlineForm.getByRole('checkbox').check({ force: true });

    await inlineForm.getByRole('button').click();
  }
}
