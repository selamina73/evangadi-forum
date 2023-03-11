const { answerQuestion, answerByQuestionId } = require("./answer.service");

module.exports = {
    solveQuestion: (req, res) => {
        const { answer, id, questionId } = req.body;
        
        //validation
        if (!answer || !id || !questionId) {
            return res.status(400).json({ msg: ' all fields have not provided!' })
        }

        //sending data to answer table
        answerQuestion(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "db connected"})
            }
            return res.status(200).json({
                msg: 'Answer inserted',
                data: results
            })
        })
    },
    getAnswerByQuestionId: (req, res) => {
        let questionId = req.params.id;
        answerByQuestionId(questionId, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "db connected" })
            }
            // if (!results) {
            //     return res.status(400).json({ msg: "Record not found" });
            // }
            return res.status(200).json({data: results});
        })
    }
}