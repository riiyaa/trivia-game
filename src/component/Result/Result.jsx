import React from "react";
import "./result.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Result() {
  const result = useSelector((state) => state.que);
  const navigate = useNavigate();

  const correctAns = result.questions.filter((res)=> res.correct_answer === res.selectedAns) 

  return (
    <>
      <div>
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </div>
      <div className="w-100 h-screen bg-slate-800 flex items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl mb-6">Final Result!</h2>
            <div className=" flex items-center gap-2">
              <p>Total Answers Served :</p>
              <p>{result.questions.length}</p>
            </div>
            <div className=" flex items-center gap-2">
              <p>Total Correct Answers :</p>
              <p>{correctAns.length}</p>
            </div>
            <div className=" flex items-center gap-2">
              <p>Total Incorrect Answeres :</p>
              <p>{result.questions.length-correctAns.length}</p>
            </div>
            <div className="card-actions mt-5">
              <button className="btn btn-primary" onClick={()=>{navigate('/')}}>Start Again !!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
