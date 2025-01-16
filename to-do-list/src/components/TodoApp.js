import { useNavigate } from "react-router-dom";

function Entry() {
  const navigate = useNavigate();

  const HandleClick = () => {
    navigate("/Homepage");
  };
  return (
    <>
      <></>
      <h1>Hi Nelo, ready to be productive?</h1>
      <button className="entry-button" onClick={HandleClick}>
        Let's Go!
      </button>
    </>
  );
}

export default Entry;
