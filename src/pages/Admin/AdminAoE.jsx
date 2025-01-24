import React, { useState, useEffect } from "react";

const AdminAoE = () => {
  const [formData, setFormData] = useState({
    date: "",
    event: "",
    typeBO: "BO5", // BO5 par défaut
    joueur1: {
      nom: "",
      equipe: "",
    },
    joueur2: {
      nom: "",
      equipe: "",
    },
    games: [],
    resultatFinal: {
      gagnant: "",
      scoreFinal: "",
    },
  });

  const BO_CONFIG = {
    BO3: { min: 2, max: 3 },
    BO5: { min: 3, max: 5 },
    BO7: { min: 4, max: 7 },
    BO9: { min: 5, max: 9 },
  };

  const createGameTemplate = (numero) => ({
    numero,
    map: "",
    joueur1Civilisation: "",
    joueur2Civilisation: "",
    gagnant: "", // Champ à remplir manuellement
  });

  useEffect(() => {
    const { min } = BO_CONFIG[formData.typeBO];
    const initialGames = [];
    for (let i = 0; i < min; i++) {
      initialGames.push(createGameTemplate(i + 1));
    }
    setFormData((prev) => ({ ...prev, games: initialGames }));
  }, [formData.typeBO]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGameChange = (index, field, value) => {
    const updatedGames = [...formData.games];
    updatedGames[index][field] = value;
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
    console.log("Form Data AoE:", formData);
  };

  return (
    <div>
      <h2>Encoder un Match Age of Empires</h2>
      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <br />

        <label>Event :</label>
        <input
          type="text"
          name="event"
          value={formData.event}
          onChange={handleChange}
        />
        <br />

        <label>Type de BO :</label>
        <select
          name="typeBO"
          value={formData.typeBO}
          onChange={handleChange}
        >
          <option value="BO3">BO3</option>
          <option value="BO5">BO5</option>
          <option value="BO7">BO7</option>
          <option value="BO9">BO9</option>
        </select>
        <br />

        <h3>Joueur 1</h3>
        <label>Nom :</label>
        <input
          type="text"
          value={formData.joueur1.nom}
          onChange={(e) =>
            setFormData({
              ...formData,
              joueur1: { ...formData.joueur1, nom: e.target.value },
            })
          }
        />
        <br />
        <label>Équipe :</label>
        <input
          type="text"
          value={formData.joueur1.equipe}
          onChange={(e) =>
            setFormData({
              ...formData,
              joueur1: { ...formData.joueur1, equipe: e.target.value },
            })
          }
        />
        <br />

        <h3>Joueur 2</h3>
        <label>Nom :</label>
        <input
          type="text"
          value={formData.joueur2.nom}
          onChange={(e) =>
            setFormData({
              ...formData,
              joueur2: { ...formData.joueur2, nom: e.target.value },
            })
          }
        />
        <br />
        <label>Équipe :</label>
        <input
          type="text"
          value={formData.joueur2.equipe}
          onChange={(e) =>
            setFormData({
              ...formData,
              joueur2: { ...formData.joueur2, equipe: e.target.value },
            })
          }
        />
        <br />

        <h3>Games</h3>
        {formData.games.map((game, index) => (
          <div key={index}>
            <h4>Game {game.numero}</h4>
            <label>Map :</label>
            <input
              type="text"
              value={game.map}
              onChange={(e) => handleGameChange(index, "map", e.target.value)}
            />
            <br />
            <label>Civilisation Joueur 1 :</label>
            <input
              type="text"
              value={game.joueur1Civilisation}
              onChange={(e) =>
                handleGameChange(index, "joueur1Civilisation", e.target.value)
              }
            />
            <br />
            <label>Civilisation Joueur 2 :</label>
            <input
              type="text"
              value={game.joueur2Civilisation}
              onChange={(e) =>
                handleGameChange(index, "joueur2Civilisation", e.target.value)
              }
            />
            <br />
            <label>Gagnant de la Map :</label>
            <input
              type="text"
              value={game.gagnant}
              onChange={(e) => handleGameChange(index, "gagnant", e.target.value)}
            />
            <br />
            <button type="button" onClick={() => removeGame(index)}>
              Supprimer cette Game
            </button>
          </div>
        ))}
        <button type="button" onClick={addGame}>
          Ajouter une Game
        </button>
        <br />

        <h3>Résultat Final</h3>
        <label>Gagnant :</label>
        <input
          type="text"
          name="resultatFinal.gagnant"
          value={formData.resultatFinal.gagnant}
          onChange={(e) =>
            setFormData({
              ...formData,
              resultatFinal: {
                ...formData.resultatFinal,
                gagnant: e.target.value,
              },
            })
          }
        />
        <br />
        <label>Score Final :</label>
        <input
          type="text"
          name="resultatFinal.scoreFinal"
          value={formData.resultatFinal.scoreFinal}
          onChange={(e) =>
            setFormData({
              ...formData,
              resultatFinal: {
                ...formData.resultatFinal,
                scoreFinal: e.target.value,
              },
            })
          }
        />
        <br />

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default AdminAoE;
