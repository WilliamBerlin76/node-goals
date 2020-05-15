const router = require("express").Router();
const restricted = require("../middleware/restricted-middleware");

const authRouter = require('../auth/auth-router');
const categoriesRouter = require('../routes/categories-route');
const goalsRouter = require('../routes/goals-route');

router.use('/auth', authRouter);
router.use('/categories', restricted, categoriesRouter);
router.use('/goals', restricted, goalsRouter);

module.exports = router;