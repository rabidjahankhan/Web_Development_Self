import { useState } from "react";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email && !enteredValues.email.includes("@");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Login form submitted");
    // Handle login logic here

    console.log(enteredValues);
  }

  function handleInputChange(identifire, event) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifire]: event.target.value,
    }));
    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [identifire]: true,
    }));
  }

  function handleInputBlur(identifire, event) {
    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [identifire]: true,
    }));
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event)}
            value={enteredValues.email}
          />
          <div className="control-error">
            {emailIsInvalid && (
              <p className="error-text">Please enter a valid email address.</p>
            )}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleInputChange("password", event)}
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
