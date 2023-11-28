import logo from "./logo.svg";
import "./App.css";
import data from "./data/countries_all_v1";
import countries_all from "./data/countries_all_v2";
import { buildMap, serializeMap } from "./utilities/map";

function App() {
  console.log("data.length: ", data.length);
  console.log("countries_all.length: ", countries_all.length);

  const countriesMap = buildMap(data);
  console.log("countriesMap:", countriesMap);

  const serializedMap = serializeMap(countriesMap);
  console.log(serializedMap);
  console.log("serializedMap stringify:", JSON.stringify(serializedMap));

  return (
    <div className="App">
      <header className="App-header">
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
