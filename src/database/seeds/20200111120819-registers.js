module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'registers',
      [
        {
          student_id: 1,
          plan_id: 1,
          start_date: '2020-01-04 08:00:00',
          end_date: '2021-01-01 00:00:00',
          price: 40,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          plan_id: 2,
          start_date: '2020-01-04 08:00:00',
          end_date: '2021-01-01 00:00:00',
          price: 35,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          plan_id: 1,
          start_date: '2020-01-04 08:00:00',
          end_date: '2021-01-01 00:00:00',
          price: 40,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 4,
          plan_id: 3,
          start_date: '2020-01-04 08:00:00',
          end_date: '2021-01-01 00:00:00',
          price: 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 5,
          plan_id: 1,
          start_date: '2020-01-04 08:00:00',
          end_date: '2021-01-01 00:00:00',
          price: 40,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 6,
          plan_id: 3,
          start_date: '2020-01-04 08:00:00',
          end_date: '2021-01-01 00:00:00',
          price: 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
