import Results from "./components/Results.jsx";
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import { useState } from "react";

function App() {
  const [usrInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    dration: 10,
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={usrInput} onChange={handleChange}/>
      <Results input={usrInput} /> 
    </>
  );
}

export default App;
