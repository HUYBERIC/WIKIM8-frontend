import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.scss";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminPanel from "./pages/Admin/AdminPanel";

const RocketLeague = () => <h1>Rocket League</h1>;
const Valorant = () => <h1>Valorant</h1>;
const COD = () => <h1>Call of Duty</h1>;
const Fortnite = () => <h1>Fortnite</h1>;
const AgeOfEmpire = () => <h1>Age of Empire</h1>;
const LeagueOfLegends = () => <h1>League of Legends</h1>;
const TeamfightTactics = () => <h1>Teamfight Tactics</h1>;

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rocketleague" element={<RocketLeague />} />
        <Route path="/valorant" element={<Valorant />} />
        <Route path="/cod" element={<COD />} />
        <Route path="/fortnite" element={<Fortnite />} />
        <Route path="/aoe" element={<AgeOfEmpire />} />
        <Route path="/lol" element={<LeagueOfLegends />} />
        <Route path="/tft" element={<TeamfightTactics />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
