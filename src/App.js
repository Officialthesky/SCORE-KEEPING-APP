import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scorepage from "./Pages/Scorepage";
import Home from "./Pages/Home";
import Matchdetailspage from "./Pages/Matchdetailspage";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scorepage/" element={<Scorepage />} />
          <Route path="/matchdetails/" element={<Matchdetailspage />} />

        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
