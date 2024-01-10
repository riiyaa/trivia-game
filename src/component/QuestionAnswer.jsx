import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addQuestions } from "./store/questionSlice";
import { useNavigate } from "react-router-dom";

function QuestionAnswer() {
  const count = useSelector((state) => state.que);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [displayQue, setDisplayQue] = useState({});
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    callAPI();
  }, []);

  const callAPI = () => {
    fetch("https://opentdb.com/api.php?amount=1")
      .then((response) => response.json())
      .then((res) => {
        if (res.results) {
          res.results[0].mixArr = [
            ...res.results[0].incorrect_answers,
            res.results[0].correct_answer,
          ].toSorted((a, b) => 0.5 - Math.random());
          setDisplayQue(res.results[0]);
          setIsLoading(false);
        } else {
          callAPI();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkValidation = () => {
    setSubmit(true);
    if (displayQue.selectedAns) {
    } else {
      setError(true);
      setSubmit(false);
    }
  };

  const selectVal = (e) => {
    setDisplayQue((prev) => ({ ...prev, selectedAns: e.target.id }));
    setError(false);
    setSubmit(false);
  };

  const goToNextQue = () => {
    if (submit && count.questions.length + 1 < 10) {
      setIsLoading(true);
      setError(false);
      setSubmit(false);
      dispatch(addQuestions(displayQue));
      setDisplayQue({});
      callAPI();
    } else {
      dispatch(addQuestions(displayQue));
      navigate("/result");
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex justify-center items-center w-100 h-screen bg-slate-800">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          {error ? (
            <div className="absolute top-2 right-4">
              <div role="alert" className="alert alert-error  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Error! Please Select any one.</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex justify-center items-center w-100 h-screen bg-slate-800">
            <div className="card w-3/5 glass">
              <div className="card-body">
                <h2 className="card-title text-slate-700 text-xl">
                  Question {count.questions.length + 1}
                </h2>
                <p
                  className="text-base mb-4"
                  dangerouslySetInnerHTML={{ __html: displayQue.question }}
                ></p>

                <div className="px-2">
                  {displayQue?.mixArr?.map((item, index) => {
                    return (
                      <div key={index} className="flex items-center gap-2 my-4">
                        <input
                          type="radio"
                          name={displayQue.type}
                          className={
                            submit &&
                            displayQue.mixArr[index] ===
                              displayQue.correct_answer
                              ? "radio radio-success mx-2 "
                              : submit &&
                                displayQue.mixArr[index] ===
                                  displayQue.selectedAns &&
                                displayQue.selectedAns !==
                                  displayQue.correct_answer
                              ? "radio mx-2 radio-error"
                              : "radio mx-2"
                          }
                          id={item}
                          onChange={(e) => selectVal(e)}
                          disabled={submit}
                        />
                        <label
                          className={
                            submit &&
                            displayQue.mixArr[index] ===
                              displayQue.correct_answer
                              ? "cursor-pointer text-green-700"
                              : submit &&
                                displayQue.mixArr[index] ===
                                  displayQue.selectedAns &&
                                displayQue.selectedAns !==
                                  displayQue.correct_answer
                              ? "cursor-pointer text-red-700"
                              : submit
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }
                          htmlFor={item}
                        >
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn bg-slate-400 text-black hover:bg-slate-300"
                    onClick={() => {
                      if (!submit) {
                        checkValidation();
                      } else {
                        goToNextQue();
                      }
                    }}
                  >
                    {submit && count.questions.length + 1 === 10
                      ? "Finish"
                      : submit && count.questions.length + 1 < 10
                      ? "Next"
                      : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default QuestionAnswer;
