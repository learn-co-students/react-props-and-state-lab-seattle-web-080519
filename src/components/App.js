import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  findPets = () => {
    fetch(
      `/api/pets${
        this.state.filters.type !== "all"
          ? "?type=" + this.state.filters.type
          : ""
      }`
    )
      .then(resp => resp.json())
      .then(data => {
        this.setState({ pets: data });
      });
  };

  adoptPet = id => {
    console.log(id);
    this.setState(prevState => {
      const newPets = prevState.pets.map(pet => {
        if (pet.id === id) {
          return Object.assign({}, pet, { isAdopted: true }); //this is a new way to create a modified pet object without modifying the original
        }
        return pet;
      });
      return { pets: newPets };
    });
  };

  changeType = newType => {
    this.setState({
      filters: {
        type: newType
      }
    });
  };

  //NOTE:
  //update state using [event.target.name]: event.target.value
  //binding
  //props in constructor

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.findPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
