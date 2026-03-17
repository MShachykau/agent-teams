const express = require('express');
const router = express.Router();
const db = require('../data/mockData');

// GET /api/users/stats  — must be before /:id to avoid matching "stats" as an id
router.get('/stats', (req, res) => {
  const stats = db.getStats();
  res.json(stats);
});

// GET /api/users
router.get('/', (req, res) => {
  const users = db.getAll();
  res.json(users);
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = db.getById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /api/users
router.post('/', (req, res) => {
  const { firstName, lastName, email, role, status, department, phone, createdAt } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'firstName, lastName, and email are required' });
  }
  const newUser = db.create({
    firstName,
    lastName,
    email,
    role: role || 'user',
    status: status || 'active',
    department: department || null,
    phone: phone || null,
    createdAt: createdAt || new Date().toISOString().split('T')[0],
    lastLogin: null,
  });
  res.status(201).json(newUser);
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  const updated = db.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json(updated);
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const removed = db.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, id: Number(req.params.id) });
});

module.exports = router;
