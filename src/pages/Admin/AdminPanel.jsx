import React, { useState } from "react";
import AdminLoL from "./AdminLoL";
import AdminRocketLeague from "./AdminRocketLeague";
import AdminValorant from "./AdminValorant";
import AdminFortnite from "./AdminFortnite";
import AdminCOD from "./AdminCoD";
import AdminAoE from "./AdminAoE";
import AdminTFT from "./AdminTFT";

// Importer les autres pages admin (AdminValorant, AdminFortnite, etc.)

const AdminPanel = () => {
  const [selectedGame, setSelectedGame] = useState("LoL"); // Par défaut, LoL

  const renderAdminForm = () => {
    switch (selectedGame) {
      case "LoL":
        return <AdminLoL />;
      case "RocketLeague":
        return <AdminRocketLeague />;
      case "Valorant":
        return <AdminValorant />;
      case "Fortnite":
        return <AdminFortnite />;
      case "COD":
        return <AdminCOD />;
      case "AoE":
        return <AdminAoE />;
      case "TFT":
        return <AdminTFT />;
      default:
        return <p>Sélectionnez un jeu pour commencer.</p>;
    }
  };

  return (
    <div>
      <h1>Interface d'administration</h1>
      <label htmlFor="game-select">Choisissez un jeu :</label>
      <select
        id="game-select"
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="LoL">League of Legends</option>
        <option value="RocketLeague">Rocket League</option>
        <option value="Valorant">Valorant</option>
        <option value="Fortnite">Fortnite</option>
        <option value="COD">Call of Duty</option>
        <option value="AoE">Age of Empires</option>
        <option value="TFT">Teamfight Tactics</option>
      </select>

      {/* Formulaire dynamique */}
      <div>{renderAdminForm()}</div>
    </div>
  );
};

export default AdminPanel;
