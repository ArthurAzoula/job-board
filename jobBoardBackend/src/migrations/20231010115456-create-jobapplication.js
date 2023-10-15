'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobapplications', {
      jobapplication_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      people_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      advertissement_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      anonymous_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      email_send: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
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
    
    await queryInterface.addConstraint('jobapplications', {
      fields: ['people_id'],
      type: 'foreign key',
      name: 'fk_people_id',
      references: {
        table: 'people',
        field: 'people_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('jobapplications', {
      fields: ['advertissement_id'],
      type: 'foreign key',
      name: 'fk_advertissement_id',
      references: {
        table: 'advertissements',
        field: 'advertissement_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('jobapplications', {
      fields: ['anonymous_id'],
      type: 'foreign key',
      name: 'fk_anonymous_id',
      references: {
        table: 'anonymous',
        field: 'anonymous_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('jobapplications');
  }

};