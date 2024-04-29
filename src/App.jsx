import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Quest from './components/Quest';
import './App.css'
import Home from './components/Home';

function App() {

  const [questData, setQuestData] = useState([]);
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      fetchData();
    }
  }, []);

  function fetchData() {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        setQuestData(data.results)
      })
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quest' element={<Quest questData={questData} setQuestData={setQuestData} fetchData={fetchData} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
