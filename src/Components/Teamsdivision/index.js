import React from "react";
import { getValueFromLocalStorage } from "../../utils/helper";
export default function Teamdivision({
  scoreHandler,
  team,
  resetTeamValue,
  disableTeam,
}) {
  const isTeamA = team === "A";
  const teamScore = getValueFromLocalStorage(
    isTeamA ? "TEAMASCORE" : "TEAMBSCORE"
  );
  const teamName = getValueFromLocalStorage(isTeamA ? "TEAMA" : "TEAMB");
  const teamWinMatches = getValueFromLocalStorage(
    isTeamA ? "TEAMAWINMATCHES" : "TEAMBWINMATCHES"
  );
  const matchPlayed = getValueFromLocalStorage(
    isTeamA ? "MATCHPLAYED" : "MATCHPLAYED"
  );

  return (
    <div className="teamDivision">
      <h1>{teamName}</h1>
      <div className="teamScoreAndMatchWin">
        <div className="teamMatchWin">
          <h1 className="teamMatchWinCount"> {teamWinMatches}</h1>
          <p>Matches Win</p>
        </div>
        <div className="teamScoreDivision">
          <h1 className="currentScoreOfTeam">{teamScore}</h1>
        </div>
        <div className="teamMatchPlayed">
          <h1 className="teamMatchPlayedCount">{matchPlayed}</h1>
          <p>Matches Played</p>
        </div>
      </div>

      <div className="pointButtons">
        <button
          onClick={() => scoreHandler("plusone", team)}
          disabled={disableTeam}
          className={`${disableTeam && "disabled"}`}
        >
          +1
        </button>
        <button
          onClick={() => scoreHandler("foul", team)}
          disabled={disableTeam}
          className={`${disableTeam && "disabled"}`}
        >
          Foul
        </button>
        <button
          onClick={() => scoreHandler("wrongserve", team)}
          disabled={disableTeam}
          className={`${disableTeam && "disabled"}`}
        >
          Wrong Serve
        </button>
        <button
          onClick={() => resetTeamValue(team)}
          disabled={disableTeam}
          className={`${disableTeam && "disabled"}`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
