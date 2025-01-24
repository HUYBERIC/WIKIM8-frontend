import React, { useState, useEffect } from "react";

const AdminLoL = () => {
  const [formData, setFormData] = useState({
    equipe1: "",
    equipe2: "",
    date: "",
    event: "",
    enjeu: "",
    bo: "BO1",
    scoreFinal: "",
    games: [
      {
        numero: 1,
        scoreEquipe1: 0,
        scoreEquipe2: 0,
        draft1: Array.from({ length: 5 }, () => ({ pseudo: "", champion: "" })),
        draft2: Array.from({ length: 5 }, () => ({ pseudo: "", champion: "" })),
        statsTeam1: Array.from({ length: 5 }, () => ({
          joueur: "",
          kills: 0,
          deaths: 0,
          assists: 0,
        })),
        statsTeam2: Array.from({ length: 5 }, () => ({
          joueur: "",
          kills: 0,
          deaths: 0,
          assists: 0,
        })),
        mvp: "",
      },
    ],
  });

  const getMinGames = (bo) => {
    switch (bo) {
      case "BO1":
        return 1;
      case "BO2":
        return 2;
      case "BO3":
        return 2;
      case "BO5":
        return 3;
      case "BO7":
        return 4;
      default:
        return 1;
    }
  };

  const getMaxGames = (bo) => {
    switch (bo) {
      case "BO1":
        return 1;
      case "BO2":
        return 2;
      case "BO3":
        return 3;
      case "BO5":
        return 5;
      case "BO7":
        return 7;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const minGames = getMinGames(formData.bo);
    const currentGames = formData.games.length;

    if (currentGames < minGames) {
      const newGames = [];
      for (let i = currentGames; i < minGames; i++) {
        newGames.push({
          numero: i + 1,
          scoreEquipe1: 0,
          scoreEquipe2: 0,
          draft1: Array.from({ length: 5 }, () => ({ pseudo: "", champion: "" })),
          draft2: Array.from({ length: 5 }, () => ({ pseudo: "", champion: "" })),
          statsTeam1: Array.from({ length: 5 }, () => ({
            joueur: "",
            kills: 0,
            deaths: 0,
            assists: 0,
          })),
          statsTeam2: Array.from({ length: 5 }, () => ({
            joueur: "",
            kills: 0,
            deaths: 0,
            assists: 0,
          })),
          mvp: "",
        });
      }
      setFormData({ ...formData, games: [...formData.games, ...newGames] });
    } else if (currentGames > minGames) {
      setFormData({
        ...formData,
        games: formData.games.slice(0, minGames),
      });
    }
  }, [formData.bo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGameChange = (index, field, value) => {
    const updatedGames = [...formData.games];
    updatedGames[index][field] = value;
    setFormData({ ...formData, games: updatedGames });
  };

  const handleArrayChange = (gameIndex, field, arrayIndex, subField, value) => {
    const updatedGames = [...formData.games];
    updatedGames[gameIndex][field][arrayIndex][subField] = value;
    setFormData({ ...formData, games: updatedGames });
  };

  const addGame = () => {
    const maxGames = getMaxGames(formData.bo);
    if (formData.games.length >= maxGames) {
      alert(
        `Vous ne pouvez pas ajouter plus de ${maxGames} games pour un ${formData.bo}.`
      );
      return;
    }
    const newGame = {
      numero: formData.games.length + 1,
      scoreEquipe1: 0,
      scoreEquipe2: 0,
      draft1: Array.from({ length: 5 }, () => ({ pseudo: "", champion: "" })),
      draft2: Array.from({ length: 5 }, () => ({ pseudo: "", champion: "" })),
      statsTeam1: Array.from({ length: 5 }, () => ({
        joueur: "",
        kills: 0,
        deaths: 0,
        assists: 0,
      })),
      statsTeam2: Array.from({ length: 5 }, () => ({
        joueur: "",
        kills: 0,
        deaths: 0,
        assists: 0,
      })),
      mvp: "",
    };
    setFormData({ ...formData, games: [...formData.games, newGame] });
  };

  const removeGame = (index) => {
    const minGames = getMinGames(formData.bo);
    if (formData.games.length <= minGames) {
      alert(
        `Vous ne pouvez pas avoir moins de ${minGames} games pour un ${formData.bo}.`
      );
      return;
    }
    const updatedGames = formData.games.filter((_, i) => i !== index);
    setFormData({ ...formData, games: updatedGames });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data LoL:", formData);
  };

  return (
    <div>
      <h2>Encoder un Match League of Legends</h2>
      <form onSubmit={handleSubmit}>
        {/* Informations générales */}
        <div>
          <label>Équipe 1 :</label>
          <input
            type="text"
            name="equipe1"
            value={formData.equipe1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Équipe 2 :</label>
          <input
            type="text"
            name="equipe2"
            value={formData.equipe2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date :</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Événement :</label>
          <input
            type="text"
            name="event"
            value={formData.event}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Enjeu :</label>
          <input
            type="text"
            name="enjeu"
            value={formData.enjeu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Format (BO) :</label>
          <select name="bo" value={formData.bo} onChange={handleChange}>
            <option value="BO1">BO1</option>
            <option value="BO3">BO3</option>
            <option value="BO5">BO5</option>
            <option value="BO7">BO7</option>
          </select>
        </div>
        <div>
          <label>Score final :</label>
          <input
            type="text"
            name="scoreFinal"
            value={formData.scoreFinal}
            onChange={handleChange}
          />
        </div>

        {/* Gestion des games */}
        <h3>Games</h3>
        {formData.games.map((game, index) => (
          <div key={index}>
            <h4>Game {game.numero}</h4>
            <label>Score Équipe 1 :</label>
            <input
              type="number"
              value={game.scoreEquipe1}
              onChange={(e) =>
                handleGameChange(index, "scoreEquipe1", e.target.value)
              }
            />
            <label>Score Équipe 2 :</label>
            <input
              type="number"
              value={game.scoreEquipe2}
              onChange={(e) =>
                handleGameChange(index, "scoreEquipe2", e.target.value)
              }
            />
            <label>MVP :</label>
            <input
              type="text"
              value={game.mvp}
              onChange={(e) => handleGameChange(index, "mvp", e.target.value)}
            />
            <h5>Draft Équipe 1</h5>
            {game.draft1.map((draft, draftIndex) => (
              <div key={draftIndex}>
                <label>Joueur :</label>
                <input
                  type="text"
                  value={draft.pseudo}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "draft1",
                      draftIndex,
                      "pseudo",
                      e.target.value
                    )
                  }
                />
                <label>Champion :</label>
                <input
                  type="text"
                  value={draft.champion}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "draft1",
                      draftIndex,
                      "champion",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            <h5>Stats Équipe 1</h5>
            {game.statsTeam1.map((stats, statsIndex) => (
              <div key={statsIndex}>
                <label>Joueur :</label>
                <input
                  type="text"
                  value={stats.joueur}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "statsTeam1",
                      statsIndex,
                      "joueur",
                      e.target.value
                    )
                  }
                />
                <label>Kills :</label>
                <input
                  type="number"
                  value={stats.kills}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "statsTeam1",
                      statsIndex,
                      "kills",
                      e.target.value
                    )
                  }
                />
                <label>Deaths :</label>
                <input
                  type="number"
                  value={stats.deaths}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "statsTeam1",
                      statsIndex,
                      "deaths",
                      e.target.value
                    )
                  }
                />
                <label>Assists :</label>
                <input
                  type="number"
                  value={stats.assists}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "statsTeam1",
                      statsIndex,
                      "assists",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            <button type="button" onClick={() => removeGame(index)}>
              Supprimer cette game
            </button>
          </div>
        ))}
        <button type="button" onClick={addGame}>
          Ajouter une Game
        </button>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default AdminLoL;
