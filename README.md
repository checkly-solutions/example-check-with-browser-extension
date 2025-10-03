# Checkly - Browser check with extension example

This is an example that shows a Browser check running with a simple browser extension.

## Try it out!

First, install packages: `npm install`

Then, run `npx checky test --record` to run this Browser check as a test session.

## File structure

### REFERENCE_simple-browser-extension

The Browser extension I'm running in my test, for reference. It displays a green banner at the top of each page that says "Hello, this is a browser extension!"

### /tests/example.spec.ts

Contains the Playwright spec file for our Browser check. 

### /tests/fixtures.ts

Sets up out browser extension to be used in `example.spec.ts`. This is an example pulled from https://playwright.dev/docs/chrome-extensions and has been modified to work for Checkly. For more details, please refer to that Playwright documentation page.

## Limitations

* Only works on chromium
* This is a simple example. I have not validated how well this works as a deployed monitor or with more complex examples.
* This may not work if your browser extension is too large. This example converts the browser extension source code into base64 strings. Checkly has file size limits, which you'll hit if your browser extension source code is too large. 
  * You might be able to work around this by [hosting your extension in a public location](https://www.checklyhq.com/docs/detect/synthetic-monitoring/multistep-checks/file-system/#testing-uploads-using-http-post-requests), and retrieving it in your test script.