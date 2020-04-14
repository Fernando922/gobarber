const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'cliente',
          email: 'cliente@email.com.br',
          password_hash: bcrypt.hashSync('teste123', 8),
          provider: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'provider',
          email: 'provider@email.com.br',
          password_hash: bcrypt.hashSync('teste123', 8),
          provider: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
