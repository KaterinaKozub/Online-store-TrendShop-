/* eslint-disable indent */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)];
const collections = ['street', 'black', 'casual', 'white'];
const colors = ['purpure', 'yellow', 'orange', 'black', 'white'];
const compositions = ['cotton', 'synthetics', 'polyester'];
const accessoryTypes = ['belts', 'backpacks', 'bags'];

// У відповідності до реальних файлів у /public/img/accessories
const imageTypeMap = {
  belts:     'belts',
  bags:      'bags',
  backpacks: 'backpacks',
};

const images = [
  '/img/accessories/accessories-bags-1.jpg',
  '/img/accessories/accessories-bags-2.jpg',
  '/img/accessories/accessories-backpacks-1.png',
  '/img/accessories/accessories-backpacks-2.png',
  '/img/accessories/accessories-belts-1.jpg',
];

const wearingMethod = ['in hand', 'on shoulder', 'over shoulder'];
const textures = ['nubuck', 'nappa', 'suede', 'naplak'];
const styles = ['bucket bag', 'retro style', 'sports', 'travel'];
const seasons = ['demi-season', 'all season'];

const accessoryNames = {
  belts:     ['Leather Belt', 'Casual Belt', 'Braided Belt', 'Formal Belt'],
  backpacks: ['Travel Backpack', 'Casual Backpack', 'Sports Backpack', 'Laptop Backpack'],
  bags:      ['Handbag', 'Tote Bag', 'Crossbody Bag', 'Shoulder Bag'],
};

const getRandomAccessoryName = (type) =>
  (accessoryNames[type] && getRandomArrayValue(accessoryNames[type])) || "Default Name";

module.exports = {
  async up(db) {
    return db.collection('accessories').insertMany(
      Array.from({ length: 80 }).map(() => {
        const type = getRandomArrayValue(accessoryTypes);

        let characteristics;
        switch (type) {
          case 'bags':
            characteristics = {
              type,
              color: getRandomArrayValue(colors),
              composition: getRandomArrayValue(compositions),
              collection: getRandomArrayValue(collections),
              wearingMethod: getRandomArrayValue(wearingMethod),
              texture: getRandomArrayValue(textures),
              style: getRandomArrayValue(styles),
            };
            break;

          case 'backpacks':
            characteristics = {
              type,
              color: getRandomArrayValue(colors),
              composition: getRandomArrayValue(compositions),
              season: getRandomArrayValue(seasons),
              texture: getRandomArrayValue(textures),
            };
            break;

          case 'belts':
            characteristics = {
              type,
              color: getRandomArrayValue(colors),
              composition: getRandomArrayValue(compositions),
              collection: getRandomArrayValue(collections),
              texture: getRandomArrayValue(textures),
              style: getRandomArrayValue(['classic', 'modern', 'casual']),
            };
            break;
        }

        return {
          category: 'accessories',
          type,
          price: `${+faker.string.numeric(4).replace(/.{0,2}$/, 99)} грн`,
          name: getRandomAccessoryName(type),
          description: faker.lorem.sentences(10),
          characteristics,
          images: images.filter(item =>
            item.includes(`accessories-${imageTypeMap[type]}-`)
          ),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
        };
      })
    );
  },

  async down(db) {
    return db.collection('accessories').deleteMany({});
  },
};
