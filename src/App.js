import "./App.scss";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const naviagteToQandA = () => {
    navigate("/question-answer");
  };

  return (
    <>
      <div className="w-100 h-screen flex items-center justify-center bg-slate-800">
        <div
          className="absolute top-2/4 z-10 p-2 rounded-lg bg-slate-500 w-max cursor-pointer hover:bg-slate-400 text-gray-50 text-xl"
          onClick={naviagteToQandA}
        >
          Start Game
        </div>
      </div>
      <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </>
  );
}

export default App;
