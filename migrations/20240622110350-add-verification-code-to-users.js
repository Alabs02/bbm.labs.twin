'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Users', 'verification_code', {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.addColumn('Users', 'verification_code_expires_at', {
            type: Sequelize.DATE,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'verification_code');
        await queryInterface.removeColumn('Users', 'verification_code_expires_at');
    }
};
