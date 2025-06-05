const express = require('express');
const router = express.Router();
const Cohort = require('../models/Cohort.model');

// GET all cohorts
router.get('/', async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar cohorts' });
  }
});

// GET single cohort by ID
router.get('/:id', async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.id);
    if (!cohort) return res.status(404).json({ message: 'Cohort não encontrado' });
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar cohort' });
  }
});

// POST create a cohort
router.post('/', async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar cohort', error: err });
  }
});

// PUT update a cohort
router.put('/:id', async (req, res) => {
  try {
    const updated = await Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar cohort', error: err });
  }
});

// DELETE a cohort
router.delete('/:id', async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cohort deletado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar cohort' });
  }
});

module.exports = router;
