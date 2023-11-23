'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tenant', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenant_uuid: {
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      db_name: {
        type: Sequelize.STRING
      },
      db_port: {
        type: Sequelize.INTEGER
      },
      db_user: {
        type: Sequelize.STRING
      },
      db_driver: {
        type: Sequelize.STRING
      },
      db_password:{
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        // defaultValue:Sequelize.NOW()
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tenant');
  }
};