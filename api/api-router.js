const router = require("express").Router();
const restricted = require("../middleware/restricted-middleware");

const authRouter = require('../auth/auth-router');
const categoriesRouter = require('../routes/categories-route');
const goalsRouter = require('../routes/goals-route');
const stepsRouter = require('../routes/steps-route');

router.use('/auth', authRouter);
router.use('/:user_id/categories', restricted, categoriesRouter);
router.use('/:user_id/goals', restricted, goalsRouter);
router.use('/:user_id/steps', restricted, stepsRouter);

module.exports = router;