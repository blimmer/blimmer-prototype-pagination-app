import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  hasPurchased: faker.list.cycle(true, false)
});
