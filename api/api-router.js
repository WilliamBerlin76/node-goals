const router = require("express").Router();
const restricted = require("../middleware/restricted-middleware");

const authRouter = require('../auth/auth-router');
const categoriesRouter = require('../routes/categories-route');
const goalsRouter = require('../routes/goals-route');
const stepsRouter = require('../routes/steps-route');

router.use('/auth', authRouter);
router.use('/categories', restricted, categoriesRouter);
router.use('/goals', restricted, goalsRouter);
router.use('/steps', restricted, stepsRouter);

module.exports = router;