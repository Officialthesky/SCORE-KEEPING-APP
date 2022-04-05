import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import { playMatchHandler } from "../../utils/helper";

export default function Homepage() {
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
  const [teamAName, setTeamAName] = useState("TEAM A");
  const [teamBName, setTeamBName] = useState("TEAM B");
  
  const clickStartButton = () => {
    setIsStartButtonClicked(true);
    window.localStorage.clear();
  };
  const navigate = useNavigate();

  const playMatch = () => {
    playMatchHandler(teamAName,teamBName,navigate)
  };
  const saveTeamAName = (e) => {
    setTeamAName(e.target.value);
  };
  const saveTeamBName = (e) => {
    setTeamBName(e.target.value);
  };
  return (
    <>
      <div className="startYourMatch">
        {isStartButtonClicked ? (
          <>
            <div className="nameYourTeam">
              <input
                onChange={saveTeamAName}
                value={teamAName}
                placeholder="Enter Your Team A Name"
              />
              <input
                onChange={saveTeamBName}
                value={teamBName}
                placeholder="Enter Your Team B Name"
              />
              <button className="startButton" onClick={playMatch}>
                Play Match
              </button>
            </div>
          </>
        ) : (
          <button className="startButton" onClick={clickStartButton}>
            START
          </button>
        )}
      </div>
    </>
  );
}
