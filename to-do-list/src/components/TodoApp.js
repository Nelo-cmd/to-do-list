import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Entry() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("What's your Name?");
  const [buttonText, setButtonText] = useState("Submit");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const HandleStart = () => {
    navigate("/Homepage");
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    if (buttonText === "Submit") {
      if (name.trim() === "") {
        alert("We need a name, hun.");
        return;
      }
      setIsSubmitted(true);
      setMessage(`Hi ${name}, are you ready to be productive?`);
      setButtonText("Let's go!");
    } else {
      HandleStart();
    }
  };

  return (
    <form>
      <h1>{message}</h1>
      {!isSubmitted && (
        <input
          placeholder="?"
          type="text"
          id="message"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      )}
      <button id="submit" onClick={HandleSubmit}>
        {buttonText}
      </button>
    </form>
  );
}

export default Entry;
