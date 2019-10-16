import React, { Component } from "react";
import PropTypes from "prop-types";

export class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };
  static defaultProperty = {
    suggestions: []
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const userInput = e.currentTarget.value;
    if (userInput.length < 2) {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: userInput
      });
      return;
    }

    console.log("userInput", userInput);
    const url = this.props.url + "&" + this.props.parname + "=" + userInput;
    //const url = "https://reqres.in/api/users?page=2";
    const self = this;
    fetch(url)
      .then(resp => resp.json())
      .then(function(response) {
        self.setState(
          {
            activeSuggestion: 0,
            filteredSuggestions: response.geonames, //response.data
            showSuggestions: true,
            userInput: userInput
          },
          () => {
            console.log("state updated to", self.state);
          }
        );
      })
      .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log("rame", err);
      });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.target.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className="autocomplete-items">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <div key={"i_" + index} onClick={onClick}>
                  {suggestion.adminName1}
                </div>
              );
            })}
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div>
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="autocomplete">
          <input
            id="searchInput"
            type="search"
            onChange={onChange}
            value={userInput}
          />
          {suggestionsListComponent}
        </div>
      </React.Fragment>
    );
  }
}

export default Autocomplete;
