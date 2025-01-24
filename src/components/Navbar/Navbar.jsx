import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/rocketleague">Rocket League</Link></li>
      <li><Link to="/valorant">Valorant</Link></li>
      <li><Link to="/cod">Call of Duty</Link></li>
      <li><Link to="/fortnite">Fortnite</Link></li>
      <li><Link to="/aoe">Age of Empire</Link></li>
      <li><Link to="/lol">League of Legends</Link></li>
      <li><Link to="/tft">Teamfight Tactics</Link></li>
      <li><Link to="/admin">Admin</Link></li>
    </ul>
  </nav>
);

export default Navbar;
