import React, { useState } from "react";

const AdminTFT = () => {
  const [formData, setFormData] = useState({
    date: "",
    nomTournoi: "",
    format: "Inconnu",
    nombreTotalJoueurs: 0,
    nombreJoueursM8: 2, // Par défaut, 2 joueurs M8
    nombreSegments: 1, // Par défaut, 1 segment
    joueursM8: ["", ""], // Par défaut, 2 joueurs
    segments: [],
    topFinalJoueursM8: [],
  });

  const createPlayerTemplate = () => ({ joueur: "", position: 0 });

  const createGameTemplate = (gameNumber) => ({
    numero: gameNumber,
    classement: formData.joueursM8.map((joueur) => ({ joueur, position: 0 })),
  });

  const createSegmentTemplate = (segmentNumber, nombreGames) => ({
    type: "",
    numero: segmentNumber,
    date: "",
    nombreGames,
    games: Array(nombreGames)
      .fill(null)
      .map((_, gameIndex) => createGameTemplate(gameIndex + 1)),
  });

  const initializeSegments = (nombreSegments, nombreGames) => {
    const newSegments = Array(nombreSegments)
      .fill(null)
      .map((_, segmentIndex) =>
        createSegmentTemplate(segmentIndex + 1, nombreGames)
      );
    setFormData((prev) => ({
      ...prev,
      segments: newSegments,
    }));
  };

  const initializePlayers = (nombreJoueursM8) => {
    const players = Array(nombreJoueursM8).fill("");
    setFormData((prev) => ({
      ...prev,
      joueursM8: players,
      topFinalJoueursM8: players.map((joueur) => ({ joueur, position: 0 })),
      segments: prev.segments.map((segment) => ({
        ...segment,
        games: segment.games.map((game, index) => ({
          ...game,
          classement: players.map((joueur) => ({ joueur, position: 0 })),
        })),
      })),
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    if (name === "nombreSegments") {
      const nombreSegments = parseInt(value, 10);
      initializeSegments(nombreSegments, 1); // 1 game par défaut
    }

    if (name === "nombreJoueursM8") {
      const nombreJoueursM8 = parseInt(value, 10);
      initializePlayers(nombreJoueursM8);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSegmentGamesChange = (segmentIndex, value) => {
    const updatedSegments = [...formData.segments];
    const nombreGames = parseInt(value, 10);
    updatedSegments[segmentIndex].nombreGames = nombreGames;
    updatedSegments[segmentIndex].games = Array(nombreGames)
      .fill(null)
      .map((_, gameIndex) => createGameTemplate(gameIndex + 1));
    setFormData((prev) => ({
      ...prev,
      segments: updatedSegments,
    }));
  };

  const handleJoueurM8Change = (playerIndex, value) => {
    const updatedPlayers = [...formData.joueursM8];
    updatedPlayers[playerIndex] = value;

    setFormData((prev) => ({
      ...prev,
      joueursM8: updatedPlayers,
      segments: prev.segments.map((segment) => ({
        ...segment,
        games: segment.games.map((game) => ({
          ...game,
          classement: updatedPlayers.map((joueur, index) => ({
            ...game.classement[index],
            joueur,
          })),
        })),
      })),
      topFinalJoueursM8: updatedPlayers.map((joueur) => ({ joueur, position: 0 })),
    }));
  };

  const handlePositionChange = (segmentIndex, gameIndex, playerIndex, value) => {
    const updatedSegments = [...formData.segments];
    updatedSegments[segmentIndex].games[gameIndex].classement[playerIndex].position = parseInt(value, 10);
    setFormData((prev) => ({
      ...prev,
      segments: updatedSegments,
    }));
  };

  const handleTopFinalChange = (playerIndex, value) => {
    const updatedTopFinal = [...formData.topFinalJoueursM8];
    updatedTopFinal[playerIndex].position = parseInt(value, 10);
    setFormData((prev) => ({
      ...prev,
      topFinalJoueursM8: updatedTopFinal,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div>
      <h2>Encoder un Tournoi TFT</h2>
      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <br />
        <label>Nom du Tournoi :</label>
        <input
          type="text"
          name="nomTournoi"
          value={formData.nomTournoi}
          onChange={(e) => setFormData({ ...formData, nomTournoi: e.target.value })}
        />
        <br />
        <label>Format :</label>
        <input
          type="text"
          name="format"
          value={formData.format}
          onChange={(e) => setFormData({ ...formData, format: e.target.value })}
        />
        <br />
        <label>Nombre Total de Joueurs :</label>
        <input
          type="number"
          name="nombreTotalJoueurs"
          value={formData.nombreTotalJoueurs}
          onChange={(e) => setFormData({ ...formData, nombreTotalJoueurs: parseInt(e.target.value, 10) })}
        />
        <br />
        <label>Nombre de Segments :</label>
        <select name="nombreSegments" value={formData.nombreSegments} onChange={handleSelectChange}>
          {[...Array(20)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <br />
        <label>Nombre de Joueurs M8 :</label>
        <select name="nombreJoueursM8" value={formData.nombreJoueursM8} onChange={handleSelectChange}>
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <br />
        <h3>Joueurs M8 :</h3>
        {formData.joueursM8.map((joueur, playerIndex) => (
          <div key={playerIndex}>
            <label>Joueur {playerIndex + 1} :</label>
            <input
              type="text"
              value={joueur}
              onChange={(e) => handleJoueurM8Change(playerIndex, e.target.value)}
            />
          </div>
        ))}
        {formData.segments.map((segment, segmentIndex) => (
          <div key={segmentIndex}>
            <h3>Segment {segment.numero}</h3>
            <label>Type :</label>
            <input
              type="text"
              value={segment.type}
              onChange={(e) => {
                const updatedSegments = [...formData.segments];
                updatedSegments[segmentIndex].type = e.target.value;
                setFormData({ ...formData, segments: updatedSegments });
              }}
            />
            <br />
            <label>Date :</label>
            <input
              type="date"
              value={segment.date}
              onChange={(e) => {
                const updatedSegments = [...formData.segments];
                updatedSegments[segmentIndex].date = e.target.value;
                setFormData({ ...formData, segments: updatedSegments });
              }}
            />
            <br />
            <label>Nombre de Games :</label>
            <input
              type="number"
              value={segment.nombreGames}
              onChange={(e) => handleSegmentGamesChange(segmentIndex, e.target.value)}
            />
            <br />
            {segment.games.map((game, gameIndex) => (
              <div key={gameIndex}>
                <h4>Game {game.numero}</h4>
                {game.classement.map((classement, playerIndex) => (
                  <div key={playerIndex}>
                    <label>Joueur :</label>
                    <input type="text" value={classement.joueur} disabled />
                    <label>Position :</label>
                    <select
                      value={classement.position}
                      onChange={(e) =>
                        handlePositionChange(
                          segmentIndex,
                          gameIndex,
                          playerIndex,
                          e.target.value
                        )
                      }
                    >
                      {[...Array(8)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <h3>Top Final des Joueurs M8 :</h3>
        {formData.topFinalJoueursM8.map((topFinal, index) => (
          <div key={index}>
            <label>Joueur {index + 1} :</label>
            <input type="text" value={topFinal.joueur} disabled />
            <label>Top Final :</label>
            <input
              type="number"
              value={topFinal.position}
              onChange={(e) => handleTopFinalChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default AdminTFT;
