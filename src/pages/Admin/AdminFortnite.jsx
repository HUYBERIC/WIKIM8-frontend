import React, { useState } from 'react';

const AdminFortnite = () => {
  const [formData, setFormData] = useState({
    date: '',
    nomCompetition: '',
    week: '',
    typeCompetition: 'Solo', // Type de compétition pour tout l'événement
    teams: [
      {
        roosterId: 1,
        rooster: Array.from({ length: 1 }, () => ({ pseudo: '', structure: '' })),
        games: [{ classement: '', kills: '' }],
        stats: { killsTotal: '', topFinal: '' },
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCompetitionTypeChange = (value) => {
    const teamSize = { Solo: 1, Duo: 2, Trio: 3 };

    const updatedTeams = formData.teams.map((team) => ({
      ...team,
      rooster: Array.from({ length: teamSize[value] }, () => ({ pseudo: '', structure: '' })),
    }));

    setFormData({
      ...formData,
      typeCompetition: value,
      teams: updatedTeams,
    });
  };

  const handleTeamChange = (teamIndex, field, value) => {
    const updatedTeams = [...formData.teams];
    updatedTeams[teamIndex][field] = value;
    setFormData({ ...formData, teams: updatedTeams });
  };

  const handleRoosterChange = (teamIndex, roosterIndex, field, value) => {
    const updatedTeams = [...formData.teams];
    updatedTeams[teamIndex].rooster[roosterIndex][field] = value;
    setFormData({ ...formData, teams: updatedTeams });
  };

  const handleGameChange = (teamIndex, gameIndex, field, value) => {
    const updatedTeams = [...formData.teams];
    updatedTeams[teamIndex].games[gameIndex][field] = value;
    setFormData({ ...formData, teams: updatedTeams });
  };

  const handleStatsChange = (teamIndex, field, value) => {
    const updatedTeams = [...formData.teams];
    updatedTeams[teamIndex].stats[field] = value;
    setFormData({ ...formData, teams: updatedTeams });
  };

  const handleGameCountChange = (teamIndex, count) => {
    const updatedTeams = [...formData.teams];
    updatedTeams[teamIndex].games = Array.from({ length: count }, () => ({
      classement: '',
      kills: '',
    }));
    setFormData({ ...formData, teams: updatedTeams });
  };

  const addTeam = () => {
    const teamSize = { Solo: 1, Duo: 2, Trio: 3 };

    setFormData({
      ...formData,
      teams: [
        ...formData.teams,
        {
          roosterId: formData.teams.length + 1,
          rooster: Array.from({ length: teamSize[formData.typeCompetition] }, () => ({
            pseudo: '',
            structure: '',
          })),
          games: [{ classement: '', kills: '' }],
          stats: { killsTotal: '', topFinal: '' },
        },
      ],
    });
  };

  const removeTeam = (teamIndex) => {
    const updatedTeams = formData.teams.filter((_, index) => index !== teamIndex);
    setFormData({ ...formData, teams: updatedTeams });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <h2>Admin Fortnite - Encoder une Compétition</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nom de la Compétition:</label>
          <input
            type="text"
            name="nomCompetition"
            value={formData.nomCompetition}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Semaine:</label>
          <input
            type="text"
            name="week"
            value={formData.week}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type de Compétition:</label>
          <select
            value={formData.typeCompetition}
            onChange={(e) => handleCompetitionTypeChange(e.target.value)}
          >
            <option value="Solo">Solo</option>
            <option value="Duo">Duo</option>
            <option value="Trio">Trio</option>
          </select>
        </div>

        {formData.teams.map((team, teamIndex) => (
          <div key={teamIndex}>
            <h3>Équipe {team.roosterId}</h3>
            <h4>Rooster</h4>
            {team.rooster.map((player, roosterIndex) => (
              <div key={roosterIndex}>
                <label>Pseudo:</label>
                <input
                  type="text"
                  value={player.pseudo}
                  onChange={(e) =>
                    handleRoosterChange(
                      teamIndex,
                      roosterIndex,
                      'pseudo',
                      e.target.value
                    )
                  }
                />
                <label>Structure:</label>
                <input
                  type="text"
                  value={player.structure}
                  onChange={(e) =>
                    handleRoosterChange(
                      teamIndex,
                      roosterIndex,
                      'structure',
                      e.target.value
                    )
                  }
                />
              </div>
            ))}

            <h4>Nombre de Games</h4>
            <input
              type="number"
              min="1"
              max="15"
              value={team.games.length}
              onChange={(e) =>
                handleGameCountChange(teamIndex, Number(e.target.value))
              }
            />

            <h4>Games</h4>
            {team.games.map((game, gameIndex) => (
              <div key={gameIndex}>
                <label>Game {gameIndex + 1} Classement:</label>
                <input
                  type="number"
                  value={game.classement}
                  onChange={(e) =>
                    handleGameChange(
                      teamIndex,
                      gameIndex,
                      'classement',
                      e.target.value
                    )
                  }
                />
                <label>Kills:</label>
                <input
                  type="number"
                  value={game.kills}
                  onChange={(e) =>
                    handleGameChange(teamIndex, gameIndex, 'kills', e.target.value)
                  }
                />
              </div>
            ))}

            <h4>Statistiques</h4>
            <div>
              <label>Kills Totaux:</label>
              <input
                type="number"
                value={team.stats.killsTotal}
                onChange={(e) =>
                  handleStatsChange(teamIndex, 'killsTotal', e.target.value)
                }
              />
            </div>
            <div>
              <label>Top Final:</label>
              <input
                type="number"
                value={team.stats.topFinal}
                onChange={(e) =>
                  handleStatsChange(teamIndex, 'topFinal', e.target.value)
                }
              />
            </div>
            <button type="button" onClick={() => removeTeam(teamIndex)}>
              Supprimer cette Équipe
            </button>
          </div>
        ))}

        <button type="button" onClick={addTeam}>
          Ajouter une Équipe
        </button>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default AdminFortnite;
