import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Atleta already exists.' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const students = await Student.findAll({
      limit: 5,
      offset: (page - 1) * 5,
    });
    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Atleta not exists.' });
    }
    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!student) {
      return res.status(400).json({ error: 'Atleta not exists.' });
    }

    await student.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) return res.status(404).json({ error: 'Student Not Found' });

    await student.destroy();
    return res.send();
  }
}

export default new StudentController();
