const { v4: uuidv4 } = require('uuid'); 
// generating unique Id's.
//  console.log(uuidv4()); '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const { questionById, getAllQuestions, addQuestion } = require('./question.service');

module.exports = {
    createQuestion: (req, res) => {
        //id is user id &  UNIQUE KEY (post_id) <=>(uuidv4)
        const { question, id } = req.body;
        req.body.postId = uuidv4();

        //validation
        if (!question || !id) {
            return res.status(400).json({ msg: 'Not all fields have been provided!' })
        }

        //sending data to question table
        addQuestion(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: " connection err" })
            }
            return res.status(200).json({
                msg: "New question was created ",
                data: results
            })
        })
    },
    getQuestions: (req, res) => {
        getAllQuestions((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: " connection error" })
            }
            return res.status(200).json({ data: results });
        })
    },
    getQuestionById: (req, res) => {
        //id is postId
        let id = req.params.id;
        questionById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: " connection error" })
            }
            if (!results) {
                return res.status(400).json({ msg: "Record not found" });
            }
            return res.status(200).json({ data: results });
        })
    }
}