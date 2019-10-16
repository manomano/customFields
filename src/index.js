import React from "react";
import ReactDOM from "react-dom";
import DateField from "./customDateField";
import Autocomplete from "./Autocomplete";


import "./styles.css";
import MapContainer from "./mapField";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <DateField date="month" value={"2019-01"} />
      <div>
        <Autocomplete
          parname="name_startsWith"
          url="https://secure.geonames.org/searchJSON?lang=eng&style=full&type=json&maxRows=10&username=georchestra"
        />
      </div>
        <div>
        <MapContainer/>
        </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
