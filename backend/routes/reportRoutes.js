const express = require('express')
const { protect, adminOnly } = require('../middlewares/authMiddleware')
const { exportTasksReport } = require('../controllers/reportController')

const router = express.Router()

router.get("/export/tasks", protect, adminOnly, exportTasksReport)
router.get("/export/users", protect, adminOnly, exportTasksReport)

module.exports = router