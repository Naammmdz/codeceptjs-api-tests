Feature('YouTube Website');

// Testing YouTube website endpoints that return HTML
// These tests check if the website is accessible
// Updated: CI/CD demo - this change will trigger automated tests

Scenario('access YouTube homepage', ({ I }) => {
  I.sendGetRequest('/');
  I.seeResponseCodeIs(200);
});

Scenario('access YouTube search page', ({ I }) => {
  I.sendGetRequest('/results?search_query=codeceptjs');
  I.seeResponseCodeIs(200);
});

Scenario('access simple YouTube endpoint', ({ I }) => {
  // Test a simple endpoint that's more likely to work in CI
  I.sendGetRequest('/');
  I.seeResponseCodeIs(200);
});
