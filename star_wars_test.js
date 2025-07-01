const joi = require('joi');

Feature('Star Wars');

const characterSchema = joi.object({
  films: joi.array(),
  gender: joi.string(),
  hair_color: joi.string(),
  height: joi.string(),
  mass: joi.string(),
  name: joi.string(),
  skin_color: joi.string(),
  created: joi.date()
}).unknown();

Scenario('get all characters', ({ I }) => {
  I.sendGetRequest('/people');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsKeys(['count', 'results']);
  I.seeResponseMatchesJsonSchema(joi => {
    return joi.object({
      count: joi.number(),
      previous: joi.string().uri().allow(null),
      next: joi.string().uri().optional().allow(null),
      results: joi.array().items(characterSchema),
    });
  })
  I.seeResponseValidByCallback(({ expect, data }) => {
    expect(data.results.length).to.be.gte(10);
  });
});

Scenario('check the first character', ({ I }) => {
  I.sendGetRequest('/people/1');
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsKeys(['name', 'films']);
  I.seeResponseMatchesJsonSchema(characterSchema);
  I.seeResponseContainsJson({
    name: 'Luke Skywalker',
    birth_year: "19BBY",
    gender: "male",    
  })  
});
