import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../../config";

const AdminRocketLeague = () => {
  const [formData, setFormData] = useState({
    date: "", // Nouvelle clé pour la date
    event: "",
    enjeu: "",
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
    bo: "BO3",
    scoreBO: "", // Score final
    matchs: [],
    stats: {
      meilleurButeur: [{ joueur: "", buts: 0 }],
      meilleurPasseur: [{ joueur: "", passes: 0 }],
      meilleurDefenseur: [{ joueur: "", saves: 0 }],
      mvp: [""], // MVP global
    },
  });

  const [errors, setErrors] = useState({});

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
        newMatchs.push({ scoreGentleMates: 0, scoreAdversaire: 0 });
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
      matchs: [...formData.matchs, { scoreGentleMates: 0, scoreAdversaire: 0 }],
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialisation des erreurs
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date requise.";
    if (!formData.event) newErrors.event = "Nom de l'événement requis.";
    if (!formData.enjeu) newErrors.enjeu = "Enjeu requis.";
    if (!formData.equipe1.nom)
      newErrors.equipe1Nom = "Nom de l'équipe 1 requis.";
    if (!formData.equipe2.nom)
      newErrors.equipe2Nom = "Nom de l'équipe 2 requis.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/api/rocketleague`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Match ajouté avec succès !");
      setFormData({
        date: "",
        event: "",
        enjeu: "",
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
        bo: "BO3",
        scoreBO: "",
        matchs: [],
        stats: {
          meilleurButeur: [{ joueur: "", buts: 0 }],
          meilleurPasseur: [{ joueur: "", passes: 0 }],
          meilleurDefenseur: [{ joueur: "", saves: 0 }],
          mvp: [""],
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du match:", error);
      
      // Affiche les détails de l'erreur dans la console
      if (error.response) {
        console.error("Erreur réponse backend :", error.response.data);
        alert(`Erreur du backend : ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Erreur de requête :", error.request);
        alert("Erreur de requête : Aucune réponse reçue du serveur.");
      } else {
        console.error("Erreur inconnue :", error.message);
        alert(`Erreur inconnue : ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Encoder un Match Rocket League</h2>
      <form onSubmit={handleSubmit}>
        <h3>Contexte</h3>
        <label>Date :</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

        <br />
        <label>Nom de l'Événement :</label>
        <input
          type="text"
          name="event"
          value={formData.event}
          onChange={handleChange}
        />
        {errors.event && <p style={{ color: "red" }}>{errors.event}</p>}

        <br />
        <label>Enjeu :</label>
        <input
          type="text"
          name="enjeu"
          value={formData.enjeu}
          onChange={handleChange}
        />
        {errors.enjeu && <p style={{ color: "red" }}>{errors.enjeu}</p>}

        <h3>Équipe 1</h3>
        <label>Nom :</label>
        <input
          type="text"
          name="equipe1Nom"
          value={formData.equipe1.nom}
          onChange={(e) =>
            setFormData({
              ...formData,
              equipe1: { ...formData.equipe1, nom: e.target.value },
            })
          }
        />
        {errors.equipe1Nom && (
          <p style={{ color: "red" }}>{errors.equipe1Nom}</p>
        )}
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
          name="equipe2Nom"
          value={formData.equipe2.nom}
          onChange={(e) =>
            setFormData({
              ...formData,
              equipe2: { ...formData.equipe2, nom: e.target.value },
            })
          }
        />
        {errors.equipe2Nom && (
          <p style={{ color: "red" }}>{errors.equipe2Nom}</p>
        )}
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

        <h3>Matchs</h3>
        <label>Score Final (BO) :</label>
        <input
          type="text"
          name="scoreBO"
          value={formData.scoreBO}
          onChange={handleChange}
        />
        <br />
        <label>Format (BO) :</label>
        <select
          name="bo"
          value={formData.bo}
          onChange={(e) => setFormData({ ...formData, bo: e.target.value })}
        >
          <option value="BO3">BO3</option>
          <option value="BO5">BO5</option>
          <option value="BO7">BO7</option>
        </select>

        {formData.matchs.map((match, index) => (
          <div key={index}>
            <h4>Match {index + 1}</h4>
            <label>{formData.equipe1.nom || "Équipe 1"} :</label>
            <input
              type="number"
              value={match.scoreGentleMates}
              onChange={(e) =>
                handleMatchChange(index, "scoreGentleMates", e.target.value)
              }
            />
            <label>{formData.equipe2.nom || "Équipe 2"} :</label>
            <input
              type="number"
              value={match.scoreAdversaire}
              onChange={(e) =>
                handleMatchChange(index, "scoreAdversaire", e.target.value)
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

        <h3>Statistiques</h3>

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

        <h4>MVP</h4>
        <input
          type="text"
          name="mvp"
          value={formData.stats.mvp[0]}
          onChange={(e) =>
            setFormData({
              ...formData,
              stats: { ...formData.stats, mvp: [e.target.value] },
            })
          }
        />

        <br />
        <button type="submit" onClick={handleSubmit}>
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default AdminRocketLeague;
