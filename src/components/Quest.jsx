import QuestionAndAnswer from "./QuestionAndAnswer"
import { useState } from 'react'
import '../styles/Quest.css'

export default function Quest({ questData, fetchData, setQuestData }) {

    // get correct answer: [...ans]
    const [correctAnswers, setCorrectAnswers] = useState([])
    // answers chosen: {quest: ..., ans: ...}
    const [chosens, setChosens] = useState([]);
    const [totalPoint, setTotalPoint] = useState(0);
    const [maxPoint, setMaxPoint] = useState(0);

    function checkAns() {
        if (correctAnswers.length === chosens.length) {
            let score = 0, maxScore = 0;
            chosens.forEach(qna => {
                if (correctAnswers.includes(qna.ans)) {
                    score++;
                }
                maxScore++;
            })
            setTotalPoint(score);
            setMaxPoint(maxScore);
        } else {
            alert('Please answer all questions');
        }
    }

    function reset() {
        setMaxPoint(0);
        setTotalPoint(0);
        setChosens([]);
        setCorrectAnswers([]);
        setQuestData([]);
        fetchData();
    }

    return (
        <div className="questField">
            {questData.map((data, i) => (
                <span key={i}>
                    <QuestionAndAnswer questData={data} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} chosens={chosens} setChosens={setChosens} maxPoint={maxPoint} />
                </span>
            ))}
            {
                maxPoint !== 0
                    ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ fontWeight: '600', fontSize: '18px' }}>You scored {totalPoint}/{maxPoint} correct answers</p>
                        <button className="quizBtn" style={{ margin: '20px' }} onClick={reset}>Play again</button>
                    </div>
                    :
                    <button className="quizBtn" onClick={checkAns}>Check answers</button>
            }
        </div>
    )
}