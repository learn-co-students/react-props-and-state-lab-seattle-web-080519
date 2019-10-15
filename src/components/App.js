import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  };

  onFindPetsClick = () => {
    fetch(`/api/pets${
      this.state.filters.type !== "all" ? "?type=" + this.state.filters.type : ""
    }`)
    .then(response => response.json())
    // .then(json => console.log(json))
    .then(json => 
      this.setState({
        pets: json
      }));
  };

  changeType = newType => {
    // 'newType' is the event value that comes from Filters' 'handleChangeType' method
    // console.log("hjgjg", newType.target.value)
    this.setState({                         
      filters: {...this.state.filters, type: newType}
    })
    // , ()=> console.log(this.state))
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    });
    this.setState({pets})
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} 
              onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
