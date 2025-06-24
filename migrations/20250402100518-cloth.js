const { faker } = require('@faker-js/faker');

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const collections = ['street', 'casual base', 'casual', 'sport', 'classic'];
const colors = ["black", "white", "gray", "red", "beige", "brown", "pink"];
const compositions = ['cotton', 'synthetics', 'polyester'];
const clothTypes = ["t-shirts", "shirts", "trousers", "shorts", "sports_suits", "hoodie", "dresses", "sweaters", "skirts"];
const images = [
  '/img/clothes/cloth-t-shirts-1.png',
  '/img/clothes/cloth-t-shirts-2.png',
  '/img/clothes/cloth-t-shirts-3.png',
  '/img/clothes/cloth-t-shirts-4.png',
  '/img/clothes/cloth-shirts-1.png',
  '/img/clothes/cloth-shirts-2.png',
  '/img/clothes/cloth-shirts-3.png',
  '/img/clothes/cloth-trousers-1.png',
  '/img/clothes/cloth-trousers-2.png',
  '/img/clothes/cloth-sports_suits-1.png',
  '/img/clothes/cloth-sports_suits-2.png',
  '/img/clothes/cloth-sports_suits-3.png',
  '/img/clothes/cloth-hoodie-1.png',
  '/img/clothes/cloth-hoodie-2.png',
  '/img/clothes/cloth-hoodie-3.png',
  '/img/clothes/cloth-dresses-1.png',
  '/img/clothes/cloth-dresses-2.png',
  '/img/clothes/cloth-dresses-3.png',
  '/img/clothes/cloth-sweaters-1.png',
  '/img/clothes/cloth-skirts-1.png',
  '/img/clothes/cloth-skirts-2.png',
];

const CasualBaseImages = [
  '/img/black-t.png',
  '/img/whitr-t.png',
  '/img/grey-t.png',
];

const clothNames = {
  "t-shirts": ["Basic T-Shirt", "Oversized Tee", "Graphic T-Shirt", "Striped T-Shirt"],
  "shirts": ["Casual Shirt", "Formal Shirt", "Denim Shirt", "Plaid Shirt"],
  "trousers": ["Slim Fit Trousers", "Classic Trousers", "Cargo Pants", "Chino Pants"],
  "shorts": ["Denim Shorts", "Cargo Shorts", "Athletic Shorts", "Bermuda Shorts"],
  "sports_suits": ["Tracksuit", "Running Set", "Gym Wear", "Training Suit"],
  "hoodie": ["Basic Hoodie", "Zipped Hoodie", "Oversized Hoodie", "Graphic Hoodie"],
  "dresses": ["Evening Dress", "Casual Dress", "Summer Dress", "Party Dress"],
  "sweaters": ["Knitted Sweater", "Turtleneck Sweater", "Oversized Sweater", "Wool Sweater"],
  "skirts": ["Mini Skirt", "Pencil Skirt", "A-Line Skirt", "Denim Skirt"],
};

const getRandomClothName = (type) => {
  return clothNames[type] ? getRandomArrayValue(clothNames[type]) : "Default Name";
};

module.exports = {
  async up(db) {
    return db.collection('cloth').insertMany([...Array(100)].map(() => {
      const type = getRandomArrayValue(clothTypes);
      const characteristics = [
        {
          type: 't-shirts',
          color: getRandomArrayValue(colors),
          collar: getRandomArrayValue(['polo', 'shirt-rack', 'apache', 'tangerine', 'golf', 'round neck']),
          silhouette: 'straight',
          print: getRandomArrayValue(['chocolate', 'polka dots', 'floral', 'geometric', 'abstract', 'camouflage', 'animal print', 'graphic', 'logo', 'tie-dye', 'vintage', 'skull', 'slogan', 'stars']),
          decor: faker.datatype.boolean(),
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season']),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'shirts',
          color: getRandomArrayValue(colors),
          collar: getRandomArrayValue(['polo', 'shirt-rack', 'apache', 'tangerine', 'golf', 'round neck']),
          silhouette: 'straight',
          print: getRandomArrayValue(['striped', 'polka dots']),
          decor: faker.datatype.boolean(),
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season']),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'trousers',
          color: getRandomArrayValue(colors),
          silhouette: 'straight', 
          decor: faker.datatype.boolean(),
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season']),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'shorts',
          color: getRandomArrayValue(colors),
          silhouette: 'straight', 
          decor: faker.datatype.boolean(), 
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season']), 
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'sports_suits',
          color: getRandomArrayValue(colors),
          silhouette: 'athletic',
          decor: faker.datatype.boolean(),
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season']),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'hoodie',
          color: getRandomArrayValue(colors),
          silhouette: 'oversized', 
          print: getRandomArrayValue(['logo', 'graphic', 'plain', 'camouflage', 'striped']),
          decor: faker.datatype.boolean(), 
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season']),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'dresses',
          color: getRandomArrayValue(colors),
          silhouette: 'A-line', 
          decor: faker.datatype.boolean(), 
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season']),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'sweaters',
          color: getRandomArrayValue(colors),
          silhouette: 'oversized', 
          decor: faker.datatype.boolean(), 
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season', 'summer']),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'skirts',
          color: getRandomArrayValue(colors),
           silhouette: getRandomArrayValue(['straight', 'A-line', 'pleated']),
          length: getRandomArrayValue(['mini', 'midi', 'maxi']),
          decor: faker.datatype.boolean(),
          print: getRandomArrayValue(['plaid', 'floral', 'solid', 'striped', 'polka dots']),
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(['demi-season', 'all season']),
          collection: getRandomArrayValue(collections),
        }
      ];

      const currentCharacteristics = characteristics.find(item => item.type === type);

      return {
        category: 'cloth',
        type,
        price: `${+faker.string.numeric(4).replace(/.{0,2}$/, 99)} грн`,
        name: getRandomClothName(type), // Використання фіксованих назв
        description: faker.lorem.sentences(10),
        characteristics: currentCharacteristics,
        images:
          type === 't-shirts' && currentCharacteristics.collection === 'Casual Base'
            ? [getRandomArrayValue(CasualBaseImages)]
            : images.filter(item => item.includes(`cloth-${type}-`)),
        vendorCode: faker.string.numeric(4),
        inStock: faker.string.numeric(2),
        isBestseller: faker.datatype.boolean(),
        isNew: faker.datatype.boolean(),
        popularity: +faker.string.numeric(3),
        sizes: {
          s: faker.datatype.boolean(),
          l: faker.datatype.boolean(),
          m: faker.datatype.boolean(),
          xl: faker.datatype.boolean(),
          xxl: faker.datatype.boolean(),
        },
      };
    }));
  },

  async down(db) {
    return db.collection('cloth').deleteMany({});
  }
};
