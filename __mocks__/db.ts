import { faker } from '@faker-js/faker';
import { factory, oneOf, primaryKey } from '@mswjs/data';

// type visibility = 'private' | 'workspace' | 'public';

export const db = factory({
  board: {
    id: primaryKey(faker.string.uuid),
    title: faker.commerce.department,
    visibility: () =>
      ['private', 'workspace', 'public'][faker.number.int({ min: 0, max: 2 })],
    description: faker.lorem.sentence,
  },

  list: {
    id: primaryKey(faker.string.uuid),
    title: faker.commerce.department,
    boardId: faker.string.uuid,
    board: oneOf('board'),
    // tasks: manyOf('task'),
  },

  task: {
    id: primaryKey(faker.string.uuid),
    title: faker.commerce.productName,
    description: faker.commerce.productDescription,
    listId: faker.string.uuid,
    list: oneOf('list'),
  },
});
