const joi = require('joi');

Feature('GitHub API');

// GitHub API public endpoints testing
// These tests verify GitHub's public API functionality

const userSchema = joi.object({
  login: joi.string().required(),
  id: joi.number().required(),
  avatar_url: joi.string().uri().required(),
  url: joi.string().uri().required(),
  type: joi.string().required(),
  created_at: joi.date().required()
}).unknown();

const repoSchema = joi.object({
  id: joi.number().required(),
  name: joi.string().required(),
  full_name: joi.string().required(),
  owner: joi.object().required(),
  html_url: joi.string().uri().required(),
  description: joi.string().allow(null),
  created_at: joi.date().required(),
  updated_at: joi.date().required(),
  language: joi.string().allow(null),
  stargazers_count: joi.number().required(),
  forks_count: joi.number().required()
}).unknown();

Before(({ I }) => {
  // Set GitHub API endpoint
  I.haveRequestHeaders({
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'CodeceptJS-API-Tests'
  });
});

Scenario('get GitHub user information', ({ I }) => {
  I.sendGetRequest('https://api.github.com/users/octocat');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsKeys(['login', 'id', 'avatar_url', 'type']);
  I.seeResponseMatchesJsonSchema(userSchema);
  I.seeResponseContainsJson({
    login: 'octocat',
    type: 'User'
  });
});

Scenario('get GitHub organization repositories', ({ I }) => {
  I.sendGetRequest('https://api.github.com/orgs/github/repos?per_page=5');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseValidByCallback(({ data }) => {
    if (!Array.isArray(data)) throw new Error('Response should be an array');
    if (data.length < 1) throw new Error('Should have at least 1 repository');
    if (data.length > 5) throw new Error('Should have at most 5 repositories');
  });
  I.seeResponseMatchesJsonSchema(joi.array().items(repoSchema));
});

Scenario('search GitHub repositories', ({ I }) => {
  I.sendGetRequest('https://api.github.com/search/repositories?q=javascript&sort=stars&order=desc&per_page=3');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsKeys(['total_count', 'incomplete_results', 'items']);
  I.seeResponseValidByCallback(({ data }) => {
    if (data.total_count < 1000) throw new Error('Total count should be at least 1000');
    if (!Array.isArray(data.items)) throw new Error('Items should be an array');
    if (data.items.length !== 3) throw new Error('Should return exactly 3 items');
  });
});

Scenario('get GitHub API rate limit', ({ I }) => {
  I.sendGetRequest('https://api.github.com/rate_limit');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsKeys(['resources', 'rate']);
  I.seeResponseValidByCallback(({ data }) => {
    if (data.rate.limit < 60) throw new Error('Rate limit should be at least 60');
    if (data.rate.remaining < 0) throw new Error('Remaining calls should be non-negative');
  });
});

Scenario('test GitHub API error handling', ({ I }) => {
  // Test non-existent user
  I.sendGetRequest('https://api.github.com/users/this-user-definitely-does-not-exist-12345');
  I.seeResponseCodeIs(404);
  I.seeResponseContainsKeys(['message', 'documentation_url']);
});
