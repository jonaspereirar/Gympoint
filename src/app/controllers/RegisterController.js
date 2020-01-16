import { addMonths, parseISO, isBefore, startOfDay } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import Register from '../models/Register';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Mail from '../../lib/mail';

class RegisterController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const register = await Register.findAll({
      order: ['start_date'],
      limit: 5,
      offset: (page - 1) * 5,
      attributes: ['id', 'start_date', 'end_date', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price', 'total'],
        },
      ],
    });

    return res.json(register);
  }

  async show(req, res) {
    const { id } = req.params;
    const register = await Register.findOne({
      where: { id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'duration', 'price'],
        },
      ],
    });

    return res.json(register);
  }

  async update(req, res) {
    const { plan_id, start_date } = req.body;

    const register = await Register.findByPk(req.body.id);
    if (!register) return res.status(400).json({ error: 'Register not found' });

    const studentExists = await Student.findByPk(req.body.student_id);
    if (!studentExists)
      return res.status(400).json({ error: 'Student not exist' });

    const planExists = await Plan.findByPk(req.body.plan_id);
    if (!planExists) return res.status(400).json({ error: 'Plan not found' });

    const startDay = startOfDay(parseISO(start_date));
    if (isBefore(startDay, new Date())) {
      return res.status(400).json({ error: 'this date is not valid' });
    }

    const plan = await Plan.findByPk(plan_id);

    const date = parseISO(start_date);
    const end_date = addMonths(date, plan.duration);

    const price = plan.price * plan.duration;

    await register.update({ ...req.body, end_date, price });

    return res.json(register);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const studentRegistered = await Register.findOne({ where: { student_id } });
    if (studentRegistered) {
      return res
        .status(400)
        .json({ error: 'Student already registered in a plan' });
    }

    const studentExists = await Student.findOne({ where: { id: student_id } });
    if (!studentExists) {
      return res
        .status(400)
        .json({ error: 'Student does not exist in database' });
    }

    const planExists = await Plan.findOne({ where: { id: plan_id } });
    if (!planExists) {
      return res
        .status(400)
        .json({ error: 'this plan does not exist in database' });
    }

    const startDay = startOfDay(parseISO(start_date));
    if (isBefore(startDay, new Date())) {
      return res.status(400).json({ error: 'this date is not valid' });
    }

    const plan = await Plan.findByPk(plan_id);

    const date = parseISO(start_date);
    const end_date = addMonths(date, plan.duration);

    const price = plan.price * plan.duration;

    const registed = await Register.create({ ...req.body, end_date, price });

    const register = await registed.reload({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price', 'total'],
        },
      ],
    });
    await Mail.sendMail({
      to: `${register.student.name} <${register.student.email}>`,

      subject: 'Register criated',
      text: 'You at register in Gympoint',
    });

    return res.json(registed);
  }

  async delete(req, res) {
    const { id } = req.params;

    const register = await Register.findByPk(id);

    await register.destroy();

    return res.send();
  }
}
export default new RegisterController();
