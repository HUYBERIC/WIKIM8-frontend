import React, { useState, useEffect } from "react";

const AdminValorant = () => {
  const [formData, setFormData] = useState({
    equipe1: { nom: "", headCoach: "", assistantCoach: "" },
    equipe2: { nom: "", headCoach: "", assistantCoach: "" },
    date: "",
    event: "",
    enjeu: "",
    bo: "BO1",
    scoreFinal: "",
    games: [],
    mvpGlobal: "",
    topKills: [{ joueur: "", kills: 0 }],
    topAssists: [{ joueur: "", assists: 0 }],
    bestRatio: [{ joueur: "", ratio: 0 }],
  });

  // Fonction pour créer un tableau de drafts avec des objets distincts
  const createDraft = () =>
    Array.from({ length: 5 }, () => {
      return { pseudo: "", agents: "" };
    });

  // Fonction pour créer un tableau de stats avec des objets distincts
  const createStats = () =>
    Array.from({ length: 5 }, () => {
      return { joueur: "", kills: 0, deaths: 0, assists: 0 };
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
    if (formData.games.length < minGames) {
      const newGames = [];
      for (let i = formData.games.length + 1; i <= minGames; i++) {
        newGames.push({
          numero: i,
          scoreEquipe1: 0,
          scoreEquipe2: 0,
          draft1: createDraft(), // Objets indépendants
          draft2: createDraft(), // Objets indépendants
          statsTeam1: createStats(), // Objets indépendants
          statsTeam2: createStats(), // Objets indépendants
          mvp: "",
        });
      }
      setFormData({ ...formData, games: [...formData.games, ...newGames] });
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

  const handleNestedChange = (gameIndex, field, arrayIndex, subField, value) => {
    const updatedGames = [...formData.games];
    updatedGames[gameIndex][field][arrayIndex][subField] = value;
    setFormData({ ...formData, games: updatedGames });
  };

  const addGame = () => {
    const maxGames = getMaxGames(formData.bo);
    if (formData.games.length >= maxGames) {
      alert(`Vous ne pouvez pas ajouter plus de ${maxGames} games pour un ${formData.bo}.`);
      return;
    }
    const newGame = {
      numero: formData.games.length + 1,
      scoreEquipe1: 0,
      scoreEquipe2: 0,
      draft1: createDraft(), // Objets indépendants
      draft2: createDraft(), // Objets indépendants
      statsTeam1: createStats(), // Objets indépendants
      statsTeam2: createStats(), // Objets indépendants
      mvp: "",
    };
    setFormData({ ...formData, games: [...formData.games, newGame] });
  };

  const removeGame = (index) => {
    const minGames = getMinGames(formData.bo);
    if (formData.games.length <= minGames) {
      alert(`Vous ne pouvez pas avoir moins de ${minGames} games pour un ${formData.bo}.`);
      return;
    }
    const updatedGames = formData.games.filter((_, i) => i !== index);
    setFormData({ ...formData, games: updatedGames });
  };

  const handleStatChange = (field, index, subField, value) => {
    const updatedStats = [...formData[field]];
    updatedStats[index][subField] = value;
    setFormData({ ...formData, [field]: updatedStats });
  };

  const addStat = (field) => {
    if (formData[field].length >= 6) {
      alert("Vous ne pouvez pas ajouter plus de 6 joueurs.");
      return;
    }
    const newStat = { joueur: "", kills: 0, assists: 0, ratio: 0 };
    setFormData({ ...formData, [field]: [...formData[field], newStat] });
  };

  const removeStat = (field, index) => {
    if (formData[field].length <= 1) {
      alert("Il doit rester au moins un joueur.");
      return;
    }
    const updatedStats = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedStats });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Valorant:", formData);
  };

  return (
    <div className="admin-container">
      <h1>Encoder un Match Valorant</h1>
      <form onSubmit={handleSubmit}>
        <h2>Équipes</h2>
        <div>
          <h3>Équipe 1</h3>
          <label>Nom :</label>
          <input
            type="text"
            value={formData.equipe1.nom}
            onChange={(e) =>
              setFormData({ ...formData, equipe1: { ...formData.equipe1, nom: e.target.value } })
            }
          />
          <label>Head Coach :</label>
          <input
            type="text"
            value={formData.equipe1.headCoach}
            onChange={(e) =>
              setFormData({
                ...formData,
                equipe1: { ...formData.equipe1, headCoach: e.target.value },
              })
            }
          />
          <label>Assistant Coach :</label>
          <input
            type="text"
            value={formData.equipe1.assistantCoach}
            onChange={(e) =>
              setFormData({
                ...formData,
                equipe1: { ...formData.equipe1, assistantCoach: e.target.value },
              })
            }
          />
        </div>

        <div>
          <h3>Équipe 2</h3>
          <label>Nom :</label>
          <input
            type="text"
            value={formData.equipe2.nom}
            onChange={(e) =>
              setFormData({ ...formData, equipe2: { ...formData.equipe2, nom: e.target.value } })
            }
          />
          <label>Head Coach :</label>
          <input
            type="text"
            value={formData.equipe2.headCoach}
            onChange={(e) =>
              setFormData({
                ...formData,
                equipe2: { ...formData.equipe2, headCoach: e.target.value },
              })
            }
          />
          <label>Assistant Coach :</label>
          <input
            type="text"
            value={formData.equipe2.assistantCoach}
            onChange={(e) =>
              setFormData({
                ...formData,
                equipe2: { ...formData.equipe2, assistantCoach: e.target.value },
              })
            }
          />
        </div>

        <h2>Informations Générales</h2>
        <label>Date :</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <label>Event :</label>
        <input
          type="text"
          value={formData.event}
          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
        />
        <label>Enjeu :</label>
        <input
          type="text"
          value={formData.enjeu}
          onChange={(e) => setFormData({ ...formData, enjeu: e.target.value })}
        />
        <label>Format (BO) :</label>
        <select
          value={formData.bo}
          onChange={(e) => setFormData({ ...formData, bo: e.target.value })}
        >
          <option value="BO1">BO1</option>
          <option value="BO2">BO2</option>
          <option value="BO3">BO3</option>
          <option value="BO5">BO5</option>
          <option value="BO7">BO7</option>
        </select>

        <h2>Games</h2>
        {formData.games.map((game, index) => (
          <div key={index}>
            <h3>Game {index + 1}</h3>
            <label>Score Équipe 1 :</label>
            <input
              type="number"
              value={game.scoreEquipe1}
              onChange={(e) => handleGameChange(index, "scoreEquipe1", e.target.value)}
            />
            <label>Score Équipe 2 :</label>
            <input
              type="number"
              value={game.scoreEquipe2}
              onChange={(e) => handleGameChange(index, "scoreEquipe2", e.target.value)}
            />

            <h4>Draft Équipe 1</h4>
            {game.draft1.map((player, i) => (
              <div key={i}>
                <label>Joueur :</label>
                <input
                  type="text"
                  value={player.pseudo}
                  onChange={(e) =>
                    handleNestedChange(index, "draft1", i, "pseudo", e.target.value)
                  }
                />
                <label>Agent :</label>
                <input
                  type="text"
                  value={player.agents}
                  onChange={(e) =>
                    handleNestedChange(index, "draft1", i, "agents", e.target.value)
                  }
                />
              </div>
            ))}

            <h4>Stats Équipe 1</h4>
            {game.statsTeam1.map((player, i) => (
              <div key={i}>
                <label>Joueur :</label>
                <input
                  type="text"
                  value={player.joueur}
                  onChange={(e) =>
                    handleNestedChange(index, "statsTeam1", i, "joueur", e.target.value)
                  }
                />
                <label>Kills :</label>
                <input
                  type="number"
                  value={player.kills}
                  onChange={(e) =>
                    handleNestedChange(index, "statsTeam1", i, "kills", e.target.value)
                  }
                />
                <label>Deaths :</label>
                <input
                  type="number"
                  value={player.deaths}
                  onChange={(e) =>
                    handleNestedChange(index, "statsTeam1", i, "deaths", e.target.value)
                  }
                />
                <label>Assists :</label>
                <input
                  type="number"
                  value={player.assists}
                  onChange={(e) =>
                    handleNestedChange(index, "statsTeam1", i, "assists", e.target.value)
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

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default AdminValorant;