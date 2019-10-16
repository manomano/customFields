import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "bootstrap/dist/css/bootstrap.css";
import { FormControl } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
    alignItems: "flex-start",
    padding: 0,
    textAlign: "center"
  },
  items: {
    padding: "0px"
  },
  invisible: {
    display: "none"
  },
  inputClass: {
    width: 300,
    border: "1px solid #cccccc",
    height: 30
  },
  optionDiv: {
    border: "1px solid #cccccc",
    borderTopRightRadius: "10px"
  },
  selectInput: {
    height: 30,
    border: 0
  },
  pureWidth: {
    width: 300
  }
}));

export default function CustomDateField(props) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(
    props.date || "date"
  );

  const [dateValue, setDateValue] = React.useState(props.value || null)
  const handleChange = event => {
    setSelectedValue(event.target.value);
    
  };

  const handleDateChange = event => {
    setDateValue(event.target.value);
    console.log("rame minda daibechdos",event.target.value, typeof(event.target.value))
  }

  return (
    <div className="input-group">
      <input
        className={[FormControl, classes.pureWidth].join(" ")}
        type={selectedValue}
        name={props.name}
        value={dateValue}
        onChange={handleDateChange}
        max={2050}
        min={2000}        
      />

      <div className="input-group-append">
        <select
          onChange={handleChange}
          name="dada"
          className="btn btn-outline-secondary dropdown-toggle"
        >
          <option value="date" selected={selectedValue === "date"}>
            Date or datetime
          </option>
          <option value="month" selected={selectedValue === "month"}>
            Year and month
          </option>
          <option value="number" selected={selectedValue === "number"}>
            Year only
          </option>
        </select>
      </div>
    </div>
  );
}
