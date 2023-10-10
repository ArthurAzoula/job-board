'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('people', {
      people_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        // Verification de l'email
        validate: {
          isEmail: true,

        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(50),
        // add security to password set and get
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
        get() {
          return this.getDataValue('password');
        },
      },
      telephone: {
        allowNull: false,
        type: Sequelize.STRING(50),
        // Verification du numero de telephone
        validate: {
          isNumeric: true,
          len: [10, 10],
        },
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('people');
  }
};