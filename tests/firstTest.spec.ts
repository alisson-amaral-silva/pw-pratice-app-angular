import test from "@playwright/test";

test.beforeEach(async () => {

})

test('the first test', async ({page}) => {
  await page.goto('http://localhost:4200');

  await page.getByText("forms").click();

  await page.getByText("Form Layouts").click();
})


test("navigate to datepicker page", async ({page}) => {
  await page.goto('http://localhost:4200');

  await page.getByText("forms").click();

})
