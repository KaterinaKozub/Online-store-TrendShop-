require('dotenv').config()  // Завантажуємо змінні середовища з файлу .env

const config = {
  mongodb: {
    // Використовуємо process.env для доступу до змінних середовища
    url: process.env.NEXT_PUBLIC_DB_URL,  // MongoDB URL

    // Використовуємо process.env для доступу до змінної середовища для назви БД
    databaseName: process.env.NEXT_PUBLIC_DB_NAME,  // Назва бази даних

    options: {
      useNewUrlParser: true,  // Виправлення попередження при підключенні
      useUnifiedTopology: true,  // Виправлення попередження при підключенні
      // connectTimeoutMS: 3600000,  // Можна розкоментувати, щоб збільшити тайм-аут
      // socketTimeoutMS: 3600000,  // Можна розкоментувати, щоб збільшити тайм-аут
    }
  },

  // Каталог для міграцій
  migrationsDir: "migrations",

  // Колекція MongoDB для збереження застосованих змін
  changelogCollectionName: "changelog",

  // Колекція MongoDB для створення lock
  lockCollectionName: "changelog_lock",

  // TTL для індексу lock в секундах
  lockTtl: 0,

  // Розширення файлів для міграцій
  migrationFileExtension: ".js",

  // Використовувати хеш файлів для визначення, чи потрібно виконати міграцію
  useFileHash: false,

  // Не змінювати, якщо не знаєте, що робите
  moduleSystem: 'commonjs',
};

module.exports = config;
