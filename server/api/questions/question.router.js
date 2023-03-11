const router = require('express').Router();

const { getQuestionById, getQuestions, createQuestion } = require('./question.cotroller');
router.post('/', createQuestion);
router.get("/:id", getQuestionById);
router.get("/", getQuestions);

module.exports = router;