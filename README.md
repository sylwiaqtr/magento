This is a Test Automation project based on `Playwright` and `TypeScript`.  
The tested page is a simple demo of a shop.
I recommend to use Visual Studio Code to run the tests.

## Commands

- check `NodeJS` version  
  `node -v`
- record tests for given site  
  `npx playwright codegen https://magento.softwaretestingboard.com/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- run Trace Viewer on zip file  
  `npx playwright show-trace trace.zip`
- run tests form exact file  
  `npx playwright test tests/add-to-cart.spec.ts`
  `npx playwright test tests/add-to-wishlist.spec.ts`
  `npx playwright test tests/order.spec.ts`
  `npx playwright test tests/registration.spec.ts`
  `npx playwright test tests/sign-in.spec.ts`

### Updating Playwright

- check if Playwright should be updated  
  `npm outdated @playwright/test`
- update Playwright  
  `npm i @playwright/test`
- update browsers  
  `npx playwright install`
- verify Playwright version  
  `npx @playwright/test --version`

## Visual Studio Code Extensions

- GitLens - view details of your repository i.e. commits history
- Prettier - default formatter for editor
- Playwright Test for VSCode - run and record tests form VSC

## Playwright

### Playwright Config modifications

- config file `playwright.config.ts`
- enable second browser
  ```javascript
      [
        {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
      ],
  ```
- enable video on fail
  ```javascript
  
      use: {
        video: {'retain-on-failure'},
  },
  ```
- enable Trace Viewer only on fail
  ```javascript
  use: {
      trace: {'retain-on-failure'},
  },
  ```

## Simple Page Object Model

Simple implementation of Page Object Model can be based on _classes_ that represents and implements tested pages or components.
Those calsses contains _locators_ of elements, that are used in tests, e.g. buttons, inputs etc.

Directory structure:

```
+-- Projects
|   +-- components
|       +-- top-menu.component.ts
|   +-- pages
|       +-- homepage.page.ts
|       +-- ...
|   +-- tests
|       +-- sign-in.spec.ts
|       +-- ...
```
