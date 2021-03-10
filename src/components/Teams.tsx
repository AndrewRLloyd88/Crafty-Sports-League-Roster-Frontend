import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Crafty MotorSports League Roster</h1>
      <Link to="/players">Players</Link>
    </div>
  );
};

export default Home;
