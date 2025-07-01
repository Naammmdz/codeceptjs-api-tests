Feature('YouTube Website');

// Testing YouTube website endpoints that return HTML
// These tests check if the website is accessible
// Updated: CI/CD demo - this change will trigger automated tests

Scenario('access YouTube homepage', ({ I }) => {
  I.sendGetRequest('/');
  I.seeResponseCodeIsSuccessful();
});

Scenario('access YouTube search page', ({ I }) => {
  I.sendGetRequest('/results?search_query=codeceptjs');
  I.seeResponseCodeIsSuccessful();
});

Scenario('access YouTube watch page', ({ I }) => {
  // Test a popular video page (Rick Astley - Never Gonna Give You Up)
  I.sendGetRequest('/watch?v=dQw4w9WgXcQ');
  I.seeResponseCodeIsSuccessful();
});
