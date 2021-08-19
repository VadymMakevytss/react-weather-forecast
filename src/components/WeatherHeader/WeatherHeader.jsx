import React, { useState } from 'react';
import './WeatherHeader.css'

const WeatherHeader = ({ onCitySelect }) => {
  const [language, setLanguage] = useState('ru');
  const [city, setCity ] = useState('');

  const handleInput = (event) => {
    setCity(event.target.value);
  }

  const handleLanguage = (event) => {
    setLanguage(event.target.value)
    console.log(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onCitySelect(city);
    setCity('')
  }

  return (
    <div className="querry">
      <form
        className="querry__form"
        onSubmit={handleSubmit}
      >
          <input 
            className="query__input"
            type="text"
            value={city}
            onChange={handleInput}
          />
          <button 
            className="query__submit"
            type="submit" 
            value="Submit"
          >
            Add
          </button>
      </form>
      <select
      className="query__language"
        name="language"
        value={language}
        onChange={handleLanguage}
      >
        <option
          value="en"
        >
          En
        </option>
        <option
          value="ru"
        >
          Ru
        </option>
        <option
          value="ua"
        >
          Ua
        </option>
      </select>
    </div>
  )
}

export default WeatherHeader;
