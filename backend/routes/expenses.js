const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const protect = require('../middleware/auth');

// Get all expenses (protected)
router.get('/', protect, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id })
                                      .sort({ createdAt: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add expense (protected)
router.post('/', protect, async (req, res) => {
    try {
        const { description, amount, category, date } = req.body;
        const expense = await Expense.create({
            userId: req.user.id,
            description,
            amount,
            category,
            date
        });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete expense (protected)
router.delete('/:id', protect, async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;