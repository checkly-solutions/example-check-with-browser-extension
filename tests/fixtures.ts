import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/*
  The Checkly CLI does not pick up non-executable files. So, we can't just create a folder for our
  browser extension in this repo -- the CLI won't include it when running and deploying your Browser check.

  To get around this, we convert our browser extension's source code into base64 strings. At run time, we'll write
  these strings as files, which Playwright will have access to.

  For reference, you can see my extension's source code in the `REFERENCE_simple-browser-extension`` folder.
  */
const manifestBase64 = 'ewogICJtYW5pZmVzdF92ZXJzaW9uIjogMywKICAibmFtZSI6ICJTaW1wbGUgVGV4dCBJbmplY3RvciIsCiAgInZlcnNpb24iOiAiMS4wIiwKICAiZGVzY3JpcHRpb24iOiAiQWRkcyB0ZXh0IHRvIHRoZSB0b3Agb2YgZXZlcnkgd2VicGFnZSIsCiAgImNvbnRlbnRfc2NyaXB0cyI6IFsKICAgIHsKICAgICAgIm1hdGNoZXMiOiBbIjxhbGxfdXJscz4iXSwKICAgICAgImpzIjogWyJjb250ZW50LmpzIl0sCiAgICAgICJydW5fYXQiOiAiZG9jdW1lbnRfZW5kIgogICAgfQogIF0KfQ=='
const contentBase64 = 'Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CmRpdi50ZXh0Q29udGVudCA9ICdIZWxsbywgdGhpcyBpcyBhIGJyb3dzZXIgZXh0ZW5zaW9uISc7CmRpdi5zdHlsZS5jc3NUZXh0ID0gJ2JhY2tncm91bmQ6ICM0Q0FGNTA7IGNvbG9yOiB3aGl0ZTsgcGFkZGluZzogMTBweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMTZweDsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyB6LWluZGV4OiA5OTk5OTk7JzsKZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW5Ub3AgPSAnNDBweCc7CmRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGRpdiwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTs='

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({ }, use) => {
    // create folder for our extension
    fs.mkdirSync('simple-browser-extension');

    // write the content.js base64 string as a file
    fs.writeFile('simple-browser-extension/content.js', contentBase64, 'base64', error => {
      if (error) {
          throw error;
      } else {
          console.log('Saved content.js file');
      }
    });

    // write the manifest.json base64 string as a file
    fs.writeFile('simple-browser-extension/manifest.json', manifestBase64, 'base64', error => {
      if (error) {
          throw error;
      } else {
          console.log('Saved manifest.json file');
      }
    });

    // print both files in the console, to show that they were written properly
    fs.readFile('simple-browser-extension/content.js', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });

    fs.readFile('simple-browser-extension/manifest.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });

    // set up the extension
    // this is copied from Playwright's example:
    // https://playwright.dev/docs/chrome-extensions
    const pathToExtension = 'simple-browser-extension';
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    // for manifest v3:
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker)
      serviceWorker = await context.waitForEvent('serviceworker');

    const extensionId = serviceWorker.url().split('/')[2];
    await use(extensionId);
  },
});
export const expect = test.expect;