export const setValueInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValueFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeValueInLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const playMatchHandler = (teamAName, teamBName, navigate) => {
  setValueInLocalStorage("TEAMA", teamAName);
  setValueInLocalStorage("TEAMB", teamBName);
  setValueInLocalStorage("TEAMASCORE", 0);
  setValueInLocalStorage("TEAMBSCORE", 0);
  setValueInLocalStorage("TEAMAWINMATCHES", 0);
  setValueInLocalStorage("TEAMBWINMATCHES", 0);
  setValueInLocalStorage("MATCHPLAYED", 0);
  setValueInLocalStorage("MATCHLEFT", 5);
  navigate(`/scorepage/`);
};

export const resetTeamAValueFromUtils = (team) => {
  if (team === "A") {
    setValueInLocalStorage("TEAMASCORE", 0);

    setValueInLocalStorage("TEAMAWINMATCHES", 0);
  } else {
    setValueInLocalStorage("TEAMBSCORE", 0);

    setValueInLocalStorage("TEAMBWINMATCHES", 0);
  }

  localStorage.removeItem("MATCHPLAYED");
  removeValueInLocalStorage("MATCHPLAYED");
  window.location.reload();
};
