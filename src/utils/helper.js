export const setValueInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(key, value));
};

export const getValueFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeValueInLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const playMatchHandler = (teamAName, teamBName, navigate) => {
  localStorage.setItem("TEAMA", teamAName);
  localStorage.setItem("TEAMB", teamBName);
  localStorage.setItem("TEAMASCORE", 0);
  localStorage.setItem("TEAMBSCORE", 0);
  localStorage.setItem("TEAMAWINMATCHES", 0);
  localStorage.setItem("TEAMBWINMATCHES", 0);
  localStorage.setItem("MATCHPLAYED", 0);
  localStorage.setItem("MATCHLEFT", 5);
  navigate(`/scorepage/`);
};

export const resetTeamAValueFromUtils = (team) => {
  if (team === "A") {
    localStorage.setItem("TEAMASCORE", 0);
    localStorage.setItem("TEAMAWINMATCHES", 0);
  } else {
    localStorage.setItem("TEAMBSCORE", 0);
    localStorage.setItem("TEAMBWINMATCHES", 0);
  }

  localStorage.removeItem("MATCHPLAYED");
  window.location.reload();
};
