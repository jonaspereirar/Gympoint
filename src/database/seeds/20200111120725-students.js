module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Jonas',
          email: 'jonas@gmail.com',
          age: 38,
          weight: 94,
          height: 1.84,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Ana',
          email: 'ana@gmail.com',
          age: 40,
          weight: 56,
          height: 1.68,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Miguel',
          email: 'miguel@gmail.com',
          age: 27,
          weight: 80,
          height: 1.8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Ines',
          email: 'ines@gmail.com',
          age: 24,
          weight: 52,
          height: 1.65,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Diana',
          email: 'diana@gmail.com',
          age: 20,
          weight: 48,
          height: 1.59,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Délia',
          email: 'delia@gmail.com',
          age: 50,
          weight: 52,
          height: 1.6,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
