const router = require("express").Router();
const restricted = require("../middleware/restricted-middleware");
const checkUser = require('../middleware/check-user');

const authRouter = require('../auth/auth-router');
const categoriesRouter = require('../routes/categories-route');
const goalsRouter = require('../routes/goals-route');
const stepsRouter = require('../routes/steps-route');

router.use('/auth', authRouter);
router.use('/:user_id/categories', restricted, checkUser, categoriesRouter);
router.use('/:user_id/goals', restricted, checkUser, goalsRouter);
router.use('/:user_id/steps', restricted, checkUser, stepsRouter);

module.exports = router;