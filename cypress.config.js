const { defineConfig } = require('cypress');
const fs = require('node:fs');
const path = require('node:path');

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 1000,
  video: true,
  screenshotOnRunFailure: true,
  retries: 0,
  defaultCommandTimeout: 8000,
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    testIsolation: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on) {
      on('after:run', (results) => {
        if (!results || !results.runs) return;
        fs.mkdirSync('reports', { recursive: true });
        fs.writeFileSync(path.join('reports', 'run-summary.json'), JSON.stringify({
          startedAt: results.startedTestsAt,
          endedAt: results.endedTestsAt,
          browser: results.browserName,
          browserVersion: results.browserVersion,
          cypressVersion: results.cypressVersion,
          totalTests: results.totalTests,
          passed: results.totalPassed,
          failed: results.totalFailed,
          pending: results.totalPending,
          skipped: results.totalSkipped,
          specs: results.runs.map(run => ({
            spec: run.spec.relative,
            tests: run.tests.map(test => ({
              title: test.title.join(' > '),
              state: test.state,
              attempts: test.attempts.map(a => ({
                state: a.state,
                error: a.error ? a.error.message : null,
              })),
            })),
          })),
        }, null, 2));
      });
    },
  },
});
