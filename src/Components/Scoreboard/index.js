import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import {
  resetTeamAValueFromUtils,
  setValueInLocalStorage,
  getValueFromLocalStorage,
  removeValueInLocalStorage,
} from "../../utils/helper";
import Teamdivision from "../Teamsdivision";

export default function Scoreboard() {
  const [teamAScore, setTeamAScore] = useState(0); //team A Score
  const [teamBScore, setTeamBScore] = useState(0); //team B Score
  const [teamAWinMatches, setTeamAWinMatches] = useState(0); //TEAMA win matches
  const [teamBWinMatches, setTeamBWinMatches] = useState(0); //TEAMB win matches
  const [matchPlayed, setMatchPlayed] = useState(0); //No. of matches played
  const [matchLeft, setMatchLeft] = useState(5); //No. of matches left
  const [disableTeamA, setDisableTeamA] = useState(false); //Disable buttons
  const [disableTeamB, setDisableTeamB] = useState(true);
  const [disablePlayNextMatch, setDisablePlayNextMatch] = useState(true);
  const [teamATurn, setTeamATurn] = useState(0);
  const [teamBTurn, setTeamBTurn] = useState(0);

  const navigate = useNavigate();
  const resetTeamValue = (team) => {
    resetTeamAValueFromUtils(team);
  };

  const playNextMatch = () => {
    if (
      getValueFromLocalStorage("TEAMASCORE") >
      getValueFromLocalStorage("TEAMBSCORE")
    ) {
      setDisableTeamA(false);
      setDisableTeamB(true);
    }
    if (
      getValueFromLocalStorage("TEAMASCORE") <
      getValueFromLocalStorage("TEAMBSCORE")
    ) {
      setDisableTeamB(false);
      setDisableTeamA(true);
    }
    setTeamATurn(0);
    setTeamBTurn(0);
    removeValueInLocalStorage("TEAMASCORE");
    removeValueInLocalStorage("TEAMBSCORE");
    setValueInLocalStorage("TEAMASCORE", 0);
    setValueInLocalStorage("TEAMBSCORE", 0);
    setTeamAScore(0);
    setTeamBScore(0);
    setDisablePlayNextMatch(true);
  };
  const seeMatchDetails = () => {
    navigate(`/matchdetails/`);
  };

  const scoreHandler = (action, team) => {
    if (team === "A") {
      setTeamATurn(teamATurn + 1);
      setValueInLocalStorage("teamATurn", teamATurn + 1);
      if (teamATurn === 1) {
        setDisableTeamA(true);

        setDisableTeamB(false);

        setTeamBTurn(0);
        setValueInLocalStorage("teamBTurn", 0);
      }
    } else {
      setTeamBTurn(teamBTurn + 1);
      setValueInLocalStorage("teamBTurn", teamBTurn + 1);

      if (teamBTurn === 1) {
        setDisableTeamB(true);

        setDisableTeamA(false);

        setTeamATurn(0);
        setValueInLocalStorage("teamATurn", 0);
      }
    }

    if (teamAScore === 10 || teamBScore === 10) {
      setMatchPlayed(matchPlayed + 1);
      setValueInLocalStorage("MATCHPLAYED", matchPlayed + 1);

      setMatchLeft(matchLeft - 1);
      setValueInLocalStorage("MATCHLEFT", matchLeft - 1);

      setDisableTeamA(true);
      setDisableTeamB(true);
      setDisablePlayNextMatch(false);
    }
    if (action === "plusone") {
      if (teamAScore === 10) {
        setTeamAWinMatches(teamAWinMatches + 1);
        setValueInLocalStorage("TEAMAWINMATCHES", teamAWinMatches + 1);
      }
      if (teamBScore === 10) {
        setTeamBWinMatches(teamBWinMatches + 1);
        setValueInLocalStorage("TEAMBWINMATCHES", teamBWinMatches + 1);
      }
      if (team === "A") {
        setTeamAScore(teamAScore + 1);
        setValueInLocalStorage("TEAMASCORE", teamAScore + 1);
      } else {
        setTeamBScore(teamBScore + 1);
        setValueInLocalStorage("TEAMBSCORE", teamBScore + 1);
      }
    }

    if (action === "foul" || action === "wrongserve") {
      if (teamBScore === 10) {
        setTeamBWinMatches(teamBWinMatches + 1);
        setValueInLocalStorage("TEAMBWINMATCHES", teamBWinMatches + 1);
      }
      if (teamAScore === 10) {
        setTeamAWinMatches(teamAWinMatches + 1);
        setValueInLocalStorage("TEAMAWINMATCHES", teamAWinMatches + 1);
      }
      if (team === "A") {
        setTeamBScore(teamBScore + 1);
        setValueInLocalStorage("TEAMBSCORE", teamBScore + 1);
      } else {
        setTeamAScore(teamAScore + 1);
        setValueInLocalStorage("TEAMASCORE", teamAScore + 1);
      }
    }
  };
  useEffect(() => {
    if (
      getValueFromLocalStorage("teamATurn") === 2 ||
      getValueFromLocalStorage("teamBTurn") === 2
    ) {
      if (
        getValueFromLocalStorage("TEAMASCORE") === 11 ||
        getValueFromLocalStorage("TEAMBSCORE") === 11
      ) {
        setDisableTeamA(true);
        setDisableTeamB(true);
        setDisablePlayNextMatch(false);
        return;
      }
    }
    if (getValueFromLocalStorage("teamATurn") === 2) {
      setDisableTeamA(true);
      setDisableTeamB(false);
    }
    if (getValueFromLocalStorage("teamBTurn") === 2) {
      setDisableTeamA(false);
      setDisableTeamB(true);
    }
  }, []);
  return (
    <div className="scoreBoard">
      <div className="scoreBoardPage">
        <Teamdivision
          team="A"
          scoreHandler={scoreHandler}
          resetTeamValue={resetTeamValue}
          disableTeam={disableTeamA}
        />

        <hr></hr>
        <Teamdivision
          team="B"
          scoreHandler={scoreHandler}
          resetTeamValue={resetTeamValue}
          disableTeam={disableTeamB}
        />
      </div>
      <div className="matchesDivision">
        <button>TOTAL MATCHES : 5</button>
        {getValueFromLocalStorage("MATCHPLAYED") === 5 ? (
          <>
            <button>MATCH COMPLETED</button>
            <button onClick={seeMatchDetails}>SEE MATCH DETAILS</button>
          </>
        ) : (
          <>
            {" "}
            <button>
              {" "}
              MATCHES LEFT : {getValueFromLocalStorage("MATCHLEFT")}
            </button>
            <button
              onClick={playNextMatch}
              disabled={disablePlayNextMatch}
              className={`${disablePlayNextMatch && "disabled"}`}
            >
              PLAY NEXT MATCH
            </button>
          </>
        )}
      </div>
    </div>
  );
}
