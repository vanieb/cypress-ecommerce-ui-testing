# SauceDemo E-Commerce UI Regression Testing

**Cypress + JavaScript | 37 Automated Test Scenarios | 5 Modules**

A web UI automation portfolio project demonstrating functional and regression testing of [SauceDemo](https://www.saucedemo.com/), a public e-commerce practice application.

The project covers authentication, product browsing, shopping cart operations, checkout, and session management using Cypress and JavaScript. It emphasizes reusable automation workflows, reliable selectors, independent test execution, and meaningful assertions.

## Test Coverage

| Module | Test Cases | Coverage |
|---|---:|---|
| Login | 7 | Valid and invalid credentials, required fields, locked-out user |
| Products | 6 | Product listing, sorting, product details, navigation |
| Shopping Cart | 10 | Add/remove products, cart count, navigation, persistence |
| Checkout | 8 | Required fields, order summary, tax calculations, purchase completion, cancellation |
| Session | 6 | Logout, session validation, unauthorized access to protected pages |
| **Total** | **37** | **Functional and negative testing** |

## Tools and Technologies

- **Cypress 16.2.0** — End-to-end web UI automation
- **JavaScript** — Test scripts, custom commands, and reusable assertions
- **Node.js and pnpm** — Runtime and dependency management
- **Mochawesome** — HTML test reporting and execution results
- **GitHub Actions** — CI/CD workflow configuration
- **JSON Fixtures** — Test data management
- **Git and GitHub** — Version control and portfolio hosting

## Automation Design Practices

- **Independent tests:** Uses Cypress test isolation to prevent unintended state sharing.
- **Reusable custom commands:** Centralizes common workflows such as login, adding products, and starting checkout.
- **Stable selectors:** Prioritizes SauceDemo's `data-test` attributes to reduce selector fragility.
- **Reusable assertions:** Shared functions validate product information, cart items, and checkout calculations.
- **Data-driven testing:** Uses JSON fixtures and reusable test data for positive and negative scenarios.
- **Dynamic assertions:** Calculates expected cart counts and checkout totals from selected products.
- **Reliable execution:** Uses Cypress automatic retryability instead of fixed waits.
- **Maintainable architecture:** Separates test scenarios, fixtures, commands, and assertions without unnecessary Page Object Model abstraction.

## Project Structure

```text
cypress-ecommerce-ui-testing/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   ├── products.cy.js
│   │   ├── cart.cy.js
│   │   ├── checkout.cy.js
│   │   └── session.cy.js
│   ├── fixtures/
│   │   ├── users.json
│   │   ├── customers.json
│   │   └── products.json
│   └── support/
│       ├── commands.js
│       ├── assertions.js
│       ├── testData.js
│       └── e2e.js
├── .github/
│   └── workflows/
├── cypress.config.js
├── package.json
├── pnpm-lock.yaml
└── README.md
└── test-report.png
```

Generated Mochawesome reports, screenshots, videos, and installed dependencies are excluded from version control.

## Setup and Execution

### Prerequisites

- Node.js 22 or higher, compatible with the installed Cypress version
- pnpm 11.25.0
- Cypress-supported operating system and browser

### Install Dependencies

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm exec cypress install
```

### Open Cypress Test Runner

```bash
corepack pnpm cy:open
```

### Run All Tests

```bash
corepack pnpm test
```

### Run an Individual Test Suite

```bash
corepack pnpm run test:checkout
```

### Generate Mochawesome HTML Report

```bash
corepack pnpm run test:report
corepack pnpm run report:generate
```

Open the generated HTML report on macOS:

```bash
open cypress/reports/html/index.html
```

No authentication tokens or paid services are required. SauceDemo provides public demonstration accounts.

## Test Execution Results

**Latest verified local execution: All 37 tests passed.**

| Metric | Result |
|---|---|
| Test suites | 5 |
| Total test cases | 37 |
| Passed | 37 |
| Failed | 0 |
| Pass rate | 100% |
| Execution duration | 32.2 seconds |
| Reporting tool | Mochawesome |
| Execution type | Local automated regression run |

### Results by Module

| Module | Passed | Failed |
|---|---:|---:|
| Login | 7 | 0 |
| Products | 6 | 0 |
| Shopping Cart | 10 | 0 |
| Checkout | 8 | 0 |
| Session and Protected Pages | 6 | 0 |
| **Total** | **37** | **0** |

### Execution Evidence

![Mochawesome Regression Test Report](/test-report.png)

The Mochawesome report provides a consolidated view of test suites, individual test results, execution duration, and failure information.

All 37 automated test scenarios passed in the captured local execution. These results represent this execution only and do not guarantee that subsequent runs will produce identical outcomes.

## Continuous Integration

The project includes GitHub Actions workflow configuration for automated Cypress regression testing.

The intended CI workflow supports:

- Execution on pushes and pull requests
- Automated regression testing
- Test result reporting
- Screenshot and video artifacts for troubleshooting

**CI execution status:** GitHub Actions execution has not yet been verified. Local execution results are documented above.

## Testing Scope and Limitations

This project focuses on functional web UI regression testing. It does not cover real payment processing, backend persistence, performance testing, security penetration testing, or comprehensive accessibility auditing.

SauceDemo is a public demonstration application. Changes to its data or behavior may require updates to expected results and test fixtures.

## Author

**Vanessa Joy Weng**

Senior Quality Assurance Engineer

[LinkedIn](https://www.linkedin.com/in/vjbburgos/) | [GitHub](https://github.com/vanieb)
