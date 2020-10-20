import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Pokedex from './pokedex.png'

const App = () => {
  const [pokemon, setPokemon] = useState('')
  const [pokemonData, setPokemonData] = useState([])
  const [pokemonType, setPokemonType] = useState('')
  const [pokemonAbility, setPokemonAbility] = useState('')

  // for (i = 0; i < data.abilities.length; i++) {
  //   console.log(data.abilities.ability.name)
  // }

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url)
      toArray.push(res.data)
      setPokemonType(res.data.types[0].type.name)
      setPokemonAbility(res.data.abilities[0].ability.name)
      setPokemonData(toArray)
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getPokemon()
  } 

  return (
    <div className="App">
      <img src={Pokedex} alt="" className='pokedex' />
      <div className='pokedex-info'>
      <form className='formid' onSubmit={handleSubmit}>
        <label>
          <input 
            type="text" 
            onChange={handleChange} 
            placeholder='Enter Pokemon name'/>
        </label>
      </form>
      {pokemonData.map((data) => {
        return(
          <div className='container'>
            <img src={data.sprites['front_default']} alt="pokemon" className='pokemonpic'/>
            <div className='table'>
                <div className='tableRow'>
                  <h1>Type: </h1>
                  <div className='tableCell'>{ pokemonType }</div>
                </div>
                <div className='tableRow'>
                  <h1>HT: </h1>
                  <div className='tableCell'>{ '' }{ Math.round(data.height * 0.328084) }'</div>
                </div>
                <div className='tableRow'>
                  <h1>WT: </h1>
                  <div className='tableCell'>{ '' }{Math.round(data.weight / 4.3)} lbs</div>
                </div>
                <div className='tableRow'>
                  <h1>Ability: </h1>
                  <div className='tableCell'>{ '' }{ pokemonAbility }</div>
                </div>
              </div>
            </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
