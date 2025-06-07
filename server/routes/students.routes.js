const express = require('express');
const router = express.Router();
const Student = require('../models/Student.model');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('cohort');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar estudantes' });
  }
});

// GET single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('cohort');
    if (!student) return res.status(404).json({ message: 'Estudante não encontrado' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar estudante' });
  }
});

// POST create a student
router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar estudante', error: err });
  }
});

// PUT update a student
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar estudante', error: err });
  }
});

// DELETE a student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Estudante deletado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar estudante' });
  }
});

module.exports = router;