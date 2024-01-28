import { useState, useRef } from "react";
export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  // const [submitted, setSubmitted] = useState(false);
  /*
  function handleChange(event) {
    setSubmitted(false);
    setEnteredPlayerName(event.target.value);
  }
  */

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section id="player">
      {/* <h2>Welcome {enteredPlayerName ? enteredPlayerName : "unkown entity"}</h2> */}
      {/* the below one is same as above but the left one is when truthy and right one is when false*/}
      <h2>Welcome {enteredPlayerName ?? "unkown entity"}</h2>
      <p>
        <input
          ref={playerName}
          // onChange={handleChange}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
