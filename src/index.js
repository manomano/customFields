import React from "react";
import ReactDOM from "react-dom";
//import DateField from "./customDateField";
//import Autocomplete from "./Autocomplete";


import "./styles.css";
import MapContainer from "./mapField";

const coords = [
  [43.34647059800127,41.21864926203679],
  [46.22488856675127,41.21864926203679],
  [46.22488856675127,42.6730522016756],
  [43.34647059800127,42.6730522016756],
  [43.34647059800127,41.21864926203679]
];


function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {/*<DateField date="month" value={"2019-01"} />*/}
      {/*<div>*/}
        {/*<Autocomplete*/}
          {/*parname="name_startsWith"*/}
          {/*url="https://secure.geonames.org/searchJSON?lang=eng&style=full&type=json&maxRows=10&username=georchestra"*/}
        {/*/>*/}
      {/*</div>*/}
        <div>
        <MapContainer coords={coords}/>
        </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
