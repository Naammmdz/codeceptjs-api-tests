const joi = require('joi');

Feature('JSONPlaceholder API');

// JSONPlaceholder API testing for CRUD operations
// This API provides fake JSON data for testing and prototyping

const postSchema = joi.object({
  userId: joi.number().required(),
  id: joi.number().required(),
  title: joi.string().required(),
  body: joi.string().required()
});

const userSchema = joi.object({
  id: joi.number().required(),
  name: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  address: joi.object({
    street: joi.string(),
    suite: joi.string(),
    city: joi.string(),
    zipcode: joi.string(),
    geo: joi.object({
      lat: joi.string(),
      lng: joi.string()
    })
  }),
  phone: joi.string(),
  website: joi.string(),
  company: joi.object({
    name: joi.string(),
    catchPhrase: joi.string(),
    bs: joi.string()
  })
});

const commentSchema = joi.object({
  postId: joi.number().required(),
  id: joi.number().required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  body: joi.string().required()
});

Before(({ I }) => {
  // Set JSONPlaceholder API endpoint
  I.haveRequestHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });
});

Scenario('get all posts', ({ I }) => {
  I.sendGetRequest('https://jsonplaceholder.typicode.com/posts');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseValidByCallback(({ data }) => {
    if (!Array.isArray(data)) throw new Error('Response should be an array');
    if (data.length !== 100) throw new Error('Should have exactly 100 posts');
  });
  I.seeResponseMatchesJsonSchema(joi.array().items(postSchema));
});

Scenario('get specific post', ({ I }) => {
  I.sendGetRequest('https://jsonplaceholder.typicode.com/posts/1');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseMatchesJsonSchema(postSchema);
  I.seeResponseContainsJson({
    userId: 1,
    id: 1
  });
});

Scenario('get all users', ({ I }) => {
  I.sendGetRequest('https://jsonplaceholder.typicode.com/users');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseValidByCallback(({ data }) => {
    if (!Array.isArray(data)) throw new Error('Response should be an array');
    if (data.length !== 10) throw new Error('Should have exactly 10 users');
  });
  I.seeResponseMatchesJsonSchema(joi.array().items(userSchema));
});

Scenario('get user by ID', ({ I }) => {
  I.sendGetRequest('https://jsonplaceholder.typicode.com/users/1');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseMatchesJsonSchema(userSchema);
  I.seeResponseContainsJson({
    id: 1,
    username: 'Bret'
  });
});

Scenario('get comments for a post', ({ I }) => {
  I.sendGetRequest('https://jsonplaceholder.typicode.com/posts/1/comments');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseValidByCallback(({ data }) => {
    if (!Array.isArray(data)) throw new Error('Response should be an array');
    if (data.length < 1) throw new Error('Should have at least 1 comment');
  });
  I.seeResponseMatchesJsonSchema(joi.array().items(commentSchema));
});

Scenario('create new post', ({ I }) => {
  const newPost = {
    title: 'Test Post from CodeceptJS',
    body: 'This is a test post created by our automated test suite',
    userId: 1
  };
  
  I.sendPostRequest('https://jsonplaceholder.typicode.com/posts', newPost);
  I.seeResponseCodeIs(201);
  I.seeResponseContainsJson({
    title: newPost.title,
    body: newPost.body,
    userId: newPost.userId,
    id: 101
  });
});

Scenario('update existing post', ({ I }) => {
  const updatedPost = {
    id: 1,
    title: 'Updated Test Post',
    body: 'This post has been updated by our test suite',
    userId: 1
  };
  
  I.sendPutRequest('https://jsonplaceholder.typicode.com/posts/1', updatedPost);
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson(updatedPost);
});

Scenario('partially update post', ({ I }) => {
  const partialUpdate = {
    title: 'Partially Updated Title'
  };
  
  I.sendPatchRequest('https://jsonplaceholder.typicode.com/posts/1', partialUpdate);
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson(partialUpdate);
});

Scenario('delete post', ({ I }) => {
  I.sendDeleteRequest('https://jsonplaceholder.typicode.com/posts/1');
  I.seeResponseCodeIsSuccessful();
});

Scenario('test API error handling', ({ I }) => {
  // Test non-existent post
  I.sendGetRequest('https://jsonplaceholder.typicode.com/posts/999');
  I.seeResponseCodeIs(404);
  
  // Test invalid endpoint
  I.sendGetRequest('https://jsonplaceholder.typicode.com/invalid-endpoint');
  I.seeResponseCodeIs(404);
});
