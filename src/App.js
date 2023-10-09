import logo from "./logo.svg";
import "./App.css";
import data from "./data/countries";

function App() {
  // console.log("data:", data);
  const map_regions = new Map();

  console.log("data.length: ", data.length);

  data.forEach((country) => {
    // console.log(map_regions);
    // console.log("name:", country.name.common);
    // console.log("region:", country.region);

    // Case where the region doesn't exists
    if (!map_regions.has(country.region)) {
      // // Antarctic has no subregions
      if (country.region === "Antarctic") {
        map_regions.set(country.region, [{ name: country.name.common }]);
      } else {
        // Creation of the subregion Map()
        const subregion = new Map();
        subregion.set(country.subregion, [{ name: country.name.common }]);

        // Set map_regions with the updated "subregion" map
        map_regions.set(country.region, subregion);
      }

      // Case where the region exists
    } else if (map_regions.has(country.region)) {
      if (country.region === "Antarctic") {
        const countries = map_regions.get(country.region);
        countries.push({ name: country.name.common });
      } else {
        // Get subregion map
        const retrievedRegion = map_regions.get(country.region);

        // Case where the subregion doesn't exists
        if (!retrievedRegion.has(country.subregion)) {
          retrievedRegion.set(country.subregion, [
            { name: country.name.common },
          ]);
        }
        // Case where the subregion exists => update list of countries
        else if (retrievedRegion.has(country.subregion)) {
          const countries = retrievedRegion.get(country.subregion);
          countries.push({ name: country.name.common });
        }
      }
    }
  });

  console.log("map_regions:", map_regions);

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
