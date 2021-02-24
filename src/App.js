import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

// const API_KEY = "Your-api-key";
const API_KEY = "aedbb2d845263a9cad4857bcec585195";

class App extends Component {
  state = {
    recipes: [],
    loading: false
  }
  getRecipe = async (e) => {
    e.preventDefault();
    this.setState({ loading: !this.state.loading });
    const recipeName = e.target.elements.recipeName.value;
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=20`);
    
    const data = await api_call.json();
    await this.setState({ recipes: data.recipes });
    console.log(this.state.recipes);
    await this.setState({ loading: !this.state.loading });
  }
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }
  render() {
    return (
      <div className="App">
        <div id="cover-spin" style={{ display: this.state.loading ? "block" : "none" }}></div>
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;