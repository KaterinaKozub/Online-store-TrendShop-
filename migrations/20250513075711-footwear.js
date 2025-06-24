const { faker } = require('@faker-js/faker');

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const categories = ['sneakers', 'shoes'];
const colors = ['black', 'white', 'gray', 'red', 'beige', 'brown'];
const materials = ['leather', 'eco-leather', 'textile', 'synthetics', 'suede'];
const seasons = ['summer', 'winter', 'autumn-spring', 'all season'];
const collections = ['sport', 'classic', 'casual', 'street'];
const images = {
  sneakers: [
    '/img/footwear/sneakers-1.png',
    '/img/footwear/sneakers-2.png',
    '/img/footwear/sneakers-3.png'
  ],
  shoes: [
    '/img/footwear/shoes-1.png',
    '/img/footwear/shoes-2.png',
    '/img/footwear/shoes-3.png'
  ]
};

const footwearNames = {
  sneakers: ['Running Sneakers', 'High-top Sneakers', 'Retro Sneakers', 'Lightweight Trainers'],
  shoes: ['Oxford Shoes', 'Derby Shoes', 'Loafers', 'Brogues']
};

module.exports = {
  async up(db) {
    console.log('Starting migration...');
    const result = await db.collection('footwear').insertMany([...Array(50)].map(() => {
      const type = getRandomArrayValue(categories);
      const name = getRandomArrayValue(footwearNames[type]);

      const characteristics = {
        type,
        color: getRandomArrayValue(colors),
        material: getRandomArrayValue(materials),
        season: getRandomArrayValue(seasons),
        collection: getRandomArrayValue(collections),
        sole: getRandomArrayValue(['rubber', 'polyurethane', 'TPU']),
        fastener: getRandomArrayValue(['laces', 'velcro', 'zipper', 'none']),
        heelHeight: type === 'shoes' ? `${faker.number.int({ min: 1, max: 5 })} cm` : 'flat',
      };

      return {
        category: 'footwear',
        type,
        price: `${+faker.string.numeric(4).replace(/.{0,2}$/, 99)} грн`,
        name,
        description: faker.lorem.sentences(5),
        characteristics,
        images: images[type],
        vendorCode: faker.string.numeric(6),
        inStock: faker.number.int({ min: 1, max: 30 }),
        isBestseller: faker.datatype.boolean(),
        isNew: faker.datatype.boolean(),
        popularity: +faker.string.numeric(3),
        sizes: {
          '37': faker.datatype.boolean(),
          '38': faker.datatype.boolean(),
          '39': faker.datatype.boolean(),
          '40': faker.datatype.boolean(),
          '41': faker.datatype.boolean(),
        },
      };
    }));

    console.log(`Inserted ${result.insertedCount} documents.`);
  },

  async down(db) {
    console.log('Rolling back migration...');
    await db.collection('footwear').deleteMany({});
    console.log('Rollback completed!');
  }
};
