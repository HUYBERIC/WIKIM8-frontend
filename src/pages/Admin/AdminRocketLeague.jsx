import React, { useState, useEffect } from "react";

const AdminRocketLeague = () => {
  const [formData, setFormData] = useState({
    equipe1: {
      nom: "",
      joueurs: Array.from({ length: 3 }, () => ({ pseudo: "" })),
      coach: { pseudo: "" },
    },
    equipe2: {
      nom: "",
      joueurs: Array.from({ length: 3 }, () => ({ pseudo: "" })),
      coach: { pseudo: "" },
    },
    event: "",
    enjeu: "",
    bo: "BO3",
    scoreBO: "",
    matchs: [],
    stats: {
      meilleurButeur: [{ joueur: "", buts: 0 }],
      meilleurPasseur: [{ joueur: "", passes: 0 }],
      meilleurDefenseur: [{ joueur: "", saves: 0 }],
    },
  });

  const getMinGames = (bo) => {
    switch (bo) {
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
    const currentGames = formData.matchs.length;

    if (currentGames < minGames) {
      const newMatchs = [];
      for (let i = currentGames; i < minGames; i++) {
        newMatchs.push({ scoreEquipe1: 0, scoreEquipe2: 0 });
      }
      setFormData({ ...formData, matchs: [...formData.matchs, ...newMatchs] });
    } else if (currentGames > minGames) {
      setFormData({
        ...formData,
        matchs: formData.matchs.slice(0, minGames),
      });
    }
  }, [formData.bo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (team, field, index, subField, value) => {
    const updatedTeam = { ...formData[team] };
    updatedTeam[field][index][subField] = value;
    setFormData({ ...formData, [team]: updatedTeam });
  };

  const handleArrayChange = (field, index, subField, value) => {
    const updatedArray = [...formData.stats[field]];
    updatedArray[index][subField] = value;
    setFormData({
      ...formData,
      stats: { ...formData.stats, [field]: updatedArray },
    });
  };

  const addStat = (field) => {
    if (formData.stats[field].length >= 6) {
      alert("Vous ne pouvez pas ajouter plus de 6 joueurs.");
      return;
    }
    const newStat = { joueur: "", buts: 0, passes: 0, saves: 0 };
    setFormData({
      ...formData,
      stats: {
        ...formData.stats,
        [field]: [...formData.stats[field], newStat],
      },
    });
  };

  const removeStat = (field, index) => {
    if (formData.stats[field].length <= 1) {
      alert("Il doit rester au moins 1 joueur.");
      return;
    }
    const updatedStats = formData.stats[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      stats: { ...formData.stats, [field]: updatedStats },
    });
  };

  const handleMatchChange = (index, field, value) => {
    const updatedMatchs = [...formData.matchs];
    updatedMatchs[index][field] = value;
    setFormData({ ...formData, matchs: updatedMatchs });
  };

  const addMatch = () => {
    const maxGames = getMaxGames(formData.bo);
    if (formData.matchs.length >= maxGames) {
      alert(
        `Vous ne pouvez pas ajouter plus de ${maxGames} matchs pour un ${formData.bo}.`
      );
      return;
    }
    setFormData({
      ...formData,
      matchs: [...formData.matchs, { scoreEquipe1: 0, scoreEquipe2: 0 }],
    });
  };

  const removeMatch = (index) => {
    const minGames = getMinGames(formData.bo);
    if (formData.matchs.length <= minGames) {
      alert(
        `Vous ne pouvez pas avoir moins de ${minGames} matchs pour un ${formData.bo}.`
      );
      return;
    }
    const updatedMatchs = formData.matchs.filter((_, i) => i !== index);
    setFormData({ ...formData, matchs: updatedMatchs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Rocket League:", formData);
  };

  return (
    <div>
      <h2>Encoder un Match Rocket League</h2>
      <form onSubmit={handleSubmit}>
        {/* Informations générales des équipes */}
        <h3>Équipe 1</h3>
        <label>Nom :</label>
        <input
          type="text"
          value={formData.equipe1.nom}
          onChange={(e) =>
            setFormData({
              ...formData,
              equipe1: { ...formData.equipe1, nom: e.target.value },
            })
          }
        />
        <h4>Joueurs</h4>
        {formData.equipe1.joueurs.map((joueur, index) => (
          <div key={index}>
            <label>Joueur {index + 1} :</label>
            <input
              type="text"
              value={joueur.pseudo}
              onChange={(e) =>
                handleNestedChange(
                  "equipe1",
                  "joueurs",
                  index,
                  "pseudo",
                  e.target.value
                )
              }
            />
          </div>
        ))}
        <h4>Coach</h4>
        <label>Coach :</label>
        <input
          type="text"
          value={formData.equipe1.coach.pseudo}
          onChange={(e) =>
            setFormData({
              ...formData,
              equipe1: {
                ...formData.equipe1,
                coach: { pseudo: e.target.value },
              },
            })
          }
        />

        <h3>Équipe 2</h3>
        <label>Nom :</label>
        <input
          type="text"
          value={formData.equipe2.nom}
          onChange={(e) =>
            setFormData({
              ...formData,
              equipe2: { ...formData.equipe2, nom: e.target.value },
            })
          }
        />
        <h4>Joueurs</h4>
        {formData.equipe2.joueurs.map((joueur, index) => (
          <div key={index}>
            <label>Joueur {index + 1} :</label>
            <input
              type="text"
              value={joueur.pseudo}
              onChange={(e) =>
                handleNestedChange(
                  "equipe2",
                  "joueurs",
                  index,
                  "pseudo",
                  e.target.value
                )
              }
            />
          </div>
        ))}
        <h4>Coach</h4>
        <label>Coach :</label>
        <input
          type="text"
          value={formData.equipe2.coach.pseudo}
          onChange={(e) =>
            setFormData({
              ...formData,
              equipe2: {
                ...formData.equipe2,
                coach: { pseudo: e.target.value },
              },
            })
          }
        />

        {/* Gestion des matchs */}
        <h3>Matchs</h3>
        <div>
          <label>Format (BO) :</label>
          <select
            name="bo"
            value={formData.bo}
            onChange={(e) =>
              setFormData({ ...formData, bo: e.target.value })
            }
          >
            <option value="BO3">BO3</option>
            <option value="BO5">BO5</option>
            <option value="BO7">BO7</option>
          </select>
        </div>
        {formData.matchs.map((match, index) => (
          <div key={index}>
            <h4>Match {index + 1}</h4>
            <label>{formData.equipe1.nom || "Équipe 1"} :</label>
            <input
              type="number"
              value={match.scoreEquipe1}
              onChange={(e) =>
                handleMatchChange(index, "scoreEquipe1", e.target.value)
              }
            />
            <label>{formData.equipe2.nom || "Équipe 2"} :</label>
            <input
              type="number"
              value={match.scoreEquipe2}
              onChange={(e) =>
                handleMatchChange(index, "scoreEquipe2", e.target.value)
              }
            />
            <button type="button" onClick={() => removeMatch(index)}>
              Supprimer ce match
            </button>
          </div>
        ))}
        <button type="button" onClick={addMatch}>
          Ajouter un Match
        </button>

        {/* Statistiques */}
        <h3>Statistiques</h3>
        {/* Ajouter et gérer les statistiques comme demandé */}
        <h4>Meilleur(s) Buteur(s)</h4>
        {formData.stats.meilleurButeur.map((buteur, index) => (
          <div key={index}>
            <label>Joueur :</label>
            <input
              type="text"
              value={buteur.joueur}
              onChange={(e) =>
                handleArrayChange(
                  "meilleurButeur",
                  index,
                  "joueur",
                  e.target.value
                )
              }
            />
            <label>Buts :</label>
            <input
              type="number"
              value={buteur.buts}
              onChange={(e) =>
                handleArrayChange(
                  "meilleurButeur",
                  index,
                  "buts",
                  e.target.value
                )
              }
            />
            <button
              type="button"
              onClick={() => removeStat("meilleurButeur", index)}
            >
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addStat("meilleurButeur")}>
          Ajouter un Buteur
        </button>

        <h4>Meilleur(s) Passeur(s)</h4>
        {formData.stats.meilleurPasseur.map((passeur, index) => (
          <div key={index}>
            <label>Joueur :</label>
            <input
              type="text"
              value={passeur.joueur}
              onChange={(e) =>
                handleArrayChange(
                  "meilleurPasseur",
                  index,
                  "joueur",
                  e.target.value
                )
              }
            />
            <label>Passes :</label>
            <input
              type="number"
              value={passeur.passes}
              onChange={(e) =>
                handleArrayChange(
                  "meilleurPasseur",
                  index,
                  "passes",
                  e.target.value
                )
              }
            />
            <button
              type="button"
              onClick={() => removeStat("meilleurPasseur", index)}
            >
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addStat("meilleurPasseur")}>
          Ajouter un Passeur
        </button>

        <h4>Meilleur(s) Défenseur(s)</h4>
        {formData.stats.meilleurDefenseur.map((defenseur, index) => (
          <div key={index}>
            <label>Joueur :</label>
            <input
              type="text"
              value={defenseur.joueur}
              onChange={(e) =>
                handleArrayChange(
                  "meilleurDefenseur",
                  index,
                  "joueur",
                  e.target.value
                )
              }
            />
            <label>Arrêts :</label>
            <input
              type="number"
              value={defenseur.saves}
              onChange={(e) =>
                handleArrayChange(
                  "meilleurDefenseur",
                  index,
                  "saves",
                  e.target.value
                )
              }
            />
            <button
              type="button"
              onClick={() => removeStat("meilleurDefenseur", index)}
            >
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addStat("meilleurDefenseur")}>
          Ajouter un Défenseur
        </button>

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default AdminRocketLeague;
