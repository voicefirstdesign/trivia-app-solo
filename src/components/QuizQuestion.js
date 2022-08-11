import React from "react";
import ".././App.css"
import App from "../App";

export default function QuizQuestion(props){ 
return(
    <div key={props.index}>
          <h1 className="question-heading">{props.question}</h1>
          <div className="btn-answers-container">
          {props.answers?.map((answer, i) => (
            <button onClick={props.isSelected}
            className= {answer.isSelected ? "btn-selected" : "btn-answer"} key={i}>{answer.answer}</button>  
            
          ))}
          </div>
          <hr />
        </div>
        
)
}