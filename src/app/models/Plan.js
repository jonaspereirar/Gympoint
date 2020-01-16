import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DECIMAL(8, 2),
        admin_id: Sequelize.VIRTUAL,
        total: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.duration * this.price;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Plan;
