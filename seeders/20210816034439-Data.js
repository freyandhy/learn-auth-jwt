'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        name: "Budi",
        email: "budi@email.com",
        password: "abcdef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Andi",
        email: "andi@email.com",
        password: "abcdef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Siti",
        email: "siti@email.com",
        password: "aaaaaaaa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
