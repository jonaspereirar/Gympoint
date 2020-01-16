import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async index(req, res) {
    const { page } = req.query;

    const plans = await Plan.findAll({
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (!plan) return res.status(404).json({ error: 'Plan Not Found' });

    return res.json(plan);
  }

  async update(req, res) {
    const { id } = req.body;
    const plan = await Plan.findByPk(id);
    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.param;
    const plan = await Plan.findByPk(id);

    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    await plan.destroy();

    return res.send();
  }
}

export default new PlanController();
