import React from 'react';

const Dashboard = () => {
  return (
    <div className={`dashboard`}>
      <h1>Bienvenue sur Wiki M8</h1>
      <p>Suivez les résultats des Gentle Mates sur tous les jeux compétitifs.</p>
      <div className="dashboard-links">
        <a href="/rocketleague">Rocket League</a>
        <a href="/valorant">Valorant</a>
        <a href="/lol">League of Legends</a>
        <a href="/fortnite">Fortnite</a>
        <a href="/cod">Call of Duty</a>
        <a href="/tft">Teamfight Tactics</a>
        <a href="/aoe">Age of Empire</a>
      </div>
    </div>
  );
};

export default Dashboard;
