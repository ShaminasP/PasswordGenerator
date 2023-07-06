import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { copyMessage, nothingCopy, notify, select } from "./messages";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleCopy = (e) => {
    if (password) {
      navigator.clipboard.writeText(password);
      notify(copyMessage);
    } else {
      notify(nothingCopy, true);
    }
  };

  const handleGeneratePassword = (e) => {
    let passwordSet = "";
    if (includeLowerCase) passwordSet += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpperCase) passwordSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) passwordSet += "1234567890";
    if (includeSymbols) passwordSet += "!@#$%^&*()";

    if (passwordSet === "") {
      notify(select, true);
    }

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += passwordSet.charAt(
        Math.floor(Math.random() * passwordSet.length)
      );
    }
    setPassword(generatedPassword);
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">Password Generator</h2>
          <div className="generator_password">
            <h3>{password}</h3>
            <button className="copy_btn" onClick={handleCopy}>
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className="form-group">
            <label className="password-strength">Password Length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="20"
              min="8"
            />
          </div>

          <div className="form-group">
            <label className="uppercase-letters">
              Include Uppercase Letters
            </label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>

          <div className="form-group">
            <label className="lowercase-letters">
              Include Lowercase Letters
            </label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>

          <div className="form-group">
            <label className="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
            />
          </div>

          <div className="form-group">
            <label className="include-symbols">Include symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
          </div>

          <button onClick={handleGeneratePassword} className="generator_btn">
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
