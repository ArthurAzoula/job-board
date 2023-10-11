'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('anonymous', {
      anonymous_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      prenom: {
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
      telephone: {
        allowNull: false,
        type: Sequelize.STRING(50),
        // Verification du numero de telephone
        validate: {
          isNumeric: true,
          len: [10, 10],
        },
      },
      jobapplication_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'jobapplications',
          key: 'jobapplication_id'
        }
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
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('anonymous', {
      fields: ['jobapplication_id'],
      type: 'foreign key',
      name: 'fk_jobapplication_id',
      references: {
        table: 'jobapplications',
        field: 'jobapplication_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'

    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('anonymous');
  }
};