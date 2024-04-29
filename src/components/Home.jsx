import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '90vh', width: '55%' }} className="questField">
            <h1 style={{width: 'max-content', textAlign: 'center', margin: '0', fontWeight: '600'}}>Quizzical</h1>
            <p style={{width: '80%', textAlign: 'center'}}>Welcome to Quizzical, the dynamic trivia app that will pique your curiosity and put your knowledge to the test!</p>
            <Link to='/quest' style={{textDecoration: 'none'}} className="quizStartBtn">Start quiz</Link>
        </div>
    )
}