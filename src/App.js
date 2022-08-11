
import './App.css';
import React from 'react';
import { useEffect } from 'react';
import QuizQuestion from './components/QuizQuestion';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'



export default function App() {

  const [quizData, setQuizData] = React.useState([])
  const [gameStarted, setGameStarted] = React.useState(false)
  
  let obj = {}
  let correctAnswersArray = []
  let incorrectAnswersArray = []
  let questions = []
  

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
        

        //map over the results and store it an an object
         obj = data.results.map(result => (
            questions = {question: result.question},
            correctAnswersArray = [{answer: result.correct_answer, isCorrect: true, isSelected: false, id: Math.floor(Math.random() * 100000)}],
            //map deeper to get the incorrect answers and store it in an array variable
            incorrectAnswersArray = result.incorrect_answers.map(wrongAns => (
              {answer: wrongAns, isCorrect: false, isSelected: false, id: Math.floor(Math.random() * 100000)}
            )),
            //let the obj = your items in a restructured manor
            obj = 
            {
              ...questions,
              answersArray:[
              ...correctAnswersArray,
              ...incorrectAnswersArray,
              ]
            }
            
          ))
          // set the state to obj created above
          setQuizData(obj)

        })
        
  }, [])

  //this function allows you to shuffle array's you pass in
  function shuffleArray(array){
    array.sort(() => Math.random() - 0.5);
  }
  
  
  function startGame(){
    setGameStarted(true)
    
  }

  
  console.log(quizData)

function isSelected(id){
  setQuizData(prevData => prevData.map(data => {
      data[1].answersArray.map(arrayItem => {
        return arrayItem.id === id ? {...arrayItem, isSelected: !arrayItem.isSelected} : arrayItem
      })
    
    
  }))
}
  

  

  return (
  
    <div className="App"> 
      
      {/* Conditional rendering */}
      {
      gameStarted ? "" : 
      <div className='intro-screen-container'>
        <div className='intro-screen'>
          <h1 className='intro-heading'>Quizzical</h1>
          <h3 className='intro-tagline'>A quiz game made by stock OSRS Bot</h3>
          <button className='btn-start-game' onClick={startGame}>Start Quiz</button>
        </div>
      </div>
      }
      
      {gameStarted && 
      <div className='quiz-component'>
        {quizData.map((quizResult, index) => (
        shuffleArray(quizResult.answersArray),
          <>
          <QuizQuestion
            
            key={index}
            question={quizResult.question}
            answers={quizResult.answersArray}
            isSelected={() => quizResult.answersArray.map(arrayItem => (
              isSelected(arrayItem.id)
            ))}
            
            
            />
          </>
          
        
      ))}
      <button className='btn-start-game btn-check-answers'>Check Answers</button>
      </div>}
      
    </div>
  );
}