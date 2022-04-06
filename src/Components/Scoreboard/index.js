import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import { resetTeamAValueFromUtils } from "../../utils/helper";
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

  const totalmatches = 5;
  const navigate = useNavigate();
  const teamAScoreFromLocalStorage = localStorage.getItem("TEAMASCORE");
  const teamBScoreFromLocalStorage = localStorage.getItem("TEAMBSCORE");

  useEffect(() => {
    if (
      +teamAScoreFromLocalStorage === 11 ||
      +teamBScoreFromLocalStorage === 11
    ) {
      setDisableTeamA(true);
      setDisableTeamB(true);
      setDisablePlayNextMatch(false);
    }
  }, []);

  const resetTeamValue = (team) => {
    resetTeamAValueFromUtils(team);
  };

  const playNextMatch = () => {
    if (+teamAScoreFromLocalStorage > +teamBScoreFromLocalStorage) {
      setDisableTeamA(false);
      setDisableTeamB(true);
    }
    if (+teamAScoreFromLocalStorage < +teamBScoreFromLocalStorage) {
      setDisableTeamB(false);
      setDisableTeamA(true);
    }
    setTeamATurn(0);
    setTeamBTurn(0);

    localStorage.removeItem("TEAMASCORE");
    localStorage.removeItem("TEAMBSCORE");
    localStorage.setItem("TEAMASCORE", 0);
    localStorage.setItem("TEAMBSCORE", 0);
    setTeamAScore(0);
    setTeamBScore(0);
    setDisablePlayNextMatch(true);
    localStorage.getItem("DISABLEPLAYNEXTBUTTON");
  };
  const seeMatchDetails = () => {
    navigate(`/matchdetails/`);
  };

  const scoreHandler = (action, team) => {
    localStorage.getItem("SETDISABLEA");
    localStorage.getItem("SETDISABLEB");
    if (team === "A") {
      setTeamATurn(teamATurn + 1);
      if (teamATurn === 1) {
        setDisableTeamA(true);

        setDisableTeamB(false);

        setTeamBTurn(0);
      }
    } else {
      setTeamBTurn(teamBTurn + 1);
      if (teamBTurn === 1) {
        setDisableTeamB(true);

        setDisableTeamA(false);

        setTeamATurn(0);
      }
    }

    if (teamAScore === 10 || teamBScore === 10) {
      setMatchPlayed(matchPlayed + 1);
      localStorage.setItem("MATCHPLAYED", matchPlayed + 1);
      setMatchLeft(totalmatches - matchPlayed - 1);
      localStorage.setItem("MATCHLEFT", totalmatches - matchPlayed - 1);
      setDisableTeamA(true);
      localStorage.setItem("SETDISABLEA", true);

      setDisableTeamB(true);
      localStorage.setItem("SETDISABLEB", true);

      setDisablePlayNextMatch(false);
    }
    if (action === "plusone") {
      if (teamAScore === 10) {
        setTeamAWinMatches(teamAWinMatches + 1);
        localStorage.setItem("TEAMAWINMATCHES", teamAWinMatches + 1);
      }
      if (teamBScore === 10) {
        setTeamBWinMatches(teamBWinMatches + 1);
        localStorage.setItem("TEAMBWINMATCHES", teamBWinMatches + 1);
      }
      if (team === "A") {
        setTeamAScore(teamAScore + 1);
        localStorage.setItem("TEAMASCORE", teamAScore + 1);
      } else {
        setTeamBScore(teamBScore + 1);
        localStorage.setItem("TEAMBSCORE", teamBScore + 1);
      }
    }

    if (action === "foul" || action === "wrongserve") {
      if (teamBScore === 10) {
        setTeamBWinMatches(teamBWinMatches + 1);
        localStorage.setItem("TEAMBWINMATCHES", teamBWinMatches + 1);
      }
      if (teamAScore === 10) {
        setTeamAWinMatches(teamAWinMatches + 1);
        localStorage.setItem("TEAMAWINMATCHES", teamAWinMatches + 1);
      }
      if (team === "A") {
        setTeamBScore(teamBScore + 1);
        localStorage.setItem("TEAMBSCORE", teamBScore + 1);
      } else {
        setTeamAScore(teamAScore + 1);
        localStorage.setItem("TEAMASCORE", teamAScore + 1);
      }
    }
  };
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
        {+localStorage.getItem("MATCHPLAYED") === 5 ? (
          <>
            <button>MATCH COMPLETED</button>
            <button onClick={seeMatchDetails}>SEE MATCH DETAILS</button>
          </>
        ) : (
          <>
            {" "}
            <button> MATCHES LEFT : {localStorage.getItem("MATCHLEFT")}</button>
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
