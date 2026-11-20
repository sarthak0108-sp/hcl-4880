# Testing Frontend

This repository contains two small projects for practicing JavaScript and React testing.

## Projects

### `node-test`

A Node.js ES module with greeting helpers and an order processor that accepts a payment function as a dependency. The tests use Node's built-in test runner and mock the payment function so the order test does not make a real payment.

Run the tests from this directory:

```powershell
cd node-test
npm test
```

The current suite checks English and Hindi greetings and confirms that `processOrder` passes the order amount to the injected payment function and returns its result.

### `jest-demo-react`

A React 19 application built with Vite. It currently renders a simple `Jesting in React` heading. Development dependencies include Jest, Babel, `jest-environment-jsdom`, React Testing Library, `user-event`, `jest-dom`, and `identity-obj-proxy` for setting up component tests.

Run the app or build it from this directory:

```powershell
cd jest-demo-react
npm install
npm run dev
```

Other available scripts are:

```powershell
npm test
npm run test:watch
npm run test:coverage
npm run build
npm run lint
```

The Jest dependencies are installed, but this project does not yet include Jest configuration or React component test files.
