import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

//let timer; //also variable outside component function is not a solution as it overrides the timer pointer if I clicked on two timerchallenges then it overrides the past click with the new click and then you'll lose in the past challenge even if you clicked on stop challenge. So using variables is not a good technique.
//refs can be a solution because refs are not just for dom element connections they can also be used to manage any kind of value.
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(); //each timerchallenge component instance gets its own timer ref and also when the component function reexecutes the ref doesn't lose its previous values as react like in states store them in an array where it doesn't get lost
  const dialog = useRef(); //using ref as a prop to another component does not work unless we import in resultmodal forwardref from react.
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  //let timer; //whenever state changes this component function rexecuted and that also means that this variable is recreated so the timer used in handleStop will be a different timer than in handleStart because in between the component function rexecuted because we updated the state in handleStart that's why we can't use this variable technique to stop the challenge. We could use this variable if we define it outside the compoennt function because then it would not be recreated.

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    /*
    timer.current = setTimeout(() => { //we delete this as setIntenval we want for knowing the score
      setTimerExpired(true);
      // dialog.current.showModal();
      dialog.current.open(); //the open method is the open method in resultmodal with the help of useimperativehandle and forward handle the connection to the object is handled and now we detached the timer challenge component from the dialog element in this resultmodal component and now you can change the logic of open method in resultmodal directly
    }, targetTime * 1000);
    */

    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timerExpired && <p>You Lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
