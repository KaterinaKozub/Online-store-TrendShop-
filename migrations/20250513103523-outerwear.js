const { faker } = require('@faker-js/faker');

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const outerwearTypes = ['jackets', 'coats'];
const colors = ['black', 'white', 'gray', 'red', 'beige', 'brown'];
const materials = ['leather', 'eco-leather', 'polyester', 'cotton', 'wool'];
const seasons = ['winter', 'demi-season', 'all season'];
const collections = ['street', 'casual', 'classic', 'sport'];

const outerwearNames = {
  jackets: ['Bomber Jacket', 'Puffer Jacket', 'Leather Jacket', 'Windbreaker', 'Denim Jacket'],
  coats: ['Trench Coat', 'Wool Coat', 'Raincoat', 'Peacoat', 'Overcoat'],
};

const outerwearImages = {
  jackets: [
    '/img/outerwear/jackets-1.png',
    '/img/outerwear/jackets-2.png',
    '/img/outerwear/jackets-3.png',
  ],
  coats: [
    '/img/outerwear/coats-1.png',
    '/img/outerwear/coats-2.png',
    '/img/outerwear/coats-3.png',
  ],
};

const getRandomOuterwearName = (type) => getRandomArrayValue(outerwearNames[type]);

module.exports = {
  async up(db) {
    console.log('Seeding outerwear...');

    const items = [...Array(100)].map(() => {
      const type = getRandomArrayValue(outerwearTypes);
      const name = getRandomOuterwearName(type);

      const characteristics = {
        type,
        color: getRandomArrayValue(colors),
        material: getRandomArrayValue(materials),
        silhouette: getRandomArrayValue(['straight', 'oversized', 'fitted']),
        season: getRandomArrayValue(seasons),
        collection: getRandomArrayValue(collections),
        length: getRandomArrayValue(['short', 'medium', 'long']),
        insulation: getRandomArrayValue(['none', 'lightweight', 'medium', 'heavy']),
        hood: faker.datatype.boolean(),
        waterproof: faker.datatype.boolean(),
        windproof: faker.datatype.boolean(),
      };

      return {
        category: 'outerwear',
        type,
        name,
        price: `${+faker.string.numeric(4).replace(/.{0,2}$/, 99)} грн`,
        description: faker.lorem.sentences(5),
        characteristics,
        images: outerwearImages[type],
        vendorCode: faker.string.numeric(6),
        inStock: faker.number.int({ min: 1, max: 50 }),
        isBestseller: faker.datatype.boolean(),
        isNew: faker.datatype.boolean(),
        popularity: +faker.string.numeric(3),
        sizes: {
          s: faker.datatype.boolean(),
          m: faker.datatype.boolean(),
          l: faker.datatype.boolean(),
          xl: faker.datatype.boolean(),
          xxl: faker.datatype.boolean(),
        },
      };
    });

    const result = await db.collection('outerwear').insertMany(items);
    console.log(`Inserted ${result.insertedCount} outerwear items.`);
  },

  async down(db) {
    console.log('Deleting outerwear items...');
    await db.collection('cloth').deleteMany({ category: 'outerwear' });
    console.log('Rollback completed!');
  },
};
