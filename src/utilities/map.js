import { sortingByName } from "./sorting.js";

export function buildMap(data) {
  let map_regions = new Map();
  let counter = 0;

  data.forEach((country) => {
    // console.log(map_regions);
    // console.log(country);
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

      // Sorting
      let sortedRegions = [...map_regions].sort((a, b) =>
        sortingByName(a[0], b[0])
      );
      // console.log(sortedRegions);

      map_regions = new Map(sortedRegions);

      counter++;
      // Case where the region exists
    } else if (map_regions.has(country.region)) {
      if (country.region === "Antarctic") {
        // console.log(country);
        const countries = map_regions.get(country.region);
        // console.log(countries);
        countries.push({ name: country.name.common });

        // Sorting
        countries.sort((a, b) => sortingByName(a.name, b.name));

        counter++;
      } else {
        // Get subregion map
        const retrievedRegion = map_regions.get(country.region);

        // Case where the subregion doesn't exists
        if (!retrievedRegion.has(country.subregion)) {
          retrievedRegion.set(country.subregion, [
            { name: country.name.common },
          ]);

          // Sorting
          let sortedSubRegion = [...retrievedRegion].sort((a, b) =>
            sortingByName(a[0], b[0])
          );
          // console.log(sortedSubRegion);

          map_regions.set(country.region, new Map(sortedSubRegion));
        }
        // Case where the subregion exists => update list of countries
        else if (retrievedRegion.has(country.subregion)) {
          const countries = retrievedRegion.get(country.subregion);
          countries.push({ name: country.name.common });

          // Sorting
          countries.sort((a, b) => sortingByName(a.name, b.name));
        }

        counter++;
      }
    }
  });

  if (data.length === counter) {
    console.log("All countries have been processed");
  }

  return map_regions;
}

export function serializeMap(map) {
  const serializedMap = {};

  map.forEach((value, key) => {
    // console.log(key);
    // console.log(value);

    if (value instanceof Map) {
      serializedMap[key] = serializeMap(value);
    } else {
      serializedMap[key] = value;
    }
  });

  return serializedMap;
}
