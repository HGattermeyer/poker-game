import logo from "./logo.svg";
import "./App.css";

import Game from "./components/card/game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game />

        {/* <Card id={Math.floor(Math.random() * 52) + 1} />
        <Card id={Math.floor(Math.random() * 52) + 1} />
        <Card id={Math.floor(Math.random() * 52) + 1} />
        <Card id={Math.floor(Math.random() * 52) + 1} />
        <Card id={Math.floor(Math.random() * 52) + 1} /> */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
