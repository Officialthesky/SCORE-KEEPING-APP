import React, { useEffect, useState } from "react";
import "./index.css";

export default function Matchdetails() {
  const [teamWinner, setTeamWinner] = useState("");
  useEffect(() => {
    const teamAWinMatchesFromLocalStorage =
      localStorage.getItem("TEAMAWINMATCHES");
    const teamBWinMatchesFromLocalStorage =
      localStorage.getItem("TEAMBWINMATCHES");
    const teamANameFromLocalStorage = localStorage.getItem("TEAMA");
    const teamBNameFromLocalStorage = localStorage.getItem("TEAMB");
    if (+teamAWinMatchesFromLocalStorage > +teamBWinMatchesFromLocalStorage) {
      setTeamWinner(teamANameFromLocalStorage);
    }
    if (+teamBWinMatchesFromLocalStorage > +teamAWinMatchesFromLocalStorage) {
      setTeamWinner(teamBNameFromLocalStorage);
    }
  }, []);
  return (
    <div className="winnerDivision">
      <h1 className="winnerMessage">{teamWinner} is the Winner</h1>
    </div>
  );
}
