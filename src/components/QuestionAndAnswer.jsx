import { useEffect, useState } from 'react'
import { decode } from 'html-entities'

export default function QuestionAndAnswer({ questData, setChosens, chosens, correctAnswers, setCorrectAnswers, maxPoint }) {
    // get question
    const [question, setQuestion] = useState("");
    // get all answers
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setQuestion(questData.question);
        const allAnswers = [...questData.incorrect_answers];
        allAnswers.splice(Math.floor(Math.random() * 4), 0, questData.correct_answer);
        setAnswers(allAnswers);
        setCorrectAnswers(prev => {
            const decAns = decode(questData.correct_answer);
            return !prev.includes(decAns) ? [...prev, decAns] : prev;
        });
    }, [questData])

    const handleLabelClick = (event) => {
        const input = event.target.previousSibling;
        input.click();
    }

    //[...prev, {quest: question, ans: e.target.value}]
    const handleChosen = (e) => {
        setChosens(prev => {
            if (prev.find(item => item.quest === question)) {
                const newArr = prev.filter(item => item.quest !== question)
                return [...newArr, { quest: question, ans: e.target.value }]
            } else {
                return [...prev, { quest: question, ans: e.target.value }]
            }
        })
    }

    return (
        <div className='aQuest'>
            <h3>{decode(question)}</h3>
            <div>
                {answers.map((ans, i) => (
                    <span key={i}>
                        <input
                            type='radio'
                            name={question}
                            value={decode(ans)}
                            checked={chosens.find(c => c.ans === decode(ans)) ? true : false}
                            onChange={(e) => handleChosen(e)}
                            disabled={ maxPoint !== 0 }
                        />
                        <label
                            htmlFor={question}
                            onClick={(e) => handleLabelClick(e)}
                            className='styledLabel'
                            style={{ 
                                backgroundColor: maxPoint !== 0 ? 
                                    (correctAnswers.includes(decode(ans)) ? '#05fa4ee1' : // background when answer checked correctly
                                        (chosens.find(c => c.ans === decode(ans)) ? '#3e9e265e' : 'transparent')) : // background when answer checked wrong
                                        (chosens.find(c => c.ans === decode(ans)) ? '#c3ccf8c3' : 'transparent'), // background when user choose an answer
                            }}
                        >
                            {decode(ans)}
                        </label>
                    </span>
                ))}
            </div>
            {/* {maxPoint !== 0 && <p>Answer: {decode(questData.correct_answer)}</p>} */}
        </div>
    )
}