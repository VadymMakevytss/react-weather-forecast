import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import WeatherComponent from './components/WeatherComponent/WeatherComponent';
import WeatherHeader from './components/WeatherHeader/WeatherHeader';
// import { Provider } from 'react-redux';
// import store from './components/store';

function App() {
  const [ selectedCity, setselectedCity ] = useState('');

  return (
    // <Provider store={store}>
      <div className="App">
      <Card className="App">
          <Card.Body>
            <Card.Title>
              <WeatherHeader onCitySelect={setselectedCity} />
            </Card.Title>
              <WeatherComponent selectedCity={selectedCity} />
          </Card.Body>
        </Card>
      </div>
    // </Provider>
  );
}

export default App;
