const { faker } = require('@faker-js/faker');

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const jewelryTypes = ['watches', 'bracelets', 'earrings', 'pendants'];
const materials = ['gold', 'silver', 'platinum', 'stainless steel', 'leather', 'diamonds', 'pearls'];
const colors = ['black', 'white', 'gold', 'silver', 'rose gold', 'blue', 'green'];
const styles = ['classic', 'modern', 'vintage', 'luxury', 'casual', 'sport'];
const collections = ['elegant', 'casual', 'luxury', 'street'];

const jewelryNames = {
  watches: ['Analog Watch', 'Digital Watch', 'Luxury Watch', 'Smart Watch'],
  bracelets: ['Chain Bracelet', 'Bangle', 'Cuff Bracelet', 'Leather Bracelet'],
  earrings: ['Stud Earrings', 'Hoop Earrings', 'Drop Earrings', 'Chandelier Earrings'],
  pendants: ['Heart Pendant', 'Circle Pendant', 'Diamond Pendant', 'Gold Pendant'],
};

const jewelryImages = {
  watches: [
    '/img/jewelry/watches-1.png',
    '/img/jewelry/watches-2.png',
    '/img/jewelry/watches-3.png',
  ],
  bracelets: [
    '/img/jewelry/bracelets-1.png',
    '/img/jewelry/bracelets-2.png',
    '/img/jewelry/bracelets-3.png',
  ],
  earrings: [
    '/img/jewelry/earrings-1.png',
    '/img/jewelry/earrings-2.png',
    '/img/jewelry/earrings-3.png',
  ],
  pendants: [
    '/img/jewelry/pendants-1.png',
    '/img/jewelry/pendants-2.png',
    '/img/jewelry/pendants-3.png',
  ],
};

const getRandomJewelryName = (type) => getRandomArrayValue(jewelryNames[type]);

module.exports = {
  async up(db) {
    console.log('Seeding jewelry_watches...');

   const items = Array.from({ length: 100 }, () => {
  const type = getRandomArrayValue(jewelryTypes);
  const name = getRandomJewelryName(type);

  const characteristics = {
    type,
    material: getRandomArrayValue(materials),
    color: getRandomArrayValue(colors),
    style: getRandomArrayValue(styles),
    collection: getRandomArrayValue(collections),
    isWaterproof: faker.datatype.boolean(),
    hasDiamonds: faker.datatype.boolean(),
  };

  return {
    category: 'jewelry_watches',
    type,
    name,
    price: `${+faker.string.numeric(4).replace(/.{0,2}$/, 99)} грн`,
    description: faker.lorem.sentences(5),
    characteristics,
    images: jewelryImages[type],
    vendorCode: faker.string.numeric(6),
    inStock: faker.number.int({ min: 1, max: 50 }),
    isBestseller: faker.datatype.boolean(),
    isNew: faker.datatype.boolean(),
    popularity: +faker.string.numeric(3),
  };
});


    const result = await db.collection('jewelry_watches').insertMany(items);
    console.log(`Inserted ${result.insertedCount} jewelry items.`);
  },

  async down(db) {
    console.log('Deleting jewelry_watches items...');
    await db.collection('jewelry_watches').deleteMany({});
    console.log('Rollback completed!');
  },
};
