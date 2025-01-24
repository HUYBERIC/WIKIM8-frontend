import React, { useState, useEffect } from "react";

const AdminCOD = () => {
  const [formData, setFormData] = useState({
    date: "",
    event: "",
    week: "",
    equipe1: {
      nom: "",
      coach: "",
      joueurs: Array.from({ length: 4 }, () => ""),
    },
    equipe2: {
      nom: "",
      coach: "",
      joueurs: Array.from({ length: 4 }, () => ""),
    },
    scoreBO: "",
    typeBO: "BO5",
    games: [],
    rewards: {
      topKills: { joueur: "", kills: 0 },
      topRatio: { joueur: "", ratio: 0 },
      mvp: "",
    },
  });

  // Définir les limites des games pour chaque BO
  const BO_CONFIG = {
    BO3: { min: 2, max: 3 },
    BO5: { min: 3, max: 5 },
    BO7: { min: 4, max: 7 },
    BO9: { min: 5, max: 9 },
  };

  // Créer un template de game
  const createGameTemplate = (gameNumber) => ({
    numero: gameNumber,
    modeDeJeu: "",
    map: "",
    equipe1Stats: Array.from({ length: 4 }, () => ({ pseudo: "", kills: 0, deaths: 0, ratio: 0 })),
    equipe2Stats: Array.from({ length: 4 }, () => ({ pseudo: "", kills: 0, deaths: 0, ratio: 0 })),
  });

  // Réinitialiser les games en fonction du BO
  useEffect(() => {
    const { min } = BO_CONFIG[formData.typeBO];
    const newGames = [];
    for (let i = 0; i < min; i++) {
      newGames.push(createGameTemplate(i + 1));
    }
    setFormData((prev) => ({ ...prev, games: newGames }));
  }, [formData.typeBO]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatsChange = (gameIndex, team, playerIndex, field, value) => {
    const updatedGames = [...formData.games];
    updatedGames[gameIndex][team][playerIndex][field] = value;
    setFormData({ ...formData, games: updatedGames });
  };

  const addGame = () => {
    const { max } = BO_CONFIG[formData.typeBO];
    if (formData.games.length >= max) {
      alert(`Vous ne pouvez pas ajouter plus de ${max} games pour un ${formData.typeBO}.`);
      return;
    }
    setFormData({
      ...formData,
      games: [...formData.games, createGameTemplate(formData.games.length + 1)],
    });
  };

  const removeGame = (index) => {
    const { min } = BO_CONFIG[formData.typeBO];
    if (formData.games.length <= min) {
      alert(`Vous ne pouvez pas avoir moins de ${min} games pour un ${formData.typeBO}.`);
      return;
    }
    const updatedGames = formData.games.filter((_, i) => i !== index);
    setFormData({ ...formData, games: updatedGames });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data COD:", formData);
  };

  return (
    <div>
      <h2>Encoder un Match Call of Duty</h2>
      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <label>Event :</label>
        <input type="text" name="event" value={formData.event} onChange={handleChange} />
        <label>Week :</label>
        <input type="text" name="week" value={formData.week} onChange={handleChange} />
        <h3>Équipe 1</h3>
        <label>Nom :</label>
        <input
          type="text"
          value={formData.equipe1.nom}
          onChange={(e) => setFormData({ ...formData, equipe1: { ...formData.equipe1, nom: e.target.value } })}
        />
        <label>Coach :</label>
        <input
          type="text"
          value={formData.equipe1.coach}
          onChange={(e) => setFormData({ ...formData, equipe1: { ...formData.equipe1, coach: e.target.value } })}
        />
        <h4>Joueurs :</h4>
        {formData.equipe1.joueurs.map((player, index) => (
          <div key={index}>
            <label>Joueur {index + 1} :</label>
            <input
              type="text"
              value={player}
              onChange={(e) => {
                const updatedPlayers = [...formData.equipe1.joueurs];
                updatedPlayers[index] = e.target.value;
                setFormData({
                  ...formData,
                  equipe1: { ...formData.equipe1, joueurs: updatedPlayers },
                });
              }}
            />
          </div>
        ))}
        <h3>Games</h3>
        <label>Format (BO) :</label>
        <select
          name="typeBO"
          value={formData.typeBO}
          onChange={(e) => setFormData({ ...formData, typeBO: e.target.value })}
        >
          <option value="BO3">BO3</option>
          <option value="BO5">BO5</option>
          <option value="BO7">BO7</option>
          <option value="BO9">BO9</option>
        </select>
        {formData.games.map((game, index) => (
          <div key={index}>
            <h4>Game {game.numero}</h4>
            <label>Mode de Jeu :</label>
            <input
              type="text"
              value={game.modeDeJeu}
              onChange={(e) => {
                const updatedGames = [...formData.games];
                updatedGames[index].modeDeJeu = e.target.value;
                setFormData({ ...formData, games: updatedGames });
              }}
            />
            <label>Map :</label>
            <input
              type="text"
              value={game.map}
              onChange={(e) => {
                const updatedGames = [...formData.games];
                updatedGames[index].map = e.target.value;
                setFormData({ ...formData, games: updatedGames });
              }}
            />
            <h4>Statistiques :</h4>
            <h5>Équipe 1</h5>
            {game.equipe1Stats.map((stat, playerIndex) => (
              <div key={playerIndex}>
                <label>Joueur :</label>
                <input
                  type="text"
                  value={stat.pseudo}
                  onChange={(e) =>
                    handleStatsChange(index, "equipe1Stats", playerIndex, "pseudo", e.target.value)
                  }
                />
                <label>Kills :</label>
                <input
                  type="number"
                  value={stat.kills}
                  onChange={(e) =>
                    handleStatsChange(index, "equipe1Stats", playerIndex, "kills", e.target.value)
                  }
                />
                <label>Deaths :</label>
                <input
                  type="number"
                  value={stat.deaths}
                  onChange={(e) =>
                    handleStatsChange(index, "equipe1Stats", playerIndex, "deaths", e.target.value)
                  }
                />
                <label>Ratio :</label>
                <input
                  type="number"
                  value={stat.ratio}
                  onChange={(e) =>
                    handleStatsChange(index, "equipe1Stats", playerIndex, "ratio", e.target.value)
                  }
                />
              </div>
            ))}
            <button type="button" onClick={() => removeGame(index)}>
              Supprimer cette Game
            </button>
          </div>
        ))}
        <button type="button" onClick={addGame}>
          Ajouter une Game
        </button>
        <h3>Récompenses</h3>
        <label>MVP :</label>
        <input
          type="text"
          value={formData.rewards.mvp}
          onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, mvp: e.target.value } })}
        />
        <br />
        <label>Top Kills :</label>
        <input
          type="text"
          value={formData.rewards.topKills.joueur}
          onChange={(e) =>
            setFormData({
              ...formData,
              rewards: { ...formData.rewards, topKills: { ...formData.rewards.topKills, joueur: e.target.value } },
            })
          }
        />
        <input
          type="number"
          value={formData.rewards.topKills.kills}
          onChange={(e) =>
            setFormData({
              ...formData,
              rewards: { ...formData.rewards, topKills: { ...formData.rewards.topKills, kills: e.target.value } },
            })
          }
        />
        <br />
        <label>Top Ratio :</label>
        <input
          type="text"
          value={formData.rewards.topRatio.joueur}
          onChange={(e) =>
            setFormData({
              ...formData,
              rewards: { ...formData.rewards, topRatio: { ...formData.rewards.topRatio, joueur: e.target.value } },
            })
          }
        />
        <input
          type="number"
          value={formData.rewards.topRatio.ratio}
          onChange={(e) =>
            setFormData({
              ...formData,
              rewards: { ...formData.rewards, topRatio: { ...formData.rewards.topRatio, ratio: e.target.value } },
            })
          }
        />
        <br />
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default AdminCOD;