/* let locationsData = [
  { state: "Abuja", region: "Wuse", id: "1" },
  { state: "Abuja", region: "Garki", id: "2" },
  { state: "Lagos", region: "Surulere", id: "3" },
  { state: "Lagos", region: "Lekki", id: "4" },
  { state: "Lagos", region: "Yaba", id: "5" },
  { state: "Plateau", region: "Jos North", id: "6" },
  { state: "Plateau", region: "Jos South", id: "7" },
] */

import data from "./locationsData.json";
const locationsData = []

data.forEach( state => {
  state.cities.forEach(city => {
    const regionObject = {
      id: city.toLowerCase().replaceAll(' ', '-'),
      state: state.name, 
      region: city
    }
    locationsData.push(regionObject)
  })
})


export default locationsData;