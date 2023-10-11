'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('advertissements', {
      advertissement_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      type_contrat: {
        allowNull: false,
        type: Sequelize.ENUM('CDI', 'CDD', 'Stage', 'Alternance'),
      },
      company_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      publication_date: {
        allowNull: false,
        type: Sequelize.DATE,

      },
      expiration_date: {
        allowNull: false,
        type: Sequelize.DATE,
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

    await queryInterface.addConstraint('advertissements', {

      fields: ['company_id'],
      type: 'foreign key',
      name: 'fk_company_id',
      references: {
        table: 'companies',
        field: 'company_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('advertissements');
  }
};