import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  //newly added
  const dialog = useRef();
  //newly added
  //now with this we can remove showModal from timechallenge component and put instead the open method

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal(); //you are free to change it how you want as long as it works
      },
    };
  });
  return createPortal(
    // here we need to use ref as here open when used we can't make a dim background behind the dialog because it is visible with open so we need to use ref.
    // <dialog className="result-modal" open>
    // <dialog ref={ref} className="result-modal">
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost </h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,

    document.getElementById("modal")
  );
});

export default ResultModal;
