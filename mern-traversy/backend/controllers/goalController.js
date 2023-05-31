const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Goal text not defined')
  }
  const goal = await Goal.create({
    text: req.body.text
  })
  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = Goal.findById(req.params.id)
  if (!req.body.text) {
    res.status(400)
    throw new Error('Goal text update not defined')
  }
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  console.log(`the update: ${req.body.text}`)
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, { text: req.body.text }, {new: true})
  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  await Goal.deleteOne({ _id: req.params.id })
  res.status(200).json({ message: `Goal ${req.params.id} deleted ` })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}