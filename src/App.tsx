import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomeComponent from './components/home/home.component';
import RegionWiseComponent from './components/region-wise/region-wise.component';
import CountryProfileComponent from './components/country-profile/country-profile.component';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Container>
          <Card className="header">
              <Card.Body className="header-text"><img src="https://img.icons8.com/color/48/globe.png" /> Where in the world ?</Card.Body>
          </Card>
      </Container>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/region/:region" component={RegionWiseComponent} />
          <Route path="/:alpha3Code" component={CountryProfileComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
