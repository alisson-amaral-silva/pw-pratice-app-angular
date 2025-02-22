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


test.skip("User facing examples", async ({page}) => {
  await page.getByRole("textbox", { name: "Email" }).first().fill("example@example.com")

  await page.getByRole("button", { name: "Sign in" }).first().click()

  await page.getByLabel("Email").first().click()

  await page.getByPlaceholder("Jane Doe").first().click()

  await page.getByText("Using the Grid").click()

  await page.getByTestId("SignIn").click()

  await page.getByTitle("IoT Dashboard").click()
})

test.skip("location child elements", async ({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button',{name: 'Sign in'}).first().click()

  await page.locator('nb-card').nth(3).getByRole('button').click()
})
