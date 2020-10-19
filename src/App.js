import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const App = () => {
  const [pokemon, setPokemon] = useState('pikachu')
  const [pokemonData, setPokemonData] = useState([])
  const [pokemonType, setPokemonType] = useState('')
  const [pokemonAbility, setPokemonAbility] = useState('')

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
      <form onSubmit={handleSubmit}>
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
            <img src={data.sprites['front_default']} alt="pokemon"/>
            <div className='table'>
              <div className='tableBody'></div>
                <div className='tableRow'>
                  <div className='tableCell'>Type</div>
                  <div className='tableCell'>{ pokemonType }</div>
                </div>
                <div className='tableRow'>
                  <div className='tableCell'>Height</div>
                  <div className='tableCell'>{ '' }{ Math.round(data.height * 3.9) } inches</div>
                </div>
                <div className='tableRow'>
                  <div className='tableCell'>Weight</div>
                  <div className='tableCell'>{ '' }{Math.round(data.weight / 4.3)} lbs</div>
                </div>
                <div className='tableRow'>
                  <div className='tableCell'>Abilities</div>
                  <div className='tableCell'>{ '' }{ pokemonAbility }</div>
                </div>
              </div>
            </div>
        )
      })}
    </div>
  );
}

export default App;
