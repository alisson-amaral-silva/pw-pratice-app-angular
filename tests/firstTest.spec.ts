import test from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200');

  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();

})

test.skip('Locator syntax rules', async ({page}) => {
  // by tag name
  page.locator('input')

  // by id
  page.locator('#inputEmail')

  //by class value
  page.locator('.shape-rectangle')

  // by attribute
  page.locator('[placeholder="Email"]')

  // by entire class value
  page.locator('class="shape-rectangle shape-circle"')

  // combine different selectors without spaces
  page.locator('input[placeholder="Email"][nbinput]')

  // exact text match
  page.locator(':text-is("Using the grid")')

  // partial match
  page.locator(':text("Using")')
})
