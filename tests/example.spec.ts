import { test, expect } from './fixtures';

test('example test', async ({ page }) => {
  // Checkly test webpage
  await page.goto('https://d1bbfdsgfzxlr2.cloudfront.net/index.html');

  // Assert that the extension is working
  await expect(page.getByText('Hello, this is a browser extension!')).toBeVisible();
});