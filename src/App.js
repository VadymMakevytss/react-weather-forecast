import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import WeatherComponent from './components/WeatherComponent/WeatherComponent';
import WeatherHeader from './components/WeatherHeader/WeatherHeader';

function App() {
  return (
    <div className="App">
     <Card className="App">
        <Card.Body>
          <Card.Title>
            <WeatherHeader />
          </Card.Title>
            <WeatherComponent />
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
