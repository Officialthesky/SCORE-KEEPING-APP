import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import { resetTeamAValueFromUtils } from "../../utils/helper";

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
      console.log("HI");
    }
    if (+teamAScoreFromLocalStorage < +teamBScoreFromLocalStorage) {
      setDisableTeamB(false);
      setDisableTeamA(true);
      console.log("bye");
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
      setDisableTeamB(true);
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
        <div className="teamADivision">
          <h1>{localStorage.getItem("TEAMA")}</h1>

          <div className="teamAScoreAndMatchWin">
            <div className="teamAMatchWin">
              <h1 className="teamAMatchWinCount">
                {localStorage.getItem("TEAMAWINMATCHES")}
              </h1>

              <p>Matches Win</p>
            </div>
            <div className="teamAScoreDivision">
              <h1 className="currentScoreOfTeamA">
                {localStorage.getItem("TEAMASCORE")}
              </h1>
            </div>
            <div className="teamAMatchPlayed">
              <h1 className="teamAMatchPlayedCount">
                {localStorage.getItem("MATCHPLAYED")}
              </h1>

              <p>Matches Played</p>
            </div>
          </div>

          <div className="pointButtons">
            <button
              onClick={() => scoreHandler("plusone", "A")}
              disabled={disableTeamA}
              className={`${disableTeamA && "disabled"}`}
            >
              +1
            </button>
            <button
              onClick={() => scoreHandler("foul", "A")}
              disabled={disableTeamA}
              className={`${disableTeamA && "disabled"}`}
            >
              Foul
            </button>
            <button
              onClick={() => scoreHandler("wrongserve", "A")}
              disabled={disableTeamA}
              className={`${disableTeamA && "disabled"}`}
            >
              Wrong Serve
            </button>
            <button
              onClick={() => resetTeamValue("A")}
              disabled={disableTeamA}
              className={`${disableTeamA && "disabled"}`}
            >
              Reset
            </button>
          </div>
        </div>

        <hr></hr>
        <div className="teamBDivision">
          <h1>{localStorage.getItem("TEAMB")}</h1>

          <div className="teamBScoreAndMatchWin">
            <div className="teamBMatchPlayed">
              {/* <h1 className="teamBMatchPlayedCount">{matchPlayed}</h1> */}
              <h1 className="teamBMatchPlayedCount">
                {localStorage.getItem("MATCHPLAYED")}
              </h1>

              <p>Matches Played</p>
            </div>
            <div className="teamBScoreDivision">
              <h1 className="currentScoreOfTeamB">
                {localStorage.getItem("TEAMBSCORE")}
                {/* {teamBScore} */}
              </h1>
            </div>
            <div className="teamBMatchWin">
              {/* <h1 className="teamAMatchWinCount">{teamBWinMatches}</h1> */}
              <h1 className="teamAMatchWinCount">
                {localStorage.getItem("TEAMBWINMATCHES")}
              </h1>

              <p>Matches Win</p>
            </div>
          </div>

          <div className="pointButtons">
            <button
              // onClick={() => scoreHandler("plusone", "B")}
              onClick={() => scoreHandler("plusone", "B")}
              disabled={disableTeamB}
              className={`${disableTeamB && "disabled"}`}
            >
              +1
            </button>
            <button
              onClick={() => scoreHandler("foul", "B")}
              disabled={disableTeamB}
              className={`${disableTeamB && "disabled"}`}
            >
              Foul
            </button>
            <button
              onClick={() => scoreHandler("wrongserve", "B")}
              disabled={disableTeamB}
              className={`${disableTeamB && "disabled"}`}
            >
              Wrong Serve
            </button>
            <button
              onClick={() => resetTeamValue("B")}
              disabled={disableTeamB}
              className={`${disableTeamB && "disabled"}`}
            >
              Reset
            </button>
          </div>
        </div>
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
